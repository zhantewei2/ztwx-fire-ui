import { warn } from './sources/util/warn';
import { extend } from './sources/util/misc';
import { VNode } from "vue";
import { Route } from "vue-router";
import { IceRouterPlugin, IceMatcher } from "./interface";

export function handleRouteEntered(route: Route) {
    for (let i = 0; i < route.matched.length; i++) {
        const record = route.matched[i];
        for (const name in record.instances) {
            const instance = record.instances[name];
            const cbs = (record as any).enteredCbs[name];
            if (!instance || !cbs) continue;
            delete (record as any).enteredCbs[name];
            for (let i = 0; i < cbs.length; i++) {
                if (!(instance as any)._isBeingDestroyed) cbs[i](instance);
            }
        }
    }
}

function resolveProps(route: any, config: any) {
    switch (typeof config) {
        case 'undefined':
            return;
        case 'object':
            return config;
        case 'function':
            return config(route);
        case 'boolean':
            return config ? route.params : undefined;
        default:
            if (process.env.NODE_ENV !== 'production') {
                warn(
                    false,
                    `props in "${route.pathpath}" is a ${typeof config}, ` +
                    `expecting an object, function or boolean.`
                );
            }
    }
}

function fillPropsinData(component: any, data: any, route: any, configProps: any) {
    // resolve props
    let propsToPass = data.props = resolveProps(route, configProps);
    if (propsToPass) {
        // clone to prevent mutation
        propsToPass = data.props = extend({}, propsToPass);
        // pass non-declared props as attrs
        const attrs = data.attrs = data.attrs || {};
        for (const key in propsToPass) {
            if (!component.props || !(key in component.props)) {
                attrs[key] = propsToPass[key];
                delete propsToPass[key];
            }
        }
    }
}


export default (iceRouterPlugins: IceRouterPlugin[], iceStore: any) => ({
    name: 'IceRouterView',
    functional: true,
    props: {
        name: {
            type: String,
            default: 'default'
        },
        oKeepAlive: {
            type: Boolean,
            default: false
        },
        include: Array
    },
    render(createElement: any,
           { props, data, parent, children }: any
    ) {
        /***
         * functional 中无法获取componentInstance
         * 修改为普通component . 同时重赋值变量。
         */
        // let
        //     props={name:"default"},
        //     data:any={},
        //     parent=(this as any).$parent,
        //     relativeParent=parent,
        //     children:any=undefined;
        // used by devtools to display a router-view badge

        data.routerView = true;
        // directly use parent context's createElement() function
        // so that components rendered by router-view can resolve named slots
        const h = parent.$createElement;
        const name = props.name;
        const route = parent.$route;
        const cache = parent._routerViewCache || (parent._routerViewCache = {});
        let iceMatcher: IceMatcher = {};
        // determine current view depth, also check to see if the tree
        // has been toggled inactive but kept-alive.
        let depth = 0;
        let inactive = false;

        let r: VNode;

        while (parent && parent._routerRoot !== parent) {
            const vnodeData = parent.$vnode ? parent.$vnode.data : {};
            if (vnodeData.routerView) {
                depth++;
            }
            if (vnodeData.keepAlive && parent._directInactive && parent._inactive) {
                inactive = true;
            }
            parent = parent.$parent;
        }
        data.routerViewDepth = depth;

        // render previous view if the tree is inactive and kept-alive
        if (inactive) {
            const cachedData = cache[name];
            const cachedComponent = cachedData && cachedData.component;
            if (cachedComponent) {
                // #2301
                // pass props
                if (cachedData.configProps) {
                    fillPropsinData(cachedComponent, data, cachedData.route, cachedData.configProps);
                }
                return h(cachedComponent, data, children);
            } else {
                // render previous empty view
                return h();
            }
        }

        const matched = route.matched[depth];
        const matchedPath = matched.path;

        const component = matched && matched.components[name];

        // render empty node if no matched route or no config component
        if (!matched || !component) {
            cache[name] = null;
            return h();
        }

        // cache component
        cache[name] = { component };

        // attach instance registration hook
        // this will be called in the instance's injected lifecycle hooks
        /**
         * 路由组件注册时触发，非路由组件不触发
         */
        data.registerRouteInstance = (vm: any, val: any) => {

            // val could be undefined for unregistration
            const current = matched.instances[name];
            if (
                (val && current !== vm) ||
                (!val && current === vm)
            ) {
                matched.instances[name] = val;

            }
        };

        /**
         * component mode 下此处不生效
         * 无论缓存，只触发一次。
         */
        // also register instance in prepatch hook
        // in case the same component instance is reused across different routes
        (data.hook || (data.hook = {})).prepatch = (_: any, vnode: any) => {
            matched.instances[name] = vnode.componentInstance;
            // iceMatcher["vNode"]=vnode;
            // iceMatcher["instanceComponent"]=vnode.componentInstance;
        };
        // register instance in init hook
        // in case kept-alive component be actived when routes changed
        data.hook.init = (vnode: any) => {
            if (vnode.data.keepAlive &&
                vnode.componentInstance &&
                vnode.componentInstance !== matched.instances[name]
            ) {
                matched.instances[name] = vnode.componentInstance;
            }

            // if the route transition has already been confirmed then we weren't
            // able to call the cbs during confirmation as the component was not
            // registered yet, so we call it here.
            handleRouteEntered(route);
        };

        const configProps = matched.props && matched.props[name];
        // save route and configProps in cachce
        if (configProps) {
            extend(cache[name], {
                route,
                configProps
            });
            fillPropsinData(component, data, route, configProps);
        }
        r = h(component, data, children);
        /**
         * functional 中此处 vNode 与 data hook 中获取的vNode不相同。
         */
        iceRouterPlugins.forEach((plugin: IceRouterPlugin) => {
            r = plugin.returnVnode ? plugin.returnVnode(
                h, {
                    data, children, primaryVNode: r, matcher: matched,
                    parent, iceMatcher, oKeepAlive: props.oKeepAlive
                }
            ) || r : r;
        });

        return r;
    }
})



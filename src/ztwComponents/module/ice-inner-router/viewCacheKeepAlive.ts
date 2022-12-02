import { CreateElement, VNode } from "vue";
import View from "@/ztwComponents/module/ice-inner-router/view";
import { IceRouterPluginManager } from "@/ztwComponents/module/ice-inner-router/index";

/**
 * 获得真实的vNode后，传递componentInstance
 * @param View
 * @param iceRouterPluginManager {IceRouterPluginManager}
 */
export const iceCacheKeepAlive = (View: any, iceRouterPluginManager: IceRouterPluginManager): any => {
    const plugins = iceRouterPluginManager.getPlugins();
    const view = View(
        plugins,
        iceRouterPluginManager.getStore()
    );
    return {
        props: {
            keepAlive: Boolean,
            include: Array
        },
        watch: {
            include: {
                handler(v: string[], ov: string[]) {
                    const set = new Set(v);
                    ov.forEach(i => {
                        if (!set.has(i)) {
                            plugins.forEach(p => {
                                p.clear && p.clear(i);
                            });
                        }
                    });
                },
                deep: true
            }
        },
        render(h: CreateElement) {
            let routerView: VNode = h(view, { props: { oKeepAlive: this.keepAlive } });
            const data: any = routerView.data;
            if (data && data.iceInstance) {
                routerView.componentInstance = data.iceInstance;
            }

            return h('keep-alive', {
                key: 'ice-keepalive-container',
                keepAlive: true,
                props: {
                    include: this.include
                }
            }, [routerView]);
        }
    };
};

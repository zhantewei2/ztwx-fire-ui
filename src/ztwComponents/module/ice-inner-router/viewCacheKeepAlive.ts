import { CreateElement, VNode } from "vue";

/**
 * 获得真实的vNode后，传递componentInstance
 * @param view
 */

export const iceCacheKeepAlive = (view: any): any => ({
    props: {
        keepAlive: Boolean,
        includes: Array
    },
    render(h: CreateElement) {
        let routerView: VNode = h(view, { props: { oKeepAlive: this.$props.keepAlive } });
        const data: any = routerView.data;
        if (data && data.iceInstance) {
            routerView.componentInstance = data.iceInstance;
        }
        const props: { includes?: string[] } = {};
        if (this.$props.includes) props.includes = this.$props.includes;

        return h('keep-alive', {
            keepAlive: true, key: 'ice-keepalive-container',
            props: { ...props, ...this.$attrs, }
        }, [routerView]);
    }
});

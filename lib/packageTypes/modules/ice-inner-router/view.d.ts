declare const _default: (iceRouterPlugins: any[], iceStore: any) => {
    name: string;
    functional: boolean;
    props: {
        name: {
            type: StringConstructor;
            default: string;
        };
    };
    render(createElement: any, { props, data, parent, children }: any): any;
};
export default _default;

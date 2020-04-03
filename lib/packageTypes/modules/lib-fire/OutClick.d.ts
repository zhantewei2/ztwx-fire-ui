export declare class OutClick {
    body: HTMLElement;
    onceCb: ((e: Event) => void) | null;
    constructor();
    /**关闭时，即外部点击时触发cb
     * 但 程序可能不通过点击触发关闭.所以得保证cb 内方法得安全性... 比如判断是否关闭，再执行相应代码
     *
     * @param cb 关闭回调
     * @param insideEls  不触发的elements
     */
    once(cb: (e: Event) => void, insideEls?: HTMLElement[]): void;
}

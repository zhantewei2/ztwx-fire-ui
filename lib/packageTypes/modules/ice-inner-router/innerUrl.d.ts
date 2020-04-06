import { IceSubViewRef } from "./interface";
export declare class InnerUrl {
    sessionKey: string;
    cacheComponentRefs: Record<string, IceSubViewRef>;
    findInnerComponent: (path: string, subView: any[], matcherPath: string) => any;
    getInnerPath: () => string;
    /**
     * 设置传递的参数
     * @param params
     * @param currentLevel
     */
    setParams(params: any, currentLevel: number): void;
    /**
     * 获取父级传递的参数
     * @param currentLevel
     */
    getParentParams(currentLevel: number): any;
}

import { VNode } from "vue";
import { IceMatcher } from "./interface";
import { Subject } from "rxjs";
export interface CacheComponentRef {
    key: string;
    path: string;
    tag: string;
    component: VNode;
    iceMatcher: IceMatcher;
    subName: string;
}
export declare class InnerCache {
    hostComponentRef: CacheComponentRef | null;
    cacheComponentRefs: CacheComponentRef[];
    cacheHistory: Subject<CacheComponentRef[]>;
    get currentLevel(): number;
    toPrimary(): boolean;
    back(): {
        path: string;
        tag: any;
    } | null;
    cacheRender(vNode: VNode, matcherPath: string, tag: string, iceMatcher: IceMatcher, subName: string): VNode;
    clearComponentRefs(all: boolean, start?: number): void;
    clearCache(): void;
}

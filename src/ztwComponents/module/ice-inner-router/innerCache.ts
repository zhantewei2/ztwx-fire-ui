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

export class InnerCache {
    hostComponentRef: CacheComponentRef | null = null;
    cacheComponentRefs: CacheComponentRef[] = [];
    cacheComponentRefsKeyMap = new Map<string, CacheComponentRef[]>();
    cacheHistory: Subject<CacheComponentRef[]> = new Subject();
    currentMatchPath: string;
    isCurrentKeepAlive: boolean;

    get currentLevel(): number {
        return this.cacheComponentRefs.length;
    }

    toPrimary(): boolean {
        if (!this.cacheComponentRefs.length || this.cacheComponentRefs.length < 2) return false;
        this.clearComponentRefs(false, 1);
        return true;
    }

    back(): { path: string, tag: any } | null {
        if (!this.cacheComponentRefs.length || this.cacheComponentRefs.length < 2) return null;
        const targetIndex = this.cacheComponentRefs.length - 2;
        const { path, tag }: CacheComponentRef = this.cacheComponentRefs[targetIndex];
        return { path, tag };
    }

    cacheRender(
        {
            vNode, matcherPath, tag, iceMatcher, subName, oKeepAlive
        }: {
            vNode: VNode, matcherPath: string, tag: string, iceMatcher: IceMatcher, subName: string,
            oKeepAlive?: boolean
        }): VNode {

        this.currentMatchPath = matcherPath;
        this.isCurrentKeepAlive = oKeepAlive ?? false;

        const currentComponentRef: CacheComponentRef = {
            component: vNode,
            path: matcherPath,
            tag,
            key: matcherPath + "-" + tag,
            iceMatcher,
            subName
        };

        if (this.hostComponentRef && !this.hostComponentRef.key.includes(matcherPath))
            this.hostComponentRef = null;

        if (!this.cacheComponentRefsKeyMap.has(matcherPath)) {
            const arr: CacheComponentRef[] = [];
            this.cacheComponentRefsKeyMap.set(matcherPath, arr);
            this.cacheComponentRefs = [];
        } else {
            const cache = this.cacheComponentRefsKeyMap.get(matcherPath);
            if (cache) {
                this.cacheComponentRefs = [...cache];
            }
        }

        const preComponentRef: CacheComponentRef | null = this.cacheComponentRefs.length ?
            this.cacheComponentRefs[this.cacheComponentRefs.length - 1] : null;

        if (preComponentRef && (preComponentRef.key === currentComponentRef.key)) {
            currentComponentRef.iceMatcher = preComponentRef.iceMatcher;
            let data: any = currentComponentRef.component.data;
            if (data) {
                data.keepAlive = true;
                data.iceInstance = currentComponentRef.iceMatcher.instanceComponent;
            }
        } else if (!preComponentRef || preComponentRef.key !== currentComponentRef.key || oKeepAlive) {
            const existsComponentRef: CacheComponentRef | undefined = this.cacheComponentRefs.find((componentRef: CacheComponentRef) => {
                return componentRef.key === currentComponentRef.key;
            });
            if (existsComponentRef) {
                // hot update时不回获取旧instanceComponent
                if (existsComponentRef.iceMatcher.instanceComponent) currentComponentRef.iceMatcher = existsComponentRef.iceMatcher;
                currentComponentRef.component.componentInstance = existsComponentRef.iceMatcher.instanceComponent;
                let data: any = currentComponentRef.component.data;
                if (data) {
                    data.keepAlive = true;
                    data.iceInstance = existsComponentRef.iceMatcher.instanceComponent;
                }
                this.clearComponentRefs(false, this.cacheComponentRefs.findIndex(i => i == existsComponentRef) + 1);
            } else {
                if (preComponentRef) {
                    //主路由更换
                    // 或是推入路由为主路由
                    if (!oKeepAlive && (preComponentRef.path != currentComponentRef.path ||
                        !currentComponentRef.tag)
                    ) {
                        this.clearComponentRefs(true);
                    } else {
                        //此时，为新入 子路由
                        preComponentRef.component.data && (preComponentRef.component.data.keepAlive = true);
                    }
                }
                this.cacheComponentRefs.push(currentComponentRef);
                this.cacheComponentRefsKeyMap.set(matcherPath, [...this.cacheComponentRefs]);
                this.cacheHistory.next(this.cacheComponentRefs);
            }
        }

        /**
         * is primary
         */
        if (!currentComponentRef.tag) {
            this.hostComponentRef = currentComponentRef;
            /**
             * 子 route 赋值
             */
        } else if (this.hostComponentRef) {
            const instance: any = this.hostComponentRef.iceMatcher.instanceComponent;
            const data = currentComponentRef.component.data;
            /**
             * props 赋值
             */

            if (data) {
                Object.assign(data.props || (data.props = {}), {
                    "iceParentData": instance.$data,
                    "iceParent": instance,
                });
                currentComponentRef.component.componentOptions && (
                    currentComponentRef.component.componentOptions.propsData = data.props
                );
            }
        }
        return currentComponentRef.component;
    }

    clearComponentRefs(all: boolean, start: number = 0) {
        let clearArr: CacheComponentRef[];
        if (all) {
            if (this.isCurrentKeepAlive) return;
            clearArr = this.cacheComponentRefs;
            this.cacheComponentRefs = [];
            this.hostComponentRef = null;
        } else {
            clearArr = this.cacheComponentRefs.slice(start);
            this.cacheComponentRefs = this.cacheComponentRefs.slice(0, start);
        }
        clearArr.forEach((componentRef) => {
            if (!componentRef.tag && this.isCurrentKeepAlive) return;
            const component: any = componentRef.component;
            component.data && (component.data.keepAlive = false);
            componentRef.iceMatcher.instanceComponent && componentRef.iceMatcher.instanceComponent.$destroy();
        });
        this.cacheComponentRefsKeyMap.set(this.currentMatchPath, [...this.cacheComponentRefs]);
        this.cacheHistory.next(this.cacheComponentRefs);
    }

    clearCache(path?:string) {
        if (path) {
            this.cacheComponentRefsKeyMap.delete(path)
            if (this.currentMatchPath === path) {
                this.isCurrentKeepAlive = false
                this.clearComponentRefs(true);
            }
            return
        }
        this.isCurrentKeepAlive = false
        this.clearComponentRefs(true);
        this.cacheComponentRefsKeyMap.clear()
    }
}

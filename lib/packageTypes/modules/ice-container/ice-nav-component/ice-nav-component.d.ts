import Vue from "vue";
import { NavListItem } from "../../lib-fire/data.interface";
import { NavDataHandler } from "../../lib-fire/NavDataHandler";
export default class extends Vue {
    allNavData: NavListItem[];
    navData: {
        [key: string]: NavListItem[];
    };
    dataLevel: number;
    showAll: boolean;
    navDataHandler: NavDataHandler;
    created(): void;
    watchData(dataDict: {
        [key: string]: NavListItem[];
    }): void;
    watchPath(path: string): void;
    watchLevel(level: number): void;
    /**折叠
     */
    toFold(): void;
    /**
     * 点击item 所有item均触发此方法
     * @param i
     */
    itemClick(i: NavListItem): void;
}

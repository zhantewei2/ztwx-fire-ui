import Vue from "vue";
import { NavListItem } from "../../lib-fire/data.interface";
export default class extends Vue {
    data: {
        [key: string]: NavListItem[];
    };
    allData: NavListItem[];
    trigger: boolean;
    dataLevel: number;
    showAll: boolean;
    isFold: boolean;
    toFold(): void;
}

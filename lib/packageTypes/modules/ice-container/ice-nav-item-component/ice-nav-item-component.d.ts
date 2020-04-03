import Vue from "vue";
import { NavListItem } from "../../lib-fire/data.interface";
export default class extends Vue {
    data: NavListItem[];
    itemFn: any;
}

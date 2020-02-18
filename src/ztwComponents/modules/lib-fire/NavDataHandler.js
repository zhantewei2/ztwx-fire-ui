"use strict";
exports.__esModule = true;
/**
     * 处理一个深度
     * 为所有item添加parent
     * @param navListItems
     * @param parent
     */
exports.handleListData = function (navListItems, parent) {
    navListItems.forEach(function (i) {
        i.parent = parent;
        i.open = false;
        i.active = false;
        if (i.children)
            exports.handleListData(i.children, i);
    });
};
/** 返回处理后的List
*
* @param navListItems
*/
exports.dataFactory = function (navListItems) {
    /**
     * 最外层构建一个虚拟parent
     */
    var parent = {
        label: "parent",
        children: navListItems
    };
    exports.handleListData(navListItems, parent);
    return navListItems;
};
var NavDataHandler = /** @class */ (function () {
    function NavDataHandler(items) {
        this.navListItems = items;
    }
    /**
     * 处理 item 点击时，折叠相关数据的更改
     * @param i
     * @param activeNext  当item为导航项时，触发该回调
     */
    NavDataHandler.prototype.handleItemClickDataChange = function (i, activeNext) {
        if (i.children) {
            //当为父级时
            if (!i.open) {
                if (i.parent && i.parent.children) {
                    // 关闭打开的item
                    for (var _i = 0, _a = i.parent.children; _i < _a.length; _i++) {
                        var child = _a[_i];
                        if (child.open) {
                            child.open = false;
                            break;
                        }
                    }
                }
                i.open = true;
            }
            else {
                i.open = false;
            }
        }
        else {
            //为导航项时
            //如果存在前一个激活的item
            if (this.preActiveItem) {
                this.preActiveItem.active = false;
            }
            i.active = true;
            this.preActiveItem = i;
            //如果为点击，则阻止自动触发.
            this.preventFromUrl = true;
            activeNext(i);
        }
    };
    /**
     * 从 url path 中展开collapse
     * @param navListItems
     * @param path
     */
    NavDataHandler.prototype.collapseNavCardFromPath = function (path) {
        /**
         * 阻止 点击事件触发的展开
         */
        if (this.preventFromUrl) {
            this.preventFromUrl = false;
            return;
        }
        var findItem = function (list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var i = list_1[_i];
                if (i.path === path) {
                    return i;
                }
                if (i.children) {
                    var existsItem = findItem(i.children);
                    if (existsItem)
                        return existsItem;
                }
            }
            return null;
        };
        var item = findItem(this.navListItems);
        if (!item)
            return;
        //找到item,重置其他item
        this.resetData(this.navListItems);
        var openParent = function (i) {
            if (i.parent) {
                i.parent.open = true;
                openParent(i.parent);
            }
        };
        openParent(item);
        item.active = true;
    };
    /** 重置Data
     *
     * @param navListItems
     */
    NavDataHandler.prototype.resetData = function (navListItems) {
        var _this = this;
        navListItems.forEach(function (i) {
            i.open = false;
            i.active = false;
            i.children && _this.resetData(i.children);
        });
    };
    return NavDataHandler;
}());
exports.NavDataHandler = NavDataHandler;

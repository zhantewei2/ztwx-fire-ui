"use strict";
exports.__esModule = true;
/**
 * 监听文件夹改变
 *
 * 自动生成目录
 *
 * **/
var create_template_1 = require("./create-template");
var vueComponentPlugin_1 = require("./basePlugins/vueComponentPlugin");
var vueDirectivePlugin_1 = require("./basePlugins/vueDirectivePlugin");
var vuePagePlugin_1 = require("./basePlugins/vuePagePlugin");
var path = require("path");
var chokidar = require("chokidar");
var LoggerFactory = require("../../logger/logger.js").LoggerFactory;
var log = LoggerFactory.getLogger(__filename);
var ManageTempalteWatchDir = /** @class */ (function () {
    function ManageTempalteWatchDir() {
        this.createTemplate = new create_template_1.CreateTemplate();
        /**
         * 注册基础模板
         */
        this.createTemplate.addPlugin(new vuePagePlugin_1.VuePagePlugin());
        this.createTemplate.addPlugin(new vueDirectivePlugin_1.VueDirectivePlugin());
        this.createTemplate.addPlugin(new vueComponentPlugin_1.VueComponentPlugin());
    }
    ManageTempalteWatchDir.prototype.watch = function (dirPath) {
        var _this = this;
        log.info("watch dir: " + dirPath);
        chokidar.watch(dirPath, {
            ignoreInitial: true
        })
            .on("addDir", function (path) {
            /**
             * listener
             */
            log.debug("add dir");
            _this.autoCompleteTp(path);
        });
    };
    /**
     * 监听文件创建，并自动写入模板
     * @param dirPath
     */
    ManageTempalteWatchDir.prototype.autoCompleteTp = function (dirPath) {
        var dirName = this.getDirName(dirPath);
        if (!dirName)
            return;
        var templatePlugin = this.createTemplate.switchTemplatePlugin(dirName);
        if (!templatePlugin)
            return log.info("ignore dir :" + dirPath);
        this.createTemplate.createSimple(templatePlugin, dirPath);
        log.info("created template completed: " + dirPath);
        log.warn("webstorm: please press CTRL+ALT+T to refresh page");
    };
    /**
     * 获得dir目录名
     * @param dirPath
     */
    ManageTempalteWatchDir.prototype.getDirName = function (dirPath) {
        var matcher = dirPath.match(new RegExp("[^\\" + path.sep + "]+$"));
        if (!matcher)
            return null;
        return matcher[0];
    };
    return ManageTempalteWatchDir;
}());
exports.ManageTempalteWatchDir = ManageTempalteWatchDir;
// const m=new ManageTempalteWatchDir();
//
// m.watch("/home/workspace/frontend/ztwx-fire-ui/dist");

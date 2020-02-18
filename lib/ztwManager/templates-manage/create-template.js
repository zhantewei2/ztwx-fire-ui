"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var templates_1 = require("./templates");
var plugin_template_1 = require("./plugin-template");
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var host_path = path.dirname(path.dirname(path.dirname(__dirname)));
var tp_collection_dir = path.join(host_path, "assets/templates");
var CreateTemplate = /** @class */ (function (_super) {
    __extends(CreateTemplate, _super);
    function CreateTemplate() {
        var _this = _super.call(this) || this;
        //处理template dict基础数据
        _this.baseData = new templates_1.BaseData();
        /**创建模板
         *
         * @param templatePlugin 作用的插件
         * @param tpFileName 模板的文件名称
         * @param tpName 模板名称
         * @param outDir 生成的路径位置
         */
        _this.create = function (templatePlugin, tpFileName, tpName, outDir) {
            var tpDirPath = templatePlugin.templatePath;
            _this.checkOutDirExists(outDir);
            var list = fs.readdirSync(tpDirPath);
            /**
             * 生成每个文件
             */
            list.forEach(function (filename) {
                var fileContent = fs.readFileSync(path.join(tpDirPath, filename), "utf8");
                fileContent = _this.replaceTp(templatePlugin.handleTemplateSource(_this.baseData.appendBaseData({
                    dirName: tpFileName,
                    completeName: tpName
                })), fileContent);
                _this.generateFile(path.join(outDir, _this.getTargetFilename(tpFileName, filename)), fileContent);
            });
        };
        /** 替换模板内容
         * 返回新的内容
         *
         * @param replaceDict
         * @param tpContent
         */
        _this.replaceTp = function (replaceDict, tpContent) {
            for (var key in replaceDict) {
                tpContent = tpContent.replace(new RegExp("\\${" + key + "}", "g"), replaceDict[key]);
            }
            return tpContent;
        };
        /**生成文件
         *
         * @param targetFilePath
         * @param fileContent
         */
        _this.generateFile = function (targetFilePath, fileContent) {
            fs.writeFileSync(targetFilePath, fileContent);
        };
        /**
         * 获得目标文件的文件名
         * @param tpName
         * @param sourceFileName
         */
        _this.getTargetFilename = function (tpName, sourceFileName) {
            var fileExtend = sourceFileName.replace(/(tp\.|\.j2)/g, "");
            return tpName + "." + fileExtend;
        };
        /**
         * 检查outDir目录是否存在
         * 如果不存在，则递归创建该目录
         * @param dirPath
         */
        _this.checkOutDirExists = function (dirPath) {
            var exists = fs.existsSync(dirPath);
            if (!exists)
                fs.mkdirSync(dirPath, { recursive: true });
        };
        return _this;
    }
    /**
     * 返回处理过后的文件名。
     * 如 将 aaa-xx转为aaaXx.
     * 并抛出错误-含中文名的文件目录
     * @param outDir
     *
     * @return 返回 处理后名称，文件夹名
     */
    CreateTemplate.prototype.adjustmentName = function (outDir) {
        var dirMather = outDir.match(new RegExp("[^\\" + path.sep + "]+$"));
        if (!dirMather)
            throw "handle filename error";
        var dirName = dirMather[0];
        var ruleCheck = dirName.match(/^[\u0000-\u007F]+$/);
        if (!ruleCheck)
            throw "file name format error";
        var arr = dirName.split("-");
        var completeName = "", firstCompleted = false;
        arr.forEach(function (i, index) {
            if (!i)
                return;
            if (firstCompleted) {
                completeName += i[0].toUpperCase() + i.slice(1);
            }
            else {
                completeName += i;
                firstCompleted = true;
            }
        });
        return [completeName, dirName];
    };
    CreateTemplate.prototype.createSimple = function (templatePlugin, outDir) {
        var _a = this.adjustmentName(outDir), completeName = _a[0], dirName = _a[1];
        return this.create(templatePlugin, dirName, completeName, outDir);
    };
    return CreateTemplate;
}(plugin_template_1.TemplateManagePlugin));
exports.CreateTemplate = CreateTemplate;

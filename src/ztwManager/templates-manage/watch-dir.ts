/**
 * 监听文件夹改变
 *
 * 自动生成目录
 *
 * **/
import {CreateTemplate} from "./create-template";
import {TemplatePlugin} from "./plugin-template";
import {VueComponentPlugin} from "./basePlugins/vueComponentPlugin";
import {VueDirectivePlugin} from "./basePlugins/vueDirectivePlugin";
import {VuePagePlugin} from "./basePlugins/vuePagePlugin";

const path=require("path");
const chokidar=require("chokidar");
const {LoggerFactory}=require("../../logger/logger.js");
const log=(LoggerFactory as any).getLogger(__filename);

export class ManageTempalteWatchDir{
    private createTemplate:CreateTemplate=new CreateTemplate();

    constructor() {
        /**
         * 注册基础模板
         */
        this.createTemplate.addPlugin(new VuePagePlugin());
        this.createTemplate.addPlugin(new VueDirectivePlugin());
        this.createTemplate.addPlugin(new VueComponentPlugin());

    }
    watch(dirPath:string){
        log.info("watch dir: "+dirPath);
        chokidar.watch(dirPath,{
            ignoreInitial:true
        })
            .on("addDir",(path:string)=>{
                /**
                 * listener
                 */
                log.debug("add dir");
                this.autoCompleteTp(path);

            })
    }

    /**
     * 监听文件创建，并自动写入模板
     * @param dirPath
     */
    autoCompleteTp(dirPath:string):void{
        let dirName:string|null=this.getDirName(dirPath);
        if(!dirName)return;
        const templatePlugin:TemplatePlugin|null=this.createTemplate.switchTemplatePlugin(dirName);
        if(!templatePlugin)return log.info("ignore dir :"+ dirPath);
        this.createTemplate.createSimple(templatePlugin,dirPath);
        log.info("created template completed: "+dirPath);
        log.warn("webstorm: please press CTRL+ALT+T to refresh page")
    }

    /**
     * 获得dir目录名
     * @param dirPath
     */
    getDirName(dirPath:string):string|null{
        const matcher=dirPath.match(
            new RegExp("[^\\"+path.sep+"]+$")
        );
        if(!matcher)return null;
        return matcher[0];
    }
}

// const m=new ManageTempalteWatchDir();
//
// m.watch("/home/workspace/frontend/ztwx-fire-ui/dist");
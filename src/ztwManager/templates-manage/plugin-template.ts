import {TemplateBaseData} from "./templates";

/**
 * 用于判断使用作用
 */
export type ActiveTemplateType=(dirName:string)=>boolean;


/**
 * 返回 template replace Dict
 */
export type HandleTemplateSourceType=(
    templateBaseData:TemplateBaseData
)=>Record<string,string>;

export interface TemplatePlugin{
    pluginName:string;   //插件名称
    version?:string; //插件版本
    activeTemplate:ActiveTemplateType; //是否激活 当前插件 条件
    templatePath:string; //模板路径
    handleTemplateSource:HandleTemplateSourceType; //处理template 返回dict
}


export class TemplateManagePlugin{
    templatePlugins:TemplatePlugin[]=[];
    constructor() {};

    /**
     * 添加plugin
     * @param templatePlugin
     */
    addPlugin(templatePlugin:TemplatePlugin){
        this.templatePlugins.push(templatePlugin);
    }

    /**
     * 根据目录名，来选择激活某个plugin
     * @param dirName
     */
    switchTemplatePlugin(dirName:string):TemplatePlugin|null{
        for(let plugin of this.templatePlugins){
            if(plugin.activeTemplate(dirName))return plugin;
        }
        return null;
    }
}

export {
    TemplateBaseData
}
import { TemplateBaseData } from "./templates";
/**
 * 用于判断使用作用
 */
export declare type ActiveTemplateType = (dirName: string) => boolean;
/**
 * 返回 template replace Dict
 */
export declare type HandleTemplateSourceType = (templateBaseData: TemplateBaseData) => Record<string, string>;
export interface TemplatePlugin {
    pluginName: string;
    version?: string;
    activeTemplate: ActiveTemplateType;
    templatePath: string;
    handleTemplateSource: HandleTemplateSourceType;
}
export declare class TemplateManagePlugin {
    templatePlugins: TemplatePlugin[];
    constructor();
    /**
     * 添加plugin
     * @param templatePlugin
     */
    addPlugin(templatePlugin: TemplatePlugin): void;
    /**
     * 根据目录名，来选择激活某个plugin
     * @param dirName
     */
    switchTemplatePlugin(dirName: string): TemplatePlugin | null;
}
export { TemplateBaseData };

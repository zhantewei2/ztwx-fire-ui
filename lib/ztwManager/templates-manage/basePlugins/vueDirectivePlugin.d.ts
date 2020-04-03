import { TemplateBaseData, TemplatePlugin } from "../plugin-template";
export declare class VueDirectivePlugin implements TemplatePlugin {
    pluginName: string;
    version: string;
    templatePath: string;
    constructor();
    activeTemplate(dirName: string): boolean;
    handleTemplateSource(data: TemplateBaseData): {
        "tp_name": string;
    };
}

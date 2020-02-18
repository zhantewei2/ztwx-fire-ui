import {TemplateBaseData, TemplatePlugin} from "../plugin-template";
const path=require("path");

const host_path=path.dirname(path.dirname(path.dirname(path.dirname(__dirname))));
export class VueDirectivePlugin implements TemplatePlugin{
    pluginName:string="@ztwx/vue-directive-template";
    version:string="0.0.1";

    templatePath:string=path.join(host_path,"assets/templates/vueDirective");
    constructor() {

    }
    activeTemplate(dirName:string):boolean{
        return dirName.endsWith("directive")||dirName.endsWith("Directive");
    }
    handleTemplateSource(data:TemplateBaseData){
        return {
            "tp_name":data.completeName
        };
    }
}
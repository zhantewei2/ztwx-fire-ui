import {TemplatePlugin,TemplateBaseData} from "../plugin-template";
const path=require("path");

const host_path=path.dirname(path.dirname(path.dirname(path.dirname(__dirname))));
export class VueComponentPlugin implements TemplatePlugin{
    pluginName:string="@ztwx/vue-component-template";
    version:string="0.0.1";

    templatePath:string=path.join(host_path,"assets/templates/vueComponent");
    constructor() {

    }
    activeTemplate(dirName:string):boolean{
        return dirName.endsWith("component")||dirName.endsWith("Component");
    }
    handleTemplateSource(data:TemplateBaseData){
        return {
            "tp_name":data.completeName,
            "tp_file_name":data.dirName,
            "tp_user": data.gitName || "",
            "tp_email": data.gitEmail || "",
            "tp_now": data.nowDate || ""
        }
    }
}
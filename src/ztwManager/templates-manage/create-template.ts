import {BaseData} from "./templates";
import {TemplateManagePlugin,TemplatePlugin} from "./plugin-template";
const assert =require("assert");
const fs=require("fs");
const path=require("path");

export type TpType="vuePage";

const host_path=path.dirname(path.dirname(path.dirname(__dirname)));
const tp_collection_dir=path.join(host_path,"assets/templates");

export class CreateTemplate extends TemplateManagePlugin{
    //处理template dict基础数据
    private baseData:BaseData=new BaseData();

    constructor() {
        super();
    }

    /**
     * 返回处理过后的文件名。
     * 如 将 aaa-xx转为aaaXx.
     * 并抛出错误-含中文名的文件目录
     * @param outDir
     *
     * @return 返回 处理后名称，文件夹名
     */
    adjustmentName(outDir:string):string[]{
        const dirMather=outDir.match(
            new RegExp("[^\\"+path.sep+"]+$")
        );
        if(!dirMather) throw "handle filename error";
        const dirName=dirMather[0];
        const ruleCheck=dirName.match(/^[\u0000-\u007F]+$/);
        if (!ruleCheck) throw "file name format error";
        const arr=dirName.split("-");
        let completeName:string="",firstCompleted:boolean=false;
        arr.forEach((i:string,index:number)=>{
            if(!i) return;
            if(firstCompleted) {
                completeName += i[0].toUpperCase() + i.slice(1)
            }else{
                completeName +=i;
                firstCompleted=true;
            }
        });
        return [completeName,dirName];
    }
    createSimple(templatePlugin:TemplatePlugin,outDir:string){
        const [completeName,dirName]=this.adjustmentName(outDir);
        return this.create(templatePlugin,dirName,completeName,outDir);
    }

    /**创建模板
     *
     * @param templatePlugin 作用的插件
     * @param tpFileName 模板的文件名称
     * @param tpName 模板名称
     * @param outDir 生成的路径位置
     */
    create=(templatePlugin:TemplatePlugin,tpFileName:string,tpName:string,outDir:string)=>{

        const tpDirPath=templatePlugin.templatePath;

        this.checkOutDirExists(outDir);

        const list= fs.readdirSync(tpDirPath);
        /**
         * 生成每个文件
         */
        list.forEach((filename:string)=>{
            let fileContent:string=fs.readFileSync(
                path.join(tpDirPath,filename),"utf8"
            );
            fileContent=this.replaceTp(
                templatePlugin.handleTemplateSource(this.baseData.appendBaseData({
                    dirName:tpFileName,
                    completeName:tpName
                })),
                fileContent
            );
            this.generateFile(
                path.join(
                    outDir,
                    this.getTargetFilename(tpFileName,filename)
                ),
                fileContent
            )
        })
    };
    /** 替换模板内容
     * 返回新的内容
     *
     * @param replaceDict
     * @param tpContent
     */
    replaceTp=(replaceDict:Record<string, string>,tpContent:string):string=>{
        for(let key in replaceDict){
            tpContent=tpContent.replace(
                new RegExp(`\\$\{${key}\}`,"g"),
                replaceDict[key]
            )
        }
        return tpContent;
    };

    /**生成文件
     * 判断文件，如果存在，则不创建  2020/2/24
     * @param targetFilePath
     * @param fileContent
     */
    generateFile=(targetFilePath:string,fileContent:string)=>{
        if(fs.existsSync(targetFilePath))return;
        fs.writeFileSync(
            targetFilePath,
            fileContent
        )
    };
    /**
     * 获得目标文件的文件名
     * @param tpName
     * @param sourceFileName
     */
    getTargetFilename=(tpName:string,sourceFileName:string):string=>{
        const fileExtend=sourceFileName.replace(/(tp\.|\.j2)/g,"");
        return tpName+"."+fileExtend;
    }
    /**
     * 检查outDir目录是否存在
     * 如果不存在，则递归创建该目录
     * @param dirPath
     */
    checkOutDirExists=(dirPath:string)=>{
        const exists:boolean=fs.existsSync(dirPath);
        if (! exists) fs.mkdirSync(dirPath,{recursive:true});
    }
}
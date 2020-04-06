export const tpDict={
    'vuePage':"vuePage"
};

export interface TemplateBaseData{
    dirName:string;  //目录实际名
    completeName:string; //调整 优化后的名
    gitName?:string; //用户git 名称
    gitEmail?:string; //用户git 邮箱
    userComputer?:string; //用户电脑标志
    nowDate?:string; //当前时间字符串
}
const subprocess=require("child_process");

export class BaseData{
    constructor() {

    }
    appendBaseData(tb:TemplateBaseData):TemplateBaseData{
        let gitName!:string;
        let gitEmail!:string;
        try {
            gitName=subprocess.execSync("git config user.name").toString().trim();
        }catch(e){}

        try{
            gitEmail=subprocess.execSync("git config user.email").toString().trim();
        }catch (e){}

        const now=new Date();
        const nowDate=`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        return {
            ...tb,
            gitName:gitName,
            gitEmail:gitEmail,
            nowDate
        };
    }
}
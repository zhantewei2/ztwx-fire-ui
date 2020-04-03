const fs=require("fs");
const tmpFileName=".ztwx-compile-vue";
const path=require("path");
const rmdirSync=require("rmdir-sync");


module.exports=class VueSuffix{

    genTmpFileName(){
        return tmpFileName+new Date().getTime().toString(16);
    }
    constructor() {
        this.hostDir=process.cwd();
        this.currentTmpDirPath="";
        const list=fs.readdirSync(this.hostDir);

        for(let file of list){
            if(file.startsWith(tmpFileName)){
                rmdirSync(
                    path.join(this.hostDir,file),
                );
                break;
            }
        }
        this.currentTmpDirPath=path.join(
            this.hostDir,
            this.genTmpFileName()
        );
        fs.mkdirSync(this.currentTmpDirPath);
    }

    filterVueScript(vueSource){
        const matcher=vueSource.match(/<script(\s+lang=\s*['"]\s*(\w+)\s*['"]\s*|.*?)>((.|\r|\n)*?)<\/\s*script>/);
        if(!matcher)return null;
        return {
            lang:matcher[2],
            script:matcher[3]
        }
    }

    covertVueFile(inputFilePath,inputRelativeFilePath){
        return new Promise((resolve,reject)=>{
            if(!fs.existsSync(inputFilePath))return reject(`not found ${inputFilePath}`);
            fs.readFile(inputFilePath,'utf8',(err,data)=>{
                if(err)return reject(err);
                if(!data)return reject(`empty file ${inputFilePath}`);
                const fileRef=this.filterVueScript(data);
                if(!["ts","tsx"].includes(fileRef.lang))return reject(`lang=${fileRef.lang} . is not typescript file ${inputFilePath}`);
                inputRelativeFilePath=inputRelativeFilePath.replace(/\.\w+$/,"."+fileRef.lang);
                return this.createTmpFile(inputRelativeFilePath,fileRef.script)
                    .then((targetPath)=>resolve(targetPath))
                    .catch(err=>reject(err));
            })
        })
    }

    createTmpFile(inputRelativePath,script){
        return new Promise((resolve,reject)=>{
            const targetPath=path.join(this.currentTmpDirPath,inputRelativePath);
            const targetDir=path.dirname(targetPath);
            if(!fs.existsSync(targetDir))fs.mkdirSync(targetDir,{recursive:true});
            fs.writeFile(targetPath,script,"utf8",(err,data)=>{
                if(err)return reject(`write tmp file failure: ${targetDir}`);
                resolve(targetPath)
            })

        })
    }

    clearTmp(){
        rmdirSync(this.currentTmpDirPath)
    }

};
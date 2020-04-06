const path=require("path");
const {spawn,spawnSync}=require("child_process");
const {handleOutTs}=require("./handle-out-ts");
const VueSuffix=require("./vue-suffix");
const fs=require("fs");


module.exports=class TsCompile extends VueSuffix{
    constructor() {
        super();
        this.compilerList=[];
        this.vueCompilerlist=[];
        this.concurrentCount=10;
    }
    getDtsFilePath(outputFilePath){
        return path.join(path.dirname(outputFilePath),path.basename(outputFilePath).replace(/\.\w+$/,".d.ts"))
    }

    async typescriptCompile(sourceFile,outputFile){
        return new Promise((resolve,reject)=>{
            const outputDir=path.dirname(outputFile);
            if(outputFile.endsWith(".d.ts")){
                fs.copyFileSync(sourceFile,outputFile);
            }else{
                const tscStream=spawn(process.platform==="win32"?"tsc.cmd":"tsc",[sourceFile,'--outDir',outputDir,"--noResolve","--declaration"]);
                tscStream.on("close",()=>{
                    resolve();
                    handleOutTs(this.getDtsFilePath(outputFile))
                        .then(()=>resolve())
                        .catch((e)=>{
                            console.error(e);
                            resolve();
                        })
                })
            }
        })
    }

    appendCompilerList(sourceFilePath,outputFilePath){
        this.compilerList.push({
            sourceFilePath,
            outputFilePath
        })
    }

    appendVueCompilerList(sourceFilePath,outputRelativePath,outputFilePath){
        this.vueCompilerlist.push({
            sourceFilePath,
            outputRelativePath,
            outputFilePath
        })
    }
    async vueCompilerListToCompileList(){
        for(let {sourceFilePath,outputRelativePath,outputFilePath} of this.vueCompilerlist){
            try {
                const tmpFilePath = await this.covertVueFile(sourceFilePath, outputRelativePath);
                this.appendCompilerList(tmpFilePath,outputFilePath);
            }catch (e) {
                console.error(e);
            }
        }
    }
    async compileTypescript(){
        console.debug("compiler typescript list");
        await this.vueCompilerListToCompileList();
        const compile=async (onceList)=>{
            let max=onceList.length-1;
            let index=0;

            return new Promise((resolve,reject)=>{
                const end=(err)=>{
                    if(++index>=max){
                        resolve();
                    }
                };
                for(let i of onceList){
                    this.typescriptCompile(i.sourceFilePath,i.outputFilePath)
                        .then(()=>end())
                        .catch(()=>end(true))
                }
            })

        };
        const list=[];
        for(let i=0,len=this.compilerList.length;i<len;i+=this.concurrentCount){
              list.push(this.compilerList.slice(i,i+this.concurrentCount));
        }
        for(let onceList of list){
            await compile(onceList);
        }
        this.clear();
    }


    typescriptCompileSync(sourceFilePath,outputFilePath){
        const outputDir=path.dirname(outputFilePath);
        const {error}=spawnSync("tsc",["tsc",sourceFilePath,'--outDir',outputDir,"--noResolve","--declaration"]);
        console.log(error);
    }
    clear(){
        this.clearTmp();
    }


};
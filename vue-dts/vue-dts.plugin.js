const path=require("path");

const id="ztwx-vue-dts";
const HOST=process.cwd();
const TsCompile=require("./TsCompile");
const {getAllTsFiles,clearFile}=require("./input-dir");
/**
// interface Opts{
//     outputDir:string;
//     inputFile:string;
//     inputDir:string;
// }
**/

class VueDtsPlugin{
    constructor(opts) {
        this.inputDir=opts.inputDir;
        this.inputFile=opts.inputFile;
        this.outputDir=opts.outputDir;
        this.inputDirNameArr=this.inputFile.split(path.sep).slice(0,-1);
        this.inputDirLen=this.inputDirNameArr.length;
        this.inputDir=this.inputDirNameArr.join(path.sep);

        this.tsCompile=new TsCompile();
        this.compiledTsFiles=[];
        this.compiledVueScript=[];

    }


    existsCompiledTs(key){
        return this.compiledTsFiles.includes(key);
    }
    existsCompiledVue(key){
        return this.compiledVueScript.includes(key);
    }
    getRelativeOutputPath(filePath){
        const filePathArr=filePath.split(path.sep);

        let notMatched=false,matchIndex=0;
        for(let i of this.inputDirNameArr){
            if(this.inputDirNameArr[i]!==filePathArr[i]){
                notMatched=true;
                break;
            }
            matchIndex++;
        }
        if(notMatched)return null;
        return filePathArr.slice(this.inputDirLen).join("/");
    }
    handleInputDir(){
        if(!this.inputDir)return;
        const fileList=getAllTsFiles(this.inputDir);
        for(let i of fileList){
            this.tsCompile.appendCompilerList(i.filepath,path.join(
                this.outputDir,
                this.getRelativeOutputPath(i.filepath)
            ));
            this.compiledTsFiles.push(i.filepath);
        }

    }

    apply(compiler){
        this.handleInputDir();
        compiler.hooks.compilation.tap(id,(compilation)=>{
            compilation.hooks.buildModule.tap(id,module=>{
                const resource=module.resource;
                // .vue parameter
                if(!resource)return;
                try {
                    let vueMatcher = resource.match(/\.vue$/);
                    let tsMatcher = resource.match(/\.ts$/);
                    let filePath = "";
                    let fileInputPath = path.resolve(resource);
                    if (vueMatcher) {
                        if(this.existsCompiledVue(fileInputPath))return;
                        this.compiledVueScript.push(fileInputPath);
                        const outputRelativePath=this.getRelativeOutputPath(fileInputPath);
                        if(!outputRelativePath)return;
                        this.tsCompile.appendVueCompilerList(fileInputPath,outputRelativePath,
                            path.join(this.outputDir,outputRelativePath)
                        )

                    } else if (tsMatcher) {
                        if (this.existsCompiledTs(fileInputPath)) return;
                        this.compiledTsFiles.push(fileInputPath);
                        const outputRelPath = this.getRelativeOutputPath(fileInputPath);
                        if (!outputRelPath) return;
                        this.tsCompile.appendCompilerList(fileInputPath,
                            path.join(this.outputDir,outputRelPath)
                        );


                    }
                }catch (e) {

                }

            })
        });

        compiler.hooks.emit.tapAsync(id,(c,cb)=>{

            this.tsCompile.compileTypescript()
                .then(()=>{
                    clearFile(/\.js$/,this.outputDir);
                    cb();
                })
                .catch(()=>{
                    cb();
                })
        })
    }
}

module.exports=VueDtsPlugin;
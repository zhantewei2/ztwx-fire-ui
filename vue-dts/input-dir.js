const fs=require("fs");
const path=require("path");
const getAllTsFiles=(dirPath,list=[])=>{
    if(!fs.existsSync(dirPath))return;
    const stat=fs.statSync(dirPath);
    if(stat.isDirectory()){
        const dirList=fs.readdirSync(dirPath);
        for(let filename of dirList){
            getAllTsFiles(path.join(dirPath,filename),list);
        }
    }else{
        const suffix=path.extname(dirPath);
        if(!suffix)return;
        if([".ts",".tsx"].includes(suffix)){
            list.push({
                filepath:dirPath,
                extname:suffix.slice(1)
            })
        }
    }
    return list;
};

const clearFile=(reg,dir)=>{
    if(!fs.existsSync(dir))return;
    const stat=fs.statSync(dir);
    if(stat.isDirectory()){
        const list=fs.readdirSync(dir);
        for(let filename of list){
            clearFile(reg,path.join(dir,filename));
        }
    }else{
        if(reg.test(dir)){
            fs.unlinkSync(dir);
        }
    }
};

exports.getAllTsFiles=getAllTsFiles;
exports.clearFile=clearFile;
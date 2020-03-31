const fs=require("fs");

const replaceVue=(source)=>{
    return source.replace(/import.*from\s+['"](.*?)?(\.vue)['"]/g,(matchStr)=>{
        return matchStr.replace(/\.vue/,"");
    });
}


exports.handleOutTs=async(outputFilePath)=>{
    return new Promise((resolve,reject)=>{
        if(!fs.existsSync(outputFilePath))return reject(`not found ${outputFilePath}`);
        fs.readFile(outputFilePath,"utf-8",(err,data)=>{
            if(err)return reject(err);
            let result="";
            try{
               result=replaceVue(data);
            }catch (e){}
            if(!result)return reject("not result");
            console.debug(`write file:${outputFilePath}`);
            fs.writeFile(outputFilePath,result,"utf8",(err)=>{
                if(err)return reject(err);
                resolve();
            })
        })
    })
};
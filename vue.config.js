const path =require("path");
const join=(...args)=>
    path.resolve(__dirname,...args);

const currentEnv=process.env.NODE_ENV;
module.exports={
    productionSourceMap:false,
    chainWebpack:config=>{
        //环境配置
        console.log("current_env:",currentEnv);
        // config.resolve.alias
        //     .set("@config",join("src/envs/config.dev.ts"));

    }
};
const path =require("path");
const join=(...args)=>
    path.resolve(__dirname,...args);

const current_env=process.env.NODE_ENV;
module.exports={
    productionSourceMap:false,
    pages:{

    },
    chainWebpack:config=>{
        //环境配置
        console.log("current_env:",current_env);
        // config.resolve.alias
        //     .set("@config",join("src/envs/config.dev.ts"));

    }
};
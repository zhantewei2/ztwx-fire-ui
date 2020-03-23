module.exports =api=>{
    api.cache(true);
    console.log(process.env.NODE_ENV)
    return {
      presets: [
        '@vue/cli-plugin-babel/preset'
      ],
  }
};
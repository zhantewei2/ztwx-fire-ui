module.exports =api=>{
    api.cache(true);
    return {
      presets: [
        '@vue/cli-plugin-babel/preset'
      ],
  }
};
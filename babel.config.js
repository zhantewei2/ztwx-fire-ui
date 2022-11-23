module.exports =api=>{
    api.cache(true);
    return {
      presets: [
        '@vue/cli-plugin-babel/preset',
          [
              '@vue/babel-preset-jsx',
              {
                  vModel: true,
                  compositionAPI: false,
              },
          ],
      ],
  }
};

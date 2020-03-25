const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const VueLoaderPlugin=require("vue-loader/lib/plugin");
const HOST_PATH=process.cwd();
const MiniCssExtractPlugin=require("mini-css-extract-plugin");

const WORKSPACE_PATH=__dirname;
const DIST_PATH=path.join(process.cwd(),"lib/package");

process.env.NODE_ENV="production";
const webpackConfigBase={
    mode:"production",
    entry:path.join(WORKSPACE_PATH,"index.ts"),
    output:{
        filename:"[name].js",
        path:DIST_PATH,
        publicPath:"/",
        libraryTarget:"umd",
    },
    devtool:"eval-source-map",
    externals:{
        vue:{
            commonjs:"vue",
            amd:"vue",
            commonjs2:"vue"
        },
        "vue-property-decorator":{
            commonjs2:"vue-property-decorator",
            commonjs:"vue-property-decorator",
            amd:"vue-property-decorator"
        },
        "rxjs":{
            commonjs:"rxjs",
            amd:"rxjs",
            commonjs2:"rxjs"
        },
        "rxjs/operators":{
            commonjs:"rxjs/operators",
            amd:"rxjs/operators",
            commonjs2:"rxjs/operators"
        }
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:[
                    {loader:"vue-loader"}
                ]
            },
            {
                test:/\.ts$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:"babel-loader",
                    },
                    {loader:"ts-loader",
                        options:{
                            transpileOnly:true,
                            appendTsSuffixTo:['\\.vue$'],
                            happyPackMode:false
                        }
                    }
                ]

            },
            {
                test:/\.css$/,use:["style-loader","css-loader"]
            },
            {
                test:/\.scss$/,use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test:/\.(woff|woff|eot|ttf|otf)/,
                use:[
                    {loader:"file-loader",options:{name:"fonts/[name].[hash].[ext]",publishPath:DIST_PATH}}
                ]
            },
            {
                test:/\.css$/,
                oneOf:[
                    {resourceQuery: /\?vue/,use:[
                            {loader:"vue-style-loader",options:{
                                    sourceMap:false,
                                    shadowMode:false,
                                }},{
                                loader:"css-loader",options:{
                                    sourceMap:false,
                                    importLoaders:2
                                }},
                            {
                                loader:"postcss-loader"
                            }
                        ]},
                    {use:["vue-style-loader","css-loader","postcss-loader"]
                    }
                ]
            }
        ],
    },
    resolve:{
        extensions:[".ts",".tsx",".js"]
    },
    optimization:{
        usedExports:true
    },
    plugins:[
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "index.css"
        })
    ]
};


module.exports=[
    webpackConfigBase
];
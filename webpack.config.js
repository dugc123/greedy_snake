const path = require('path');

//引入html插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    //指定入口文件
    entry:"./src/index.ts",

    //指定打包文件所在的目录
    output:{
        //指定打包文件的目录
        path:path.resolve(__dirname,'dist'),
        //打包后文件的名字
        filename:'bundle.js',
        //告诉webpack不使用箭头函数
        environment:{
            arrowFunction:false,
            //兼容ie10
            const:false
        }
    },
    //指定webpack打包时要用到的模块
    module:{
        //指定加载的规则
        rules:[
            {
                //test指定规则生效的文件
                test:/\.ts$/,
                //要使用的文件
                use:[
                    //配置babel
                    {
                        //指定加载器
                        loader:'babel-loader',
                        //设置babel
                        options:{
                            //设置预定义的环境
                            presets:[
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的目标浏览器
                                        targets:{
                                            "chrome":"88",
                                            "ie":"11"
                                        },
                                        //指定corejs的版本
                                        "corejs":"3",
                                        //使用corejs的方式,"usage"表示按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                //要排除的文件
                exclude:/node_modules/
            },{
                //设置less文件的处理
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //引用postcss
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:"last 2 versions"
                                        }
                                    ]
                                ]
                            }
                            
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    //配置webpack插件
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title:"自定义的title"
            template:"./src/index.html"
        }),

    ],
    resolve: {
        extensions: ['.ts','.tsx','.js','.jsx']
    },
    mode:"development"
}



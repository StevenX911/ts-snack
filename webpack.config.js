const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // 设置webpack输出结果不使用箭头函数()=>{}
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: [{
                        // 加载babel-loader
                        loader: 'babel-loader',
                        // 设置babel-loader
                        options: {
                            presets: [
                                [
                                    // 指定环境的插件
                                    '@babel/preset-env',
                                    // 插件配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": 55,
                                            "ie": 11
                                        },
                                        // 指定corejs版本
                                        'corejs': 3,
                                        // 使用corejs的方式
                                        'useBuiltIns': 'usage' // 按需加载
                                    }
                                ],
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            // 处理less文件
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 设置postcss
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            // 要兼容的浏览器
                                            browsers: 'last 2 versions'
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
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 用于设置引用的模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}
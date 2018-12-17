const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackDevServer = require("webpack-dev-server");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { root } = require("./helpers");

const compiler = webpack({
    entry: {
        app: root("examples/es6-usage/index.js")
    },
    output: {
        path: root("dist"),
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    mode: "development",
    devtool: "source-map",
    resolve: {
        alias: {
            vue$: "vue/dist/vue.js",
            // 'uniqy$': root('dist/uniqy-core.esm.js'),
            // '@uniqy/core$': root('dist/uniqy-core.esm.js'),
            "easy-vuex$": root("src/index.js")
        },
        extensions: [".js", ".vue"]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            ...require(root(".babelrc"))
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: root("examples/es6-usage/index.html")
        }),
        new webpack.HotModuleReplacementPlugin({
            // Options...
        }),
        new webpack.ProvidePlugin({
            Vue: "vue",
            vue: "vue"
        })
    ]
});

const HOST = "0.0.0.0",
    PORT = "6060";

const server = new WebpackDevServer(compiler, {
    contentBase: [root("dist")],
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    compress: true,
    inline: true,
    disableHostCheck: true,
    watchContentBase: true,
    hot: true,
    before(app) {}
});

server.listen(PORT, HOST, () => {
    console.log(`webpack-dev-server is listening http://${HOST}:${PORT}`);
});

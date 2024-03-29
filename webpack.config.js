const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const extractPlugin = new ExtractTextPlugin({
    filename: 'bundle.css'
});

var API_URL = {
	    production: JSON.stringify('https://codl.dev/api/'),
	    development: JSON.stringify('http://localhost:8080/api/')
}

var URL = {
	    production: JSON.stringify('https://codl.dev/'),
	    development: JSON.stringify('http://localhost:3000/')
}

var environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {

    devServer: {
        historyApiFallback: true
    },

    //Allow to debug on actual source instead of minified
    //devtool: "source-map",

    //This property defines where the application starts
    entry: './src/main/js/index.js',

    //This property defines the file path and the file name which will be used for deploying the bundled file
    output: {
        path: path.join(__dirname, './src/main/webapp/dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    //Setup loaders
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        "plugins": [
                            "@babel/transform-runtime",
                            "@babel/proposal-class-properties"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: extractPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: '/img'
                        },
                    },
                ],
            },
        ]
    },

    // Setup plugin to use a HTML file for serving bundled js files
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/main/resources/static/index.html',
            favicon: './src/main/resources/static/img/favicon.ico',
        }),
        extractPlugin,
        new CleanWebpackPlugin(),
        new WebpackPwaManifest({
            name: 'Codl',
            short_name: 'Codl',
            description: 'Share cool pieces of code',
            background_color: '#01579b',
            theme_color: '#01579b',
            'theme-color': '#01579b',
            start_url: '/',
            icons: [
                {
                    src: path.resolve('./src/main/resources/static/img/favicon.ico'),
                    sizes: [16, 24, 32, 64],
                    destination: path.join('img')
                }
            ]
        }),
        new webpack.DefinePlugin({
        	'API_URL': API_URL[environment],
        	'URL': URL[environment]
        })
    ]
}
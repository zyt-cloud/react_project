const path = require('path');

const webpack = require('webpack');

const htmlWebpackPlugin = require('html-webpack-plugin');
// const copyWebpackPlugin = require('copy-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin("assets/css/less.[contenthash:6].css");
const extractCss = new ExtractTextPlugin("assets/css/css.[contenthash:6].css");


const fs = require('fs');

const pkgPath = path.join(__dirname, 'package.json');
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};

let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
    let cfgPath = pkg.theme;
    // relative path
    if (cfgPath.charAt(0) === '.') {
      cfgPath = path.resolve(__dirname, cfgPath);
	}
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}



module.exports = {
	// entry: path.join(__dirname, 'src/index.js'),
	entry: {
		app: [/*'classlist-polyfill',*/ 'babel-polyfill', path.join(__dirname, 'src/index.js')]/*,
		vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']*/
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'assets/js/[name].[chunkhash:8].js',
		chunkFilename: 'assets/js/[name].[chunkhash:8].js',
		publicPath: '/'
	},

	module: {
		rules: [{
			test: /\.css$/,
			// use: ['style-loader', 'css-loader']
			use: extractCss.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						minimize: process.env.NODE_ENV === 'production' ? true : false //css压缩
					}
					
				}, 'postcss-loader'
				]
			}),
			//include: [path.join(__dirname, 'src/pages/user')]
		},{
			test: /\.less$/i,
			// use: ['style-loader', 'css-loader']
			use: extractLess.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
						options: {
							minimize: process.env.NODE_ENV === 'production' ? true : false //css压缩
						}
						
					}, 'postcss-loader', /*'less-loader'*/`less-loader?{"modifyVars":${JSON.stringify(theme)}}`
				]
			})
		},{
			test: /\.js$/,
			use: ['babel-loader?cacheDirectory=true'],
			include: [path.join(__dirname, 'src')]
		},{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'assets/img/[name].[hash:6].[ext]',
					// publicPath: '../../'
				}
			}]
		},
        {
	        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
	        loader: 'url-loader',
	        options: {
	          limit: 10000,
	          name: 'assets/media/[name].[hash:6].[ext]'
	        }
        },
       	{
	        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
	        loader: 'url-loader',
	        options: {
	          limit: 10000,
	          name: 'assets/fonts/[name].[hash:7].[ext]'
	        }
        }/*,{
			test: /\.less$/,
			use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
		}*/]
	},
	resolve: {
		alias: {
			PAGES: path.join(__dirname, 'src/components'),
			REDUX: path.join(__dirname, 'src/redux'),
			UTILS: path.join(__dirname, 'src/utils'),
		},
		/*extensions: ['.jsx', '.js', '.json'],
		mainFields: ['jsnext:main', 'main'] */
	},

	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'src/index.html')
		}),

		//new webpack.HashedModuleIdsPlugin(), // HashedModuleIdsPlugin

		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function(module, count){
				return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, 'node_modules')) === 0;
			}
		}),

		/*new webpack.optimize.CommonsChunkPlugin({
			name: 'runtime'
		}),*/

		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
  			chunks: ['vendor']
		}),

		extractLess,
		extractCss,

		/*new copyWebpackPlugin([{
			from: 'src/assets', to: 'assets'
		}])*/

		/*new webpack.LoaderOptionsPlugin({  
            options: {  
                postcss: function(){  
                    return [  
                        require("autoprefixer")({  
                            browsers: ['ie>=9','>1% in CN']  
                        })  
                    ]  
                }  
            }  
        })  */

	]
};

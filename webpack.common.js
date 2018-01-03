const path = require('path');

const webpack = require('webpack');

const htmlWebpackPlugin = require('html-webpack-plugin');
// const copyWebpackPlugin = require('copy-webpack-plugin');

const fs = require('fs');
console.log(9, fs)

module.exports = {
	// entry: path.join(__dirname, 'src/index.js'),
	entry: {
		app: ['classlist-polyfill', 'babel-polyfill', path.join(__dirname, 'src/index.js')]/*,
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
			test: /\.js$/,
			use: ['babel-loader?cacheDirectory=true'],
			include: [path.join(__dirname, 'src')]
		},{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'assets/img/[name].[hash:6].[ext]'
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

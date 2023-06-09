const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/i,
        type: 'asset/resource',
        generator: {
            //filename: 'fonts/[name]-[hash][ext][query]'
            filename: 'fonts/[name][ext][query]'
        }
    },
    
    // Rule for processing .css and .scss files
    {
        test: /\.s?css$/,
        use: [
            // Save the CSS as a separate file to allow caching                            
            MiniCssExtractPlugin.loader,
            {
                // Translate CSS into CommonJS modules
                loader: 'css-loader',
            },
            {
                // Run postcss actions
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            function () {
                                return [ require('autoprefixer') ];
                            }
                        ],
                    },
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sassOptions: {
                        outputStyle: "compressed",
                    }
                }
            }
        ],
    },
      
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
//   optimization: {
//     runtimeChunk: 'single',
//   },
};
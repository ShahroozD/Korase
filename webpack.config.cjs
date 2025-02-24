const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/render.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'render.cjs',
    library: 'render',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpg|webp|gif|svg|mp4)$/,
        use: [{
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]?[hash]',
                    context: 'myApp',
                    publicPath: '/myApp',
                    useRelativePath: true,
                    emitFile: false
                }
            },
            {
                loader: 'webp-loader'
            }
        ]
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'src/styles', to: 'dist/styles' } // Copy additional styles if needed
    //   ],
    // })
  ],
  mode: 'production', // or 'development' if needed
  target: 'node'
};

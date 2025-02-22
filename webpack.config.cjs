const path = require('path');

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
        use: ['style-loader', 'css-loader'] // Add this rule for handling CSS files
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
  mode: 'production', // or 'development' if you want a non-minified build
  target: 'node'
};

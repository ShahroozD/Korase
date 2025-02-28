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
        type: 'asset/resource',
        generator: {
          filename: 'pics/[name][ext]?[hash]', // Ensures images are placed in `dist/pics`
          publicPath: '/', // Ensures image URLs are `/public/pics/...`
        }
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '**/*.{jpg,png,webp}'), // Only match these file types
          to: path.resolve(__dirname, 'public/pics/[name][ext]'), // Destination folder
          context: path.resolve(__dirname, 'templates'), // Ensures relative paths are preserved
          globOptions: {
            ignore: ['**/exclude-folder/**'], // (Optional) Exclude specific folders if needed
          },
          noErrorOnMissing: true, // Avoid errors if no matching files exist
        },
        {
          from: path.resolve(__dirname, 'templates/**/*.js'), // Copy JS files
          to: path.resolve(__dirname, 'public/scripts/[name][ext]'), // Flatten JS into `public/script`
          context: path.resolve(__dirname, 'templates'),
          noErrorOnMissing: true,
        }
      ]
    })
  ],
  mode: 'production', // or 'development' if needed
  target: 'node'
};

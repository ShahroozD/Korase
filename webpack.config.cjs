const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const templateEntries = {};
glob.sync('./templates/*/index.jsx').forEach(file => {
    const name = path.basename(path.dirname(file)); // Get template folder name
    templateEntries[name] = file; // Use template name instead of "index"
});

const pluginEntries = {};
glob.sync('./src/plugins/*/*.js').forEach(file => {
    const name = path.basename(path.dirname(file)); // Get template folder name
    pluginEntries[name] = file; // Use template name instead of "index"
});

module.exports = [
  // **Config for templates (ESM Module)**
  {
    entry: templateEntries,
    output: {
      path: path.resolve(__dirname, 'dist/templates'),
      filename: '[name]/index.mjs', 
      library: { type: 'module' },
      globalObject: 'this'
    },
    experiments: { outputModule: true },
    externals: {
      react: 'react', // ✅ Prevents multiple React instances
      'react-dom': 'react-dom'
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
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name]/styles.css',
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
          }
        ]
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',  // This ensures all CSS is merged into `styles.css`
            type: 'css/mini-extract',
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    mode: 'production',
    target: 'node'
  },
  {
    entry: pluginEntries,
    output: {
      path: path.resolve(__dirname, 'dist/plugins'),
      filename: '[name].mjs', 
      library: { type: 'module' },
      globalObject: 'this'
    },
    experiments: { outputModule: true },
    externals: {
      react: 'react', // ✅ Prevents multiple React instances
      'react-dom': 'react-dom'
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
          }
        ]
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',  // This ensures all CSS is merged into `styles.css`
            type: 'css/mini-extract',
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    mode: 'production',
    target: 'node'
  },
  // **Config for render.cjs (CommonJS UMD Module)**
  {
    entry: './src/render.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'render.cjs',
      library: 'render',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    externals: {
      react: 'react', // ✅ Prevents multiple React instances
      'react-dom': 'react-dom'
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
      extensions: ['.js', '.jsx']
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
          },
           {
            from: path.resolve(__dirname, 'templates/**/*.js'),
            to: path.resolve(__dirname, 'dist/templates/[name][ext]'),
            context: path.resolve(__dirname, 'templates'),
            noErrorOnMissing: true,
          },
          {
            from: path.resolve(__dirname, 'plugins/**/*.js'),
            to: path.resolve(__dirname, 'dist/plugins/[name][ext]'),
            context: path.resolve(__dirname, 'plugins'),
            noErrorOnMissing: true,
          }
        ]
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',  // This ensures all CSS is merged into `styles.css`
            type: 'css/mini-extract',
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    mode: 'production', // or 'development' if needed
    target: 'node'
  }
];

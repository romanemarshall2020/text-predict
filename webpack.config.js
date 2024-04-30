module.exports = {
    // Existing config...
    resolve: {
      alias: {
        Utilities: path.resolve(__dirname, 'src/utilities/'),
        Templates: path.resolve(__dirname, 'src/templates/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(js|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: ['babel-loader', 'file-loader'],
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'assets/', // Optional: specifies output path for the files.
                },
              },
            ],
          },
          
      ] 
    }
  };
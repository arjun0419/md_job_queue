const path = require('path');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  module: {
    rules: [
      { test: /\.jsx?$/, 
        exclude: /node_modules/,
        loader: "babel-loader" 
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx',],
  },
};

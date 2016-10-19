var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: './src/app/app.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:8090/assets'
    },
    module: {
        loaders: [
            {test: /.js$/, loaders: 'babel-loader'},
            {test: /\.jsx$/,loader: 'jsx-loader?insertPragma=React.DOM&harmony'},
            {test: /\.css/, loader: 'style-loader!css-loader'}
        ]
    },
    externals: {
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
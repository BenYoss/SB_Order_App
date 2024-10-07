const path = require('path');

module.exports = {
    // Defines the entry point of the codebase compiled into a bundle.
    entry: ['regenerator-runtime/runtime.js', path.resolve('./src/Index.tsx')],

    // Defines the exit point for bundle to reside.
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {// Defines react file ruleset.
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {// Defines css and sass/scss rulesets.
                test: /\.(css|s[ac]ss)$/,
                use: ['style-loader', 'sass-loader', 'css-loader'],
                exclude: /node_modules/
            }
        ]
    },
    // How the webpack compiler will operate, this is quicker and best for dev modes
    devtool: 'eval-source-map',
    // How the compiler will idenfiy modules by extensions.
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    }
};

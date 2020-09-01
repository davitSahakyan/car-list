const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "boundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};

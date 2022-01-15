//config,merge vs 1 trong 2 file kia
const path = require("path");


module.exports = {
  entry:{
    main:"./src/index.js", //ndiem bat dau de bien dich(nguon)
    vendor:"/src/vendor.js",
  },

  module: {
    rules: [
      //npm install file-loader html-loader --save-dev
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        ///doan use fileloader trong webpack 5 k can
        use: {
          loader: "file-loader",
          options: {
            esModule: false,
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
        type: "javascript/auto",
      },
    ],
  },

};

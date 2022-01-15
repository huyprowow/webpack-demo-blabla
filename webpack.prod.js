//them cai nay vao npm script start
//build : webpack --config webpack.prod.js
//cai  npm install --save-dev webpack-merge de merge voi file webpack.common.js

const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
//npm install clean-webpack-plugin --save-dev
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("TerSer-webpack-plugin");

//npm install --save-dev mini-css-extract-plugin de no k phai import lai style tag tu file js moi khi load lai trang (xuat vao 1 file css sau do nhung no vao link tag), tang hieu suat
//npm install --save-dev css-minimizer-webpack-plugin
/*

ban update ^2.5.0 mini-css-extract-plugin loi "TypeError: MiniCssExtractPlugin is not a constructor"  neen sua bang cach cai ban cu cho ben kia update ban fix
-giai quyet (th dung yarn)
resolutions is yarn feature. If you're not using yarn, you can either run
  "resolutions": {
    "mini-css-extract-plugin": "2.4.5"
  },
in package.json.

- giai quyet (th dung npm)
npm i -D --save-exact mini-css-extract-plugin@2.4.5
- giai quyet npm phien ban npm@>=8.3.0, them overrides vao package.json

  "overrides": {
    "mini-css-extract-plugin": "2.4.5"
  }

to your package.json, and run npm i
*/
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); //webpack 5 dung cai nay
module.exports = merge(common, {
  mode: "production", //che do san xuat
  output: {
    //hash tenfisle de thay doi cap nhap noi dung
    filename: "[name].[contenthash].bundle.js", //tep bien dich ra
    path: path.resolve(__dirname, "dist"), //thu muc bien dich ra
    // assetModuleFilename: "images/[name].[hash].[ext]",
  },
  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      //npm install --save-dev style-loader css-loader, trong index.js co import file css kia vao
      {
        test: /\.css$/, //cac file can bien dich (regex)
        use: [MiniCssExtractPlugin.loader, "css-loader"], //css-loader bien css thanh chuoi js,sau do style-loader them no vao trong the <style>
        //=> k can them vao link html van co the thay doi style,dat dung thu tu (nguoc lai)

        // assetModuleFilename: "./imgs/[name].[hash].[ext]", trong webpack 5 de tai anh chi can cai nay k can dung fileloader nua
      },
      //cai them npm install sass-loader sass webpack --save-dev, trong index.js  import file scss
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, //3. them vao file css, link tag
          "css-loader", //2 css->js
          "sass-loader", //1. scss->css
        ],
      },
    ],
  },
});

// cai webpack-dev-server de build lai moi khi thay doi npm install --save-dev webpack-dev-server
//them cai nay vao npm script start
//start : webpack serve --config webpack.dev.js --open    cai--open la de tu dong mo trinh duyet

//cai  npm install --save-dev webpack-merge  de merge voi file webpack.common.js
const path = require("path");
const { merge } = require("webpack-merge");
// Trong phiên bản webpack-merge mới (webpack 5) const {merge} = request ('webpack-merge');
const common = require("./webpack.common");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development", //che do pt
  output: {
    //hash tenfisle de thay doi cap nhap noi dung
    filename: "[name].bundle.js", //tep bien dich ra
    path: path.resolve(__dirname, "dist"), //thu muc bien dich ra
    //assetModuleFilename: "images/[name].[ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", //lay mau html tu file template nhets file js da hash vao voi css vao
    }),
  ],
  module: {
    rules: [
      //npm install --save-dev style-loader css-loader, trong index.js co import file css kia vao
      {
        test: /\.css$/, //cac file can bien dich (regex)
        use: ["style-loader", "css-loader"], //css-loader bien css thanh chuoi js,sau do style-loader them no vao trong the <style>
        //=> k can them vao link html van co the thay doi style,dat dung thu tu (nguoc lai)

        // assetModuleFilename: "./imgs/[name].[hash].[ext]", trong webpack 5 de tai anh chi can cai nay k can dung fileloader nua
      },
      //cai them npm install sass-loader sass webpack --save-dev, trong index.js  import file scss
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader", //3. them vao style tag
          "css-loader", //2 css->js
          "sass-loader", //1. scss->css
        ],
      },
    ],
  },
});

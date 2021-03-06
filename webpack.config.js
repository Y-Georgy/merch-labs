const path = require('path'); // подключаем path к конфигу вебпак (утилита, которая превращает относительный путь в абсолютный)
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключаем плагин HtmlWebpackPlugin для обработки html файлов
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // плагин для удаления содержимого папки dist при сборке проекта
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // плагин для объединения css файлов


module.exports = { // module.exports — это синтаксис экспорта в Node.js
  entry: { main: './index.js' }, // указали первое место, куда заглянет webpack
  output: {
    //path: './dist/', // путь к точке выхода
    path: path.resolve(__dirname, 'dist'), // переписали точку выхода, используя утилиту path
    filename: 'main.js', // указали в какой файл будет собираться весь js и дали ему имя
    publicPath: '' // свойство для обновления путей внутри CSS- и HTML-файлов
  },
  mode: 'development', // добавили режим разработчика
  devtool: 'inline-source-map', // чтобы ошибки в консоли указывали на нужную строчку
  devServer: {
    contentBase: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 3000, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    hot: true,
    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|ico)$/,
        type: 'asset/resource' // значение asset/resource позволяет переносить исходные файлы в конечную сборку в том же формате.
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 } // добавляем эту строку, если в css используем @import
        },
        'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // подключение плагина для удаления содержимого папки dist при сборке проекта
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов css
    ]
};



const translate = require('node-google-translate-skidz');
const readline = require('readline')
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log(chalk.yellow('Введите текст который нужно перевести на русский: '))

rl.on('line', (cmd) => {
  if (cmd === 'Q' || cmd === 'q' || cmd === 'Й' || cmd === 'й') {
    console.log(chalk.hex('#cee2ed').bgGrey(' Перевод завершен '))
    rl.close()
  } else {
    translate({
      text: cmd,
      source: 'auto',
      target: 'ru'
    }, function show(result) {
      console.log('Язык ' + lang.get(result.src) + '(' + result.src + ') на Русский')
      console.log('Перевод: ' + chalk.white.bgRed.bold(' ' + result.translation + ' '))
      console.log('----------')
      console.log(chalk.yellow('Введите текст для перевола или ') + chalk.hex('#cee2ed').bgGrey(' Q для выхода '))
    })
  }
})
var lang = new Map([
  ['ar', 'Арабский'],
  ['am', 'Амхарский'],
  ['az', 'Азербайжанский'],
  ['en', 'Английский(US)'],
  ['sq', 'Албанский'],
  ['hy', 'Армянский'],
  ['eu', 'Баскский'],
  ['bn', 'Бенгальский'],
  ['be', 'Белорусский'],
  ['en-GB', 'Английский(UK)'],
  ['pt-BR', 'Португальский(Бразилия)'],
  ['fr', 'Французкий'],
  ['bg', 'Болгарский'],
  ['ca', 'Каталонский'],
  ['hr', 'Хорватский'],
  ['cs', 'Чешский'],
  ['da', 'Датский'],
  ['nl', 'Нидерландский'],
  ['et', 'Эстонский'],
  ['eo', 'Эсперанто'],
  ['fil', 'Филиппинский'],
  ['fi', 'Финский'],
  ['de', 'Немецкий'],
  ['el', 'Греческий'],
  ['gu', 'Гуджарати'],
  ['iw', 'Иврит'],
  ['hi', 'Хинди'],
  ['hu', 'Венгерский'],
  ['is', 'Исландский'],
  ['id', 'Индонезийский'],
  ['it', 'Итальянский'],
  ['ja', 'Японский'],
  ['kk', 'Казахский'],
  ['kn', 'Каннадский'],
  ['ko', 'Корейский'],
  ['la', 'Латинский'],
  ['lv', 'Латышский'],
  ['lt', 'Литовский'],
  ['ms', 'Малайский'],
  ['ml', 'Малаялам'],
  ['mr', 'Маратхи'],
  ['no', 'Норвежский'],
  ['pl', 'Польский'],
  ['pt', 'Португальский'],
  ['ro', 'Румынский'],
  ['ru', 'Русский'],
  ['sr', 'Сербский'],
  ['zh-CN', 'Китайский (КНР)'],
  ['sk', 'Словацкий'],
  ['sl', 'Словенский'],
  ['es', 'Испанский'],
  ['sw', 'Суахили'],
  ['sv', 'Шведский'],
  ['ta', 'Тамильский'],
  ['te', 'Телугу'],
  ['th', 'Тайский'],
  ['tr', 'Турецкий'],
  ['ur', 'Урду'],
  ['uk', 'Украинский'],
  ['vi', 'Вьетнамский'],
  ['cy', 'Валлийский'],
  ['zu', 'Зулу']
])

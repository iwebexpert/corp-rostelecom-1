var clc = require("cli-color")

console.log(clc.red("Все в красном"))

console.log(clc.green.bgWhite.underline("Можно и так. Зеленым по белому и подчеркнуть"))

console.log(clc.red("red") + " default color " + clc.blue("blue"))

console.log(clc.red("red " + clc.blue("blue") + " red"))
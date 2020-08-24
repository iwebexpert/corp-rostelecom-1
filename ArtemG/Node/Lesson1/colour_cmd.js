const chalk = require('chalk')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.on('line', (cmd) => {
    colorText(cmd)
    if(cmd === 'exit') {
        rl.close()
    }
})

function colorText(reg) {
    for (let i = 0; i < reg.length; i++){

        if (reg[i].match(/\W/i)){
            process.stdout.write(chalk.blue(reg[i]))       
        } else if (reg[i].match(/\d/i)){
            process.stdout.write(chalk.green(reg[i]))
        } else {
            process.stdout.write(chalk.yellow(reg[i]))        
        }    
    }
}


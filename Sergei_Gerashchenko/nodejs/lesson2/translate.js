const  {translate}  = require("google-translate-api-browser")
const readline = require("readline")

const rl = readline.createInterface(process.stdin, process.stdout)


rl.setPrompt("Что перевести > ")
rl.prompt()

rl.on("line", function(line) {
    if(line == "exit") {
        rl.close()
        return
    }
    translate(line, { to: "en" })
        .then(res => {
            rl.setPrompt(line + " > " + res.text + "\nЧто перевести > ")
            rl.prompt()
        })
        .catch(err => {
            console.error(err)
        })
}).on("exit", function() {
    rl.close()
});
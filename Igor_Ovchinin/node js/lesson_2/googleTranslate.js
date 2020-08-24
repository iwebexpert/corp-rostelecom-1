var { translate } = require("google-translate-api-browser");
var readline = require("readline");

var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt("translate English text > ");
rl.prompt();

rl.on("line", function (line) {
    translate(line, { to: "ru" })
        .then(res => {
            rl.setPrompt(line + " > " + res.text + "\ntranslate > ");
            rl.prompt();
        })
        .catch(err => {
            console.error(err);
        });
}).on("close", function () {
    process.exit(0);
});
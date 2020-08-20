const ansi = require('ansi')

const cursor = ansi(process.stdout)

cursor.white().bg.red().write('Node.js').reset().bg.reset().write('\n')
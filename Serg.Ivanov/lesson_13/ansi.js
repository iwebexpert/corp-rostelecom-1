const ansi = require('ansi')

const cursor = ansi(process.stdout)

cursor.white().bg.red().write('Node.js Hello').reset().bg.reset().write('\n')
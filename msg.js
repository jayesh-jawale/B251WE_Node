const fs = require('fs')

fs.readFile('./msg.txt', 'utf-8', (err, data) => {
    console.log(data);
})

const data = 'Written by Jayesh Jawale'
fs.writeFile('./qoutes.txt', data, (err) => {
    console.log('Writing Done')
})

const name = '\nJawale'
fs.appendFile('./awesome.txt', name, (err) => {
    console.log('Done Updating');
})
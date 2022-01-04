const fs = require('fs');

const quote = 'This is creating files';

for (let i = 0; i < 10; i++) {
    fs.writeFile(`./backups/test-${i}.html`, quote, (err) => {
        console.log('Completed Writing')
    })
    
}
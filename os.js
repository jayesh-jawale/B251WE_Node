const os = require('os');
console.log('Free Memory', os.freemem());
console.log('Total Memory', os.totalmem());
console.log('Version', os.version());
console.log('Processor', os.cpus());
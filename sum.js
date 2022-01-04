const sum = (a,b) => a +b;
console.log(sum(10,20))

const [, , num1, num2] = process.argv
console.log(sum(+num1, +num2))
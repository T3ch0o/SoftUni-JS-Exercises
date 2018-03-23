function reversedNumbers() {
   return Array.from(arguments).reverse().join('\n');
}

console.log(reversedNumbers(10, 15, 20));
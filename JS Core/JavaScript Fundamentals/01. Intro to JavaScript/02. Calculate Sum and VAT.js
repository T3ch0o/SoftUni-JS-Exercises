function sumNumbers(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    let vat = sum * 0.20;
    let totalSum = sum + vat;

    console.log(`sum = ${sum}\nVAT = ${vat}\ntotal = ${totalSum}`);
}
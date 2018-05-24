function shopping(arr) {
    const budget = arr[0];

    const chocolate = arr[1] * 0.65;
    const milk = arr[2] * 2.7;
    const oranges = Math.floor(arr[1] * 0.65) * 0.2;

    const sum = chocolate + milk + oranges;

    return sum <= budget ?
        `You got this, ${(budget - sum).toFixed(2)} money left.` :
        `Not enough money, you need ${(sum - budget).toFixed(2)} more.`;
}

console.log(shopping([3, 4, 2.7]));
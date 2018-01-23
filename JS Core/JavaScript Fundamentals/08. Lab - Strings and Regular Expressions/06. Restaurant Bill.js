function restaurantBill(input) {
    let products = input.filter((e, i) => i % 2 == 0);
    let prices = input.filter((e, i) => i % 2 == 1).map(Number).reduce((a, b) => a + b);

    console.log(`You purchased ${products.join(', ')} for a total sum of ${prices}`);
}

restaurantBill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69']);
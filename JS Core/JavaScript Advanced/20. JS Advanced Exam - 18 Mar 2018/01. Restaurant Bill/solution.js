function addProduct() {
    const product = $('input[type=text]');
    const price = $('input[type=number]');
    const total = $('tfoot tr td:last-child');
    const products = $('#product-list');

    if (product.val() === '' || price.val() === '' || Number(price.val()) < 0) {
        return;
    }

    products
        .append($('<tr>')
            .append(`<td>${product.val()}</td><td>${price.val()}</td>`));

    total.text(Number(price.val()) + Number(total.text()));

    product.val('');
    price.val('');
}
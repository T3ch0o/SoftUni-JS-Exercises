function extractText() {
    let items = [];

    $('#items li').each((index, element) => items.push(element.textContent));
    $('#result').text(items.join(', '))
}
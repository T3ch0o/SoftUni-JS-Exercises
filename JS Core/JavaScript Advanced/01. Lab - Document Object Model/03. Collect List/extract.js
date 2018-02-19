function extractText() {
    let area = document.getElementById('result');
    let ul = document.querySelectorAll('#items li');

    for (let data of ul) {
        area.textContent += data.textContent + '\n'
    }
}
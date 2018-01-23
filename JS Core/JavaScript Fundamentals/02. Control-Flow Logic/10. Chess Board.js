function printChessBoard(n) {
    let html = `<div class="chessboard">\n`;

    for (let i = 1; i <= n; i++) {
        html += `  <div>\n`;
        for (let j = 0; j < n; j++) {
            let box = (i + j) % 2 == 0 ? 'white' : 'black';

            html += `    <span class="${box}"></span>\n`
        }

        html += `  </div>\n`;
    }

    html += `</div>`;

    return html;
}

console.log(printChessBoard(3));
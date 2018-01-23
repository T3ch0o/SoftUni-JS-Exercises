function multiplicationTable(n) {
    let html = '<table border="1">\n';

    for (let row = 0; row <= n; row++) {
        html += ' <tr>';
        if (row == 0) {
            html += `<th>x</th>`;
        }
        for (let col = 0; col < n; col++) {
            if (row != 0 && col == 0) {
                html += `<th>${row}</th>`
            }

            if (row != 0) {
                html += `<td>${(col + 1) * row}</td>`
            } else {
                html += `<th>${col + 1}</th>`
            }
        }
        html += `</tr>\n`
    }

    html += '</table>';

    return html;
}

multiplicationTable(5);
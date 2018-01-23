function changeNumberColors(n) {
    let html = '<ul>\n';

    for (let i = 1; i <= n; i++) {
        let line = i % 2 == 0 ? 'blue' : 'green';

        html += `  <li><span style='color:${line}'>${i}</span></li>\n`;
    }

    html += '</ul>';

    return html;
}

console.log(changeNumberColors(10));
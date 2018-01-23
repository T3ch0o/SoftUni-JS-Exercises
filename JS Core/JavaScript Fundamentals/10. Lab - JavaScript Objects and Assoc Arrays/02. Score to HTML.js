function scoreToHTML(input) {
    function htmlEscape(text) {
        let map = {
            '"': '&quot;',
            '&': '&amp;',
            "'": '&#39;',
            '<': '&lt;',
            '>': '&gt;'
        };

        return text.replace(/[\"&'<>]/g, ch => map[ch]);
    }
    
    let arrayObj = JSON.parse(input);

    let html = '<table>\n  <tr><th>name</th><th>score</th></tr>\n';

    for (let i = 0; i < arrayObj.length; i++) {
        html += `   <tr><td>${htmlEscape(arrayObj[i].name)}</td><td>${arrayObj[i].score}</td></tr>\n`
    }

    html += '</table>';

    console.log(html);
}

scoreToHTML('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]');
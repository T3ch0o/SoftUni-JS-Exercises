function JSONToHTML(input) {
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

    let arr = JSON.parse(input);
    let html = '<table>\n   <tr>';

    for (let key of Object.keys(arr[0]))
        html += `<th>${key}</th>`

    html += '</tr>\n';

    for (let obj of arr) {
        html += '   <tr>';
        for (let value of Object.keys(obj)) {
            html += `<td>${htmlEscape(obj[value].toString())}</td>`
        }
        html+='</tr>\n';
    }

    html += '</table>';

    console.log(html);
}

JSONToHTML('[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]');
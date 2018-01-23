function escaping(input) {
    function formatText(input) {
        for (let i = 0; i < input.length; i++) {
            if (input[i].indexOf('&') !== -1 ) {
                input[i] = input[i].replace(new RegExp('&', 'g'), '&amp;')
            }

            if (input[i].indexOf('<') !== -1 ) {
                input[i] = input[i].replace(new RegExp('<', 'g'), '&lt;')
            }

            if (input[i].indexOf('>') !== -1 ) {
                input[i] = input[i].replace(new RegExp('>', 'g'), '&gt;')
            }

            if (input[i].indexOf('"') !== -1 ) {
                input[i] = input[i].replace(new RegExp('"', 'g'), '&quot;')
            }
        }

        return input;
    }

    let result = formatText(input);

    let html = '<ul>\n';

    for (let i = 0; i < result.length; i++) {
        html += `  <li>${result[i]}</li>\n`
    }

    html += '</ul>';

    console.log(html);
}

escaping(['<div style=\"color: red;\">Hello, Red!</div>', '<table><tr><td>Cell 1</td><td>Cell 2</td><tr>']);
function templateFormating(input) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n';

    for (let i = 1; i <= input.length; i++) {
        printQorAn(i, input[i - 1]);
    }

    function printQorAn(n, text) {
        return n % 2 == 0 ? xml += `  <answer>\n   ${text}\n  </answer>\n` : xml += `  <question>\n   ${text}\n  </question>\n`;
    }

    xml += '</quiz>';

    return xml;
}

console.log(templateFormating(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]
));
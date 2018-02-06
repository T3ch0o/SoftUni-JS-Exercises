function messenger(message) {
    let pattern = /^<message((?:\s+[a-z]+="[A-Za-z0-9 .]+"\s*?)*)>((?:.|\n)+?)<\/message>$/;

    let matches = pattern.exec(message);

    if (!matches) {
        return 'Invalid message format';
    }

    let [match, attributes, text] = matches;

    let attributesPattern = /\s+([a-z]+)="([A-Za-z0-9 .]+)"\s*?/g;
    let validAttributes = attributesPattern.exec(attributes);

    let sender = '';
    let recipient = '';

    while (validAttributes) {
       if (validAttributes[1] === 'from') {
           sender = validAttributes[2];
       }
       else if (validAttributes[1] === 'to') {
           recipient = validAttributes[2];
       }

        validAttributes = attributesPattern.exec(attributes);
    }

    if (sender === '' || recipient === '') {
        return 'Missing attributes';
    }

    text = text.replace(/\n/g, '</p>\n    <p>');

    let html = `<article>\n   <div>From: <span class="sender">${sender}</span></div>\n`;
    html += `   <div>To: <span class="recipient">${recipient}</span></div>\n`;
    html += `   <div>\n      <p>${text}</p>\n   </div>\n</article>`;

    return html;
}

console.log(messenger('<message to="Bob" from="Alice" timestamp="1497254092">Hey man, what\'s up?</message>'));
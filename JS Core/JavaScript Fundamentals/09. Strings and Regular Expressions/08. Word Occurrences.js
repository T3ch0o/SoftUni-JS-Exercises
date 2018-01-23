function wordOccurrences(str, word) {
    let regex = new RegExp(`\\b${word}\\b`, 'gi');

    let result = [];
    let match;

    while (match = regex.exec(str)) {
        result.push(match);
    }

    console.log(result.length === 0 ? 0 : result.length);
}

wordOccurrences('The waterfall was so high, that the child couldn’t see its peak.', 'the');
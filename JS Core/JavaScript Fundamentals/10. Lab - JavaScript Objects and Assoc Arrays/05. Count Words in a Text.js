function countWords(str) {
    let arr = str[0].split(/\W/).filter(e => e !== '');

    let obj = {};

    for (let word of arr) {
        if (!obj.hasOwnProperty(word)) {
            obj[word] = 0;
        }

        obj[word]++;
    }

    console.log(JSON.stringify(obj));
}

countWords(['Far too slow, you\'re far too slow.']);
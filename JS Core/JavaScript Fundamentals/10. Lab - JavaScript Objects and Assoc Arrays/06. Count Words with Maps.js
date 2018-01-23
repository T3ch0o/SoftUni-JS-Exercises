function countWordsWithMaps(str) {
    let arr = str[0].toLowerCase().split(/\W/).filter(e => e !== '');

    let wordsCount = new Map();

    for (let w of arr) {
        wordsCount.has(w) ? wordsCount.set(w, wordsCount.get(w)+1) : wordsCount.set(w, 1);
    }

    let allWords = Array.from(wordsCount.keys()).sort();

    allWords.forEach(w => console.log(`'${w}' -> ${wordsCount.get(w)} times`));
}

countWordsWithMaps(['Far too slow, you\'re far too slow.']);
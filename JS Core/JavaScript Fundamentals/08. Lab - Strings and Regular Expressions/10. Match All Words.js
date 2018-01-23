function matchAllWords(text) {
    let result = text.split(/\W+/).filter(e => e.length !== 0);

    console.log(result.join('|'));
}

matchAllWords('_(Underscores) are also word characters');
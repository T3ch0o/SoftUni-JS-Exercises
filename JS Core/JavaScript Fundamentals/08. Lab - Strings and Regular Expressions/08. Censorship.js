function censorship(text, words) {
    for (let i = 0; i < words.length; i++) {
        let word = words[i];

        text = text.replace(new RegExp(word, 'g'), '-'.repeat(word.length))
    }

    console.log(text);
}

censorship('roses are red, violets are blue', [', violets are', 'red']);
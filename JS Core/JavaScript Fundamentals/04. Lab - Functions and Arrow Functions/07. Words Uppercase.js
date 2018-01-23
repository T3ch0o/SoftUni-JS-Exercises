function toUpperCase(str) {
    str = str.toUpperCase();

    let arr = extractWords();

    arr = arr.filter(w => w != '');

    console.log(arr.join(', '));
    
    function extractWords() { return str.split(/\W+/);}
}

toUpperCase('Hi, how are you?');
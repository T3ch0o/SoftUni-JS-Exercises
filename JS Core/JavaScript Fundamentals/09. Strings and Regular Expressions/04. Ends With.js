function endsWith(str, substring) {
    console.log(str.substring(str.length - substring.length) === substring);
}

endsWith("This sentence ends with fun?", "fun?");
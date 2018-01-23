function countOccurences(str, text) {
    let currentIndex = text.indexOf(str);

    let count = 0;

    while (currentIndex > -1) {
        count++;

        currentIndex = text.indexOf(str, ++currentIndex);
    }

    console.log(count);
}

countOccurences('haha', 'hahaha');
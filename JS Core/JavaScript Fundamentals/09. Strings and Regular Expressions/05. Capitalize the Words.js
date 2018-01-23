function capitalizeTheWords(str) {
    str = str.split(' ').map(e => e.toLowerCase()).map(e => e.charAt(0).toUpperCase() + e.substr(1));

    console.log(str.join(' '));
}

capitalizeTheWords('Capitalize these words');
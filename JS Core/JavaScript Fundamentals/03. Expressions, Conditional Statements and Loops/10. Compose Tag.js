    function composeTag([fileLocation, fileText]) {
        console.log(`<img src="${fileLocation}" alt="${fileText}">`)
    }

composeTag(['smiley.gif', 'Smiley Face']);
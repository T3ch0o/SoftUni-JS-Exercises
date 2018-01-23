function extractWords(text) {
    let words = new Set();

    for (let line of text) {
        let result = line.split(/\W+/).filter(e => e !== '');

        result.map(e => e.toLowerCase()).forEach(e => words.add(e));
    }

    let arr = Array.from(words);

    console.log(arr.join(', '));
}

extractWords(['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit dui.',
    'Quisque fringilla est urna, vitae efficitur urna vestibulum fringilla.',
    'Vestibulum dolor diam, dignissim quis varius non, fermentum non felis.',
    'Vestibulum ultrices ex massa, sit amet faucibus nunc aliquam ut.',
    'Morbi in ipsum varius, pharetra diam vel, mattis arcu.',
    'Integer ac turpis commodo, varius nulla sed, elementum lectus.',
    'Vivamus turpis dui, malesuada ac turpis dapibus, congue egestas metus.']);
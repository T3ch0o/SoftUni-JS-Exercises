function argumentInfo() {
    let summary = {};

    for (let i = 0; i < arguments.length; i++) {
        let obj = arguments[i];
        let type = typeof obj;
        console.log(type + ': ' + obj);

        if (!summary[type]) {
            summary[type] = 1;
        } else {
            summary[type]++;
        }
    }

    let sortedTypes = [];

    for (let currentType in summary) {
        sortedTypes.push([currentType, summary[currentType]]);
    }

    sortedTypes.sort((a, b) => b[1] - a[1]).forEach((a) => console.log(`${a[0]} = ${a[1]}`));
}

argumentInfo('cat', 42, function () { console.log('Hello world!'); });
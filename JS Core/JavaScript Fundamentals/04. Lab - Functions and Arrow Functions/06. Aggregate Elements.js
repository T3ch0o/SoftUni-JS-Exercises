function aggregateElements(elements) {
    aggregate(elements, 0, (a, b) => a + b);
    aggregate(elements, 0, (a, b) => a + 1 / b);
    aggregate(elements, '', (a, b) => a + b);
    
    function aggregate(elements, start, func) {
        for (let i = 0; i < elements.length; i++) {
            start = func(start, elements[i])
        }
        console.log(start);
    }
}

aggregateElements([1, 2, 3]);
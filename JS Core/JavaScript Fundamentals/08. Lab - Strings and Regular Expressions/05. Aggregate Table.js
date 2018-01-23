function aggregateTable(input) {
    let arr = input.map(e => e.split('|'));

    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].filter(e => e.length !== 0).map(e => e.trim());
        sum += Number(arr[i].pop());
    }

    console.log(arr.join(', ') + '\n' + sum);
}

aggregateTable(['| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275']
);
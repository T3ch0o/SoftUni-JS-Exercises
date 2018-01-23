function negativeOrPositiveNum(arr) {
    let outputArr = [];

    for (let i = 0; i < arr.length; i++) {
        let isTrue = arr[i] < 0 ? outputArr.unshift(arr[i]) : outputArr.push(arr[i]);
    }

    console.log(outputArr);

    //alternative arr.foreach(e => e < 0 ? outputArr.unshift(e) : outputArr.push(e))
}

negativeOrPositiveNum([3, -2, 0, -1]);
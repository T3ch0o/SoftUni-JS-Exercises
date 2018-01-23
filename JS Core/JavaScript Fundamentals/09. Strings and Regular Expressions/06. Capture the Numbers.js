function captureNumbers(input) {
    console.log(input.join(' ').match(/\d+/g).join(' '));
}
captureNumbers([ "Let's go11!!!11!", "Okey!1!"]);
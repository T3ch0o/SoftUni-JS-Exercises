function timer() {
    $('#start-timer').on('click', startTimer);
    $('#stop-timer').on('click', stopTimer);

    let time = null;
    let seconds = 0;

    function startTimer() {
        time = setInterval(() => {
            seconds++;
            $('#hours').text(`${Math.trunc(seconds / 3600).toLocaleString('en-US', {minimumIntegerDigits: 2})}`);
            $('#minutes').text(`${Math.trunc((seconds / 60) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2})}`);
            $('#seconds').text(`${(seconds % 60).toLocaleString('en-US', {minimumIntegerDigits: 2})}`);
        }, 1000)
    }

    function stopTimer() {
        time = clearInterval(time);
    }
}
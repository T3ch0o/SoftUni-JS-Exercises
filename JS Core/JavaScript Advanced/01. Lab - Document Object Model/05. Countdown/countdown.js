window.onload = function() { countdown(10); };

function countdown(startTime) {
    let time = startTime;
    let box = document.getElementById('time');
    let intervalID = setInterval(decrement, 1000);

    function decrement() {
        time--;

        if (time <= 0) {
            clearInterval(intervalID);
        }

        box.value = Math.trunc(time / 60) + ':' + (time % 60).toLocaleString('en-US', {minimumIntegerDigits: 2});
    }
    
}
window.onload = function() { stopwatch(); };

function stopwatch() {
    let startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', startPressed);
    let stopBtn = document.getElementById('stopBtn');
    stopBtn.addEventListener('click', stopPressed);

    let seconds = 0;
    let time = null;

    function startPressed() {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        document.getElementById('time').textContent = '00:00';
        time = setInterval(tick, 1000);
    }

    function stopPressed() {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        time = clearInterval(time);
        seconds = 0;
    }

    function tick() {
        seconds++;

        document.getElementById('time').textContent = `${(Math.floor(seconds / 60)).toLocaleString('en-US', {minimumIntegerDigits: 2})}:${(seconds % 60).toLocaleString('en-US', {minimumIntegerDigits: 2})}`
    }
}
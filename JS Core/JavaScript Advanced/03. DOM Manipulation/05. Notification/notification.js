function notify(message) {
    let notification = document.getElementById('notification');

    let seconds = 2;

    notification.style.display = 'block';
    notification.textContent = message;
    let time = setInterval(timer, 1000);

    function timer() {
        seconds--;

        if (seconds === 0) {
            clearInterval(time);
            notification.style.display = 'none';
        }
    }
}
function validate() {
    document.querySelector('input').addEventListener('change', onChange);
    let pattern = /[A-z\-.]+@[a-z]+\.[a-z]+/;

    function onChange(event) {
        if (!pattern.test(event.target.value)) {
            event.target.className = 'error';
        } else {
            event.target.removeAttribute('class');
        }
    }
}
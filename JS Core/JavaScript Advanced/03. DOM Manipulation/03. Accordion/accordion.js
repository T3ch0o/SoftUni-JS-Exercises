function toggle() {
    let extra = document.getElementById('extra');
    let button = document.getElementsByClassName('button')[0];
    let style = extra.style.display;

    if (style === 'none') {
        extra.style.display = 'block';
        button.textContent = 'Less';
    }
    else  {
        extra.style.display = 'none';
        button.textContent = 'More';
    }
}
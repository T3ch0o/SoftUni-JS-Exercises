function gradient() {
    let gradient = document.getElementById('gradient');
    gradient.addEventListener('mousemove', gradientMove);
    gradient.addEventListener('mouseout', gradientOut);

    function gradientMove(event) {
        console.dir(event);
        let power = Math.trunc((event.offsetX / event.target.clientWidth) * 100);
        document.getElementById('result').textContent = `${power}%`
    }
    
    function gradientOut() {
        document.getElementById('result').textContent = '';
    }
}
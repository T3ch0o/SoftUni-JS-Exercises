function coneArea(r, h) {
    let coneVolume = ((1 / 3) * Math.PI) * r**2 * h;
    let s = Math.sqrt(r ** 2 + h ** 2);
    let l = Math.PI * r *s;
    let b = Math.PI * r ** 2;
    let area = l + b;

    console.log(coneVolume.toFixed(4));
    console.log(area.toFixed(4));
}

coneArea(3, 5);
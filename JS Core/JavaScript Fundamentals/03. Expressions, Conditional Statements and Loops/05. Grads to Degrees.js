function gradsToDegrees(grads) {
    grads = grads % 400;
    if (grads < 0) {
        grads += 400;
    }

    let degrees = grads / 400 * 360;
    console.log(degrees);
}

gradsToDegrees(100);
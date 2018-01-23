function calcDistance([dist1, dist2, t]) {
    dist1 = (dist1 / 3.6) * t;
    dist2 = (dist2 / 3.6) * t;

    let delta = Math.abs(dist1 - dist2);

    console.log(delta);
}

calcDistance([0, 60, 3600]);
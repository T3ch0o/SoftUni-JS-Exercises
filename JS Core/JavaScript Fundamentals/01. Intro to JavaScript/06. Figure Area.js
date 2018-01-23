function sumNumbers(w, h, w2, h2) {
    let [s1, s2, s3] = [w * h, w2 * h2, Math.min(w, w2) * Math.min(h, h2)];

    console.log(s1 + s2 - s3);
}
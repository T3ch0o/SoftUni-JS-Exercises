function figure(n) {
    if (n == 2) {
        console.log('+++');
        return;
    }

    let pipes = Math.floor((n - 3) / 2);

    let fig = `+${"-".repeat(n - 2)}+${"-".repeat(n - 2)}+\n`;

    for (let i = 1; i <= pipes; i++) {
        fig += `|${" ".repeat(n - 2)}|${" ".repeat(n - 2)}|\n`;
    }

    fig += `+${"-".repeat(n - 2)}+${"-".repeat(n - 2)}+\n`;

    for (let i = 1; i <= pipes; i++) {
        fig += `|${" ".repeat(n - 2)}|${" ".repeat(n - 2)}|\n`;
    }

    fig += `+${"-".repeat(n - 2)}+${"-".repeat(n - 2)}+\n`;
    console.log(fig);
}

figure(2);
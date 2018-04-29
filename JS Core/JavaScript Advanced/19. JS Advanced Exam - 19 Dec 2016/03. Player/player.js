class Player {
    constructor(nickName) {
        this.nickName = nickName;
        this.scoreList = [];
    }

    addScore(score) {
        if (Number.isInteger(Number(score)) && score !== null) {
            this.scoreList.push(Number(score));
        }

        return this;
    }

    get scoreCount() {
        return this.scoreList.length;
    }

    get highestScore() {
        if (this.scoreList.length > 0) {
            return Math.max.apply(null, this.scoreList);
        }

        return undefined;
    }

    get topFiveScore() {
        return this.scoreList.sort((a, b) => b - a).slice(0, 5);
    }

    toString() {
        return `${this.nickName}: [${this.scoreList.sort((a, b) => b - a)}]`
    }
}
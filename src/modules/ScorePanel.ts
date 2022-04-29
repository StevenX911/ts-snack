// 定义计分牌
class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    // 设置最高等级限制
    maxLevel: number;
    // 设置升级间隔
    upScore: number;

    constructor(maxLevel: number = 10, upScore:number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 加分
    addScore() {
        this.scoreEle.innerHTML = `${++this.score}`;

        if (this.score % this.upScore == 0) {
            this.levelUp();
        }
    }

    // 提升等级
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = `${++this.level}`;
        }
    }
}

export default ScorePanel;
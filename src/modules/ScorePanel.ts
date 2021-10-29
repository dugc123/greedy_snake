//定义表示计分牌的类
export default class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    //设置一个变量限制等级
    maxLevel: number;
    upScore: number;
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.querySelector("#score")!;
        this.levelEle = document.querySelector("#level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    //设置一个加分的方法
    addScore() {
        this.score++;
        this.scoreEle.innerHTML = this.score + "";
        //判断分数是多少
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    //提升等级的方法
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + "";
        }
    }
}

// //测试代码
// const scorePanel = new ScorePanel(100,2);
// for (let i = 0; i < 200; i++) {
//     scorePanel.addScore()

// }
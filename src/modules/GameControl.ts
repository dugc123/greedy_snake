import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

//游戏的控制器，控制其他的类
export default class GameControl {
    //定义三个属性
    //蛇
    snake: Snake;
    //食物
    food: Food;
    //记分牌
    scorePanel: ScorePanel;
    //创建一个属性来存储蛇移动的方向(也就是按键方向)
    direction: string = "";
    //创建一个属性用来记录游戏是否结束
    isLive = true;
    constructor() {
        this.scorePanel = new ScorePanel();
        this.food = new Food();
        this.snake = new Snake();
    }
    //游戏的初始化方法，调用后游戏开始
    init() {
        //绑定键盘按下事件
        document.addEventListener("keydown", this.keydownHandler);
        this.run();
    }
    //创建一个键盘按下响应函数
    keydownHandler = (event: KeyboardEvent) => {
        this.direction = event.key;
    }

    //让蛇走的方法
    run = () => {
        let x = this.snake.X;
        let y = this.snake.Y;

        //根据按键的方向，修改x和y的值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                x -= 10;
                break;
            case "ArrowRight":
            case "Right":
                x += 10;
                break;
        }
        this.checkEat(x, y);
        try {
            this.snake.X = x;
            this.snake.Y = y;
        } catch (error: any) {
            alert(error.message + "GAME OVER~~")
            this.isLive = false;
        }

        //添加定时任务
        this.isLive && setTimeout(() => {
            this.run();
        }, 300 - (this.scorePanel.level - 1) * 30);
    }

    //定义一个方法，用来检查蛇是否吃到食物
    checkEat(x: number, y: number) {
        if (x === this.food.X && y === this.food.Y) {
            console.log("吃到食物了~~");
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }
}
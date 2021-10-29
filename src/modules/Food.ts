export default class Food {
    //定义一个属性表示食物对应的元素
    element: HTMLElement;
    constructor() {
        //获取页面中food元素
        this.element = document.querySelector("#food")!
    }

    //定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }

    get Y() {
        return this.element.offsetTop;
    }

    //修改食物的位置
    change() {
        //食物一个随机的位置
        //食物的位置最小是0，最大是300-10=290；
        //蛇移动一次就是一格，一格大小就是10，所以要求食物的坐标必须得是10的倍数
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.top = top + "px";
        this.element.style.left = left + "px";
    }
}

//测试代码
// const food = new Food();
// food.change();
// console.log(food.X, food.Y);
export default class Snake {
    //表示蛇头的元素
    head: HTMLElement;
    //蛇的身体
    bodies: HTMLCollection;
    //获取蛇的容器
    element: HTMLElement;
    constructor() {
        this.element = document.querySelector("#snake")!;
        this.head = document.querySelector("#snake > div")!;
        // this.bodies = document.querySelectorAll("#snake > div")!;//返回NodeListOf
        this.bodies = this.element?.getElementsByTagName("div")!;
    }
    //获取X轴坐标
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    //设置蛇头的坐标
    set X(value: number) {
        //如果新值和旧值相同，则直接返回不再修改
        if (this.X === value) {
            return;
        }

        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了~~");
        }

        //修改x时，是在修改水平坐标，蛇在左右移动，蛇在向右移动时，不能向左移动
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value ) {
            console.log("水平方向掉头了");
            if (value > this.X) {
                //如果新值value大于旧值x，说明蛇在向右走，此时发生调头，应该使蛇向左走
                value = this.X - 10;
            }else{
                //向左走
                value = this.X + 10;
            }
        }
        //移动身体
        this.moveBody();
        this.head.style.left = value + "px";
        this.checkHeadBody();
    }

    set Y(value: number) {
        if (this.Y === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了");
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value ) {
            console.log("水平方向掉头了");
            if (value > this.Y) {
                //如果新值value大于旧值y，说明蛇在向下走，此时发生调头，应该使蛇向上走
                value = this.Y - 10;
            }else{
                //向上走
                value = this.Y + 10;
            }
        }
        //移动身体
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();

    }

    //向蛇添加身体
    addBody() {
        //向element增加一个div
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    //添加一个蛇身体移动的方法
    moveBody = () => {
        //将后边的身体设置为前边身体的位置

        for (let i = this.bodies.length - 1; i > 0; i--) {
            //获取前边身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px'
        }
    }

    // 检查蛇头撞到身体
    checkHeadBody=()=>{
        //检查蛇头和身体，如果蛇头和身体的某一节坐标相同，则相撞
        for (let i = 1; i < this.bodies.length; i++) {
            if (this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
                throw new Error("蛇头撞到身体了~~")
            }
            
        }
    }
}
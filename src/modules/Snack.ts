class Snack {
    // 蛇头
    head: HTMLElement;
    // 蛇全部
    bodies: HTMLCollection;
    // 蛇的容器
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snack')!;
        this.head = document.querySelector('#snack > div')!;
        this.bodies = this.element.getElementsByTagName('div');
    }

    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(v: number) {
        if (this.X === v) return;

        // X合法性检查
        if (v < 0 || v > 290) {
            throw new Error('Hit wall!');
        }

        // 检查掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === v) {
            console.log('发生水平方向掉头')
            // 可以结束游戏
            // 可以阻止掉头
            if (v > this.X) {
                v = this.X - 10;
            } else {
                v = this.X + 10;
            }
        }

        // 移动身体
        this.moveBody();

        this.head.style.left = v + 'px';
        // 检查撞到自己
        this.checkHeadBody();
    }

    set Y(v: number) {
        if (this.Y === v) return;

        // Y合法性检查
        if (v < 0 || v > 290) {
            throw new Error('Hit wall!');
        }

        // 检查掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === v) {
            console.log('发生垂直方向掉头');
            // 可以结束游戏
            // 可以阻止掉头
            if (v > this.Y) {
                v = this.Y - 10;
            } else {
                v = this.Y + 10;
            }
        }

        // 移动身体
        this.moveBody();

        this.head.style.top = v + 'px';
        // 检查撞到自己
        this.checkHeadBody();
    }

    // 增加身体
    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    // 移动身体（注意，从后往前改）
    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = x + 'px';
            (this.bodies[i] as HTMLElement).style.top = y + 'px';
        }
    }

    // 检查蛇头和身体是否出现相撞
    checkHeadBody(): void {
        for (let i = 1; i < this.bodies.length; i++) {
            if ((this.bodies[i] as HTMLElement).offsetTop === this.Y &&
                (this.bodies[i] as HTMLElement).offsetLeft === this.X
            ) {
                throw new Error('Hit self!');
            }
        }
    }

}

export default Snack;
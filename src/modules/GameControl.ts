import Snack from './Snack'
import ScorePanel from './ScorePanel'
import Food from './Food'


class GameControl {
    food: Food;
    scorePanel: ScorePanel;
    snack: Snack;
    // 定义移动的方向
    direction: string = '';
    // 记录游戏是否结束
    isLive = true;

    constructor() {
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.snack = new Snack();
        this.init();
    }

    // 游戏初始化，调用即开始
    init() {
        // 监听键盘事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 调用run
        this.run();
    }

    // 键盘按键响应函数
    keydownHandler(event: KeyboardEvent) {
        // 需要检查按键是否合法
        // console.log(event.key); 
        this.direction = event.key;

        // 测试
        // this.run();
    }

    // 蛇移动
    run() {
        // 根据direction设置移动snack位置
        // 获取现在snack的位置
        let x = this.snack.X;
        let y = this.snack.Y;
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移动
                y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动
                y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左
                x -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右
                x += 10;
                break;
        }

        // 检查蛇吃到食物
        if(this.checkEat(x,y)){
            // console.log('吃到食物')
            // 重置食物位置
            this.food.change();
            // 增加分数
            this.scorePanel.addScore();
            // 蛇增加一节
            this.snack.addBody();
        }

        // 修改X和Y的值
        try {
            this.snack.X = x;
            this.snack.Y = y;
        } catch (e) {
            this.isLive = false;
            alert(e.message + ' GAME OVER!');
        }

        // 设置连续移动——关键点
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 检查是否吃到食物
    checkEat(x:number, y:number){
        return this.food.X === x && this.food.Y === y;
    }
}

export default GameControl;
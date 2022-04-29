// 食物类
class Food {
    element: HTMLElement
    constructor() {
        this.element = document.getElementById('food')!;
    }

    // 获取食物坐标
    get X() {
        return this.element.offsetLeft;
    }

    get Y() {
        return this.element.offsetTop;
    }

    // 改变食物位置
    change() {
        // 生成随机位置
        // 食物位置范围： [0, 290]
        // 食物坐标是10的倍数
        let left = Math.round(Math.random() * 29) * 10;
        let top = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

// const food = new Food()
// console.log(food.X, food.Y)
// food.change()
// console.log(food.X, food.Y)

export default Food;
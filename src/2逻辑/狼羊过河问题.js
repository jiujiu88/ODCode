/*
题目描述
绘图机器的绘图笔初始位置在原点(0,0)，机器启动后按照以下规则绘制直线：

尝试沿着横线坐标正向绘制直线直到给定的终点E。
期间可以通过指令在纵坐标轴方向进行偏移，offsetY为正数表示正向偏移，为负数表示负向偏移。
给定了横坐标终点值E以及若干条绘制指令，请计算绘制的直线和横坐标轴以及X=E的直线组成图形的面积。

二、输入描述
首行为两个整数N和E，表示有N条指令，机器运行的横坐标终点值E。

接下来N行，每行两个整数表示一条绘制指令X offsetY，用例保证横坐标X以递增排序的方式出现，且不会出现相同横坐标X。

取值范围：

0 < N <= 10000
0 <= X <= E <= 20000
-10000 <= offsetY <= 10000
三、输出描述
一个整数，表示计算得到的面积，用例保证结果范围在0到4294967295之内。

输入
4 10
1 1
2 1
3 1
4 -2
输出
12
说明
无

输入
2 4
0 1
2 -2
输出
4

输入
4 10
2 3
4 -1
7 2
9 4
输出
28

原文链接：https://blog.csdn.net/lbp0123456/article/details/142656081
 */





const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 串行异步获取
void (async function () {
    // 第一行输入解析
    const [n, end_x] = (await readline()).split(" ").map(Number);

    // 记录题解
    let ans = 0;

    let last_x = 0; // 上一个点的横坐标
    let last_y = 0; // 上一个点的纵坐标

    // 获取n行输入
    for (let i = 0; i < n; i++) {
        // [当前点的横坐标,当前点纵坐标相较于上一个点纵坐标的偏移量]
        const [cur_x, offset_y] = (await readline()).split(" ").map(Number);
        const current_y = last_y + offset_y;
        // cur_x - last_x 结果是上一个点到当前点的横向距离, 这个距离过程中，高度保持为abs(last_y)
        ans += (cur_x - last_x) * Math.abs(last_y);

        // 更新last_x, last_y
        last_x = cur_x;
        last_y += offset_y;
    }

    // 注意结束位置的处理
    if (end_x > last_x) {
        ans += (end_x - last_x) * Math.abs(last_y);
    }

    console.log(ans);
})();




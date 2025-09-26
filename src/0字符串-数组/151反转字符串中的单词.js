/*
给定一个整数数组 Array，请计算该数组在每个指定区间内元素的总和。
输入描述
第一行输入为整数数组 Array 的长度 n，接下来 n 行，每行一个整数，表示数组的元素。随后的输入为需要计算总和的区间，直至文件结束。
输出描述
输出每个指定区间内元素的总和。
5
1
2
3
4
5
0 1
1 3
输出
3
9
*/
const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let lines = []
rl.on("line", line => {
    lines.push(line);
})
rl.on("close", () => {
    // if (lines.length === 8){
        const n = parseInt(lines[0]);
        let arr = []
        let sumArr = new Array(n + 1);
        sumArr[0] = 0;
        for (let i = 1; i <= n; i++) {
            sumArr[i] = sumArr[i - 1] + parseInt(lines[i]);
        }
        // 0 1 3 6 10 15
        for (let i = n + 1; i < lines.length; i++) {
            const [s, e] = lines[i].split(" ").map(Number);
            console.log(sumArr[e + 1] - sumArr[s])
        }
    // }
})

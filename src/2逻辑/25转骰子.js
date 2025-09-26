/*
题目描述
骰子是一个立方体，每个面一个数字，初始为左 1，右 2，前 3（观察者方向），后 4，上 5， 下 6，用 123456 表示这个状态，
放置到平面上，可以向左翻转（用 L 表示向左翻转 1 次）， 可以向右翻转（用 R 表示向右翻转 1 次），
可以向前翻转（用 F 表示向前翻转 1 次），可以向 后翻转（用 B 表示向后翻转 1 次），可以逆时针旋转（用 A 表示逆时针旋转 90 度），
可以顺 时针旋转（用 C 表示顺时针旋转 90 度），现从 123456 这个初始状态开始，根据输入的动作 序列，计算得到最终的状态。
骰子的初始状态和初始状态转动后的状态如图所示

输入描述:
输入一行，为只包含 LRFBAC 的字母序列，最大长度 50，字母可重复

输出描述:
输出最终状态

输入
LR
输出
123456
说明
骰子先向左翻转，再向右翻转回来，故还是原来的状态 123456

输入
FCR
输出
342156
说明
骰子向前翻转，状态变为 125643，再顺时针旋转，状态变为 651243，最后向右翻转，状态 变为 342156

原文链接：https://blog.csdn.net/Ryfall/article/details/126768747
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const str = await readline();
    console.log(getRes(str));
})()

// 思路：
const getRes = (str)=>{
    console.log(str);

}
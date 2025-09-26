/*
题目描述
韩国电影《鱿鱼游戏》最近大火，有些商家参考其中的玻璃桥情节，设计了出一种踩玻璃的解压游戏。
玩家需要从环形玻璃桥起点开始，每次跳过 x 个完好玻璃，然后踩碎第 x + 1 个完好玻璃，然后再以踩碎位置为起点，重复前面的步骤，直到只剩余 y 个完好玻璃时停止。
假设环形玻璃桥有 n 块完好玻璃组成，编号为 1 ~ n，其中起点为编号1，终点为编号n，起点和终点相连，请你根据给定的 x 和 y，输出剩余完好玻璃的编号。

输入描述
输入三个整数 n, x, y，以空格分隔。
其中 n 不大于 50000，x  不大于 10000，y 不小于1，不大于 n。

输出描述
输出剩余的完好玻璃桥面编号。升序输出。

用例
输入	7 4 4
输出	1 2 5 7
说明	无
原文链接：https://blog.csdn.net/qfc_128220/article/details/134883009
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const [n,x,y] = (await readline()).split(" ").map(Number);
    console.log(getRes(n,x,y));
})()

// 思路：由于一直跳过x个完好玻璃，因此碎玻璃就去掉，计算数组的长度>y，就while循环。开始下标为start/arr.length。注意初始时start为1.从start删除该玻璃splice
const getRes = (n,x,y)=>{
    // 设置长度为n的数组，初始化为1~n
    let arr = Array(n).fill(0).map((_,index)=>index+1);
    // 开始从1开始跳 跳过4个，到5，踩碎第6个
    let start = 1;
    //每次都跳过完好的玻璃，因此踩碎的玻璃要从原数组删除
    while(arr.length>y){
        start +=x;
        start = start%arr.length;
        // 第一次下标5删除、第二次下标3删除、第三次下标2删除
        arr.splice(start,1);
    }
    return arr;
}
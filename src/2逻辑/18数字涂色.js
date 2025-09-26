/*
题目描述
疫情过后，希望小学终于又重新开学了，三年二班开学第一天的任务是将后面的黑板报重新制作。
黑板上已经写上了N个正整数，同学们需要给这每个数分别上一种颜色。
为了让黑板报既美观又有学习意义，老师要求同种颜色的所有数都可以被这种颜色中最小的那个数整除。
现在请你帮帮小朋友们，算算最少需要多少种颜色才能给这N个数进行上色。

输入描述
第一行有一个正整数N。
第二行有N个int型数(保证输入数据在[1,100]范围中)，表示黑板上各个正整数的值。

输出描述
输出只有一个整数，为最少需要的颜色种数。

输入
7
58 14 20 67 41 4 63
输出
6
说明
我们对这些数进行分组，最小数为组内的基准数，例如最小数为4时,7个数中只有20能被4整除，所以20和4一个颜色，其它的都是不同颜色。

原文链接：https://blog.csdn.net/guorui_java/article/details/131985760
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(n,arr));
})()

// 思路：
const getRes = (n,arr)=>{
    console.log(n,arr);

}
/*
题目描述
寿司店周年庆，正在举办优惠活动回馈新老客户。
寿司转盘上总共有 n 盘寿司，prices[i] 是第 i 盘寿司的价格，
如果客户选择了第 i 盘寿司，寿司店免费赠送客户距离第 i 盘寿司最近的下一盘寿司 j，前提是 prices[j] < prices[i]，如果没有满足条件的 j，则不赠送寿司。
每个价格的寿司都可无限供应。

输入描述
输入的每一个数字代表每盘寿司的价格，每盘寿司的价格之间使用空格分隔，例如:
3 15 6 14
表示：
第 0 盘寿司价格 prices[0] 为 3
第 1 盘寿司价格 prices[1] 为 15
第 2 盘寿司价格 prices[2] 为 6
第 3 盘寿司价格 prices[3] 为 14
寿司的盘数 n 范围为：1 ≤ n ≤ 500
每盘寿司的价格 price 范围为：1 ≤ price ≤ 1000

输出描述
输出享受优惠后的一组数据，每个值表示客户选择第 i 盘寿司时实际得到的寿司的总价格。使用空格进行分隔，例如：

3 21 9 17
原文链接：https://blog.csdn.net/weixin_42433507/article/details/137801514
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(arr));
})()

// 思路：参考503 下一个更大的元素II
// 就是找离i的下一个更小的元素，用单调栈
const getRes = (arr)=>{
    // console.log(arr);
    const n = arr.length;
    let stack = [];
    // 初始化结果为原始价格
    let res = [...arr];
//     从左往右，可重复供应，复制成两份，就可以循环
    for(let i=0;i<2*n;i++){
        // 记得取模，否则取不到值
        let x = arr[i%n];
        // 如果找到了下一个更小的，加上价格,将这个元素出栈 一定是while
        while(stack.length && x<arr[stack.at(-1)]){
            res[stack.pop()] += x;
        }
        // 栈内只存一份数据，多余的i是用来循环算值的
        if(i<n) {
            stack.push(i);
        }
    }
    return res.join(" ");
}
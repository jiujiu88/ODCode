/*
题目描述
记账本上记录了若干条多国货币金额，需要转换成人民币分（fen），汇总后输出。
每行记录一条金额，金额带有货币单位，格式为数字+单位，可能是单独元，或者单独分，或者元与分的组合。
要求将这些货币全部换算成人民币分（fen）后进行汇总，汇总结果仅保留整数，小数部分舍弃。

元和分的换算关系都是1:100，如下：
1CNY=100fen（1元=100分）
1HKD=100cents（1港元=100港分）
1JPY=100sen（1日元=100仙）
1EUR=100eurocents（1欧元=100欧分）
1GBP=100pence（1英镑=100便士）

汇率表如下：
CNY	JPY	HKD	EUR	GBP
100	1825	123	14	12
即：100CNY = 1825JPY = 123HKD = 14EUR = 12GBP

输入描述
第一行输入为N，N表示记录数。0<N<100
之后N行，每行表示一条货币记录，且该行只会是一种货币。

输出描述
将每行货币转换成人民币分（fen）后汇总求和，只保留整数部分。
输出格式只有整数数字，不带小数，不带单位。

用例
输入
1
100CNY
输出
10000
说明
100CNY转换后是10000fen，所以输出结果为10000

输入
1
3000fen
输出
3000
说明
3000fen，结果就是3000

输入
1
123HKD
输出
10000
说明
HKD与CNY的汇率关系是123:100，所以换算后，输出结果为10000

输入
2
20CNY53fen
53HKD87cents
输出
6432
说明
20元53分 + 53港元87港分，换算成人民币分后汇总，为6432

原文链接：https://blog.csdn.net/2401_86417859/article/details/140935618
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    const arr = [];
    for(let i=0;i<n;i++){
        arr.push(await readline());
    }
    console.log(getRes(n,arr));
})()

// 思路：
const getRes = (n,arr)=>{
    console.log(n,arr);

}
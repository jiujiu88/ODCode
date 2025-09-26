/*
题目描述
在一款虚拟游戏中生活，你必须进行投资以增强在虚拟游戏中的资产以免被淘汰出局。
现有一家Bank，它提供有若干理财产品 m 个，风险及投资回报不同，你有 N（元）进行投资，能接收的总风险值为X。
你要在可接受范围内选择最优的投资方式获得最大回报。

备注：
在虚拟游戏中，每项投资风险值相加为总风险值；
在虚拟游戏中，最多只能投资2个理财产品；
在虚拟游戏中，最小单位为整数，不能拆分为小数；
投资额*回报率=投资回报

输入描述
第一行：
产品数（取值范围[1,20]）
总投资额（整数，取值范围[1, 10000]）
可接受的总风险（整数，取值范围[1,200]）
第二行：产品投资回报率序列，输入为整数，取值范围[1,60]
第三行：产品风险值序列，输入为整数，取值范围[1, 100]
第四行：最大投资额度序列，输入为整数，取值范围[1, 10000]

输出描述
每个产品的投资额序列

用例
输入
5 100 10
10 20 30 40 50
3 4 5 6 10
20 30 20 40 30
输出
0 30 0 40 0
说明
投资第二项30个单位，第四项40个单位，总的投资风险为两项相加为4+6=10

原文链接：https://blog.csdn.net/qq_42631788/article/details/139395452
 */

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void (async ()=> {
    const [n,allMoney,maxRisk] = (await readline()).split(" ").map(Number);
    const percent = (await readline()).split(" ").map(Number);
    const risk = (await readline()).split(" ").map(Number);
    const money = (await readline()).split(" ").map(Number);
    console.log(getRes(n,allMoney,maxRisk,percent,risk,money));
})()

// 思路：双循环
const getRes = (n,allMoney,maxRisk,percent,risk,money)=>{

}



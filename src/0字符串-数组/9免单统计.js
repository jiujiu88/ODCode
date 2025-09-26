/*
题目描述
某商城举办了一个促销活动，如果某顾客是某一秒内第一个下单的顾客（可能是多个人），则可以获取免单。请你编程计算有多少顾客可以获取免单。

输入
输入为n行数据，每一行表示一位顾客的下单时间。 以（年-月-日 时-分-秒.毫秒）yyyy-MM-dd HH:mm:ss.ﬀf形式给出。
0<n<50000 2000<yyyy<2020 0<MM<=12 0<dd<=28 0<=HH<=23 0<=mm<=59 0<=ss<=59 0<=ﬀf<=999 所有输入保证合法。

输出
输出一个整数，表示有多少顾客可以获取免单。

样例：
输入样例1
2019-01-01 00:00:00.001
2019-01-01 00:00:00.002
2019-01-01 00:00:00.003
输出样例1
1

输入样例2
2019-01-01 08:59:00.123
2019-01-01 08:59:00.123
2018-12-28 10:08:00.999
输出样例2
3

原文链接：https://blog.csdn.net/sunweiliang/article/details/104293100
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    let urls = [];
    for(let i=0;i<n;i++){
        urls.push((await readline()).split("/"))
    }
    const [l,target] = (await readline()).split(" ");
    console.log(getRes(n,urls,l,target));
})()


const getRes = (n,urls,l,target)=>{
    console.log(n,urls,l,target);

}
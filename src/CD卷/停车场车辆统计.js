/*
题目描述
特定大小的停车场，数组cars[]表示，其中1表示有车，0表示没车。
车辆大小不一，小车占一个车位（长度1），货车占两个车位（长度2），卡车占三个车位（长度3）。
统计停车场最少可以停多少辆车，返回具体的数目。

输入描述
整型字符串数组cars[]，其中1表示有车，0表示没车，数组长度小于1000。

输出描述
整型数字字符串，表示最少停车数目。

用例1
输入
1,0,1
输出
2
说明
1个小车占第1个车位
第二个车位空
1个小车占第3个车位
最少有两辆车

用例2
输入
1,1,0,0
原文链接：https://blog.csdn.net/weixin_42433507/article/details/137712388
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const str = (await readline()).replaceAll(",","");
    console.log(getRes(str));
})()

// 题意：脑筋急转弯--现在停的车是现状，例如三个小车111，停了3辆车，如果换成卡车，则只用一个车，最少1个车
const getRes = (str)=>{
    console.log(str);
//     如果是111，换成卡车,11换成货车，最后把0替换掉，长度就是最少的车数目
    str = str.replaceAll("111","x").replaceAll("11","x").replaceAll("1","x").replaceAll("0","");
    return str.length;
}
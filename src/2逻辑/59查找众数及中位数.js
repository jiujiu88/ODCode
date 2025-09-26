/*
题目描述
众数是指一组数据中出现次数量多的那个数，众数可以是多个。

中位数是指把一组数据从小到大排列，最中间的那个数，如果这组数据的个数是奇数，那最中间那个就是中位数，如果这组数据的个数为偶数，那就把中间的两个数之和除以2，所得的结果就是中位数。

查找整型数组中元素的众数并组成一个新的数组，求新数组的中位数。

输入描述
输入一个一维整型数组，数组大小取值范围 0<N<1000，数组中每个元素取值范围 0<E<1000

输出描述
输出众数组成的新数组的中位数

用例
输入 10 11 21 19 21 17 21 16 21 18 15
输出 21
输入 2 1 5 4 3 3 9 2 7 4 6 2 15 4 2 4
输出 3
输入 5 1 5 3 5 2 5 5 7 6 7 3 7 11 7 55 7 9 98 9 17 9 15 9 9 1 39
输出 7
原文链接：https://blog.csdn.net/m0_66793065/article/details/138268677
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

// 思路：用对象存key：元素，value：频次 取最大的频次Math.max(...Object.values(obj))。循环obj将频次相同的key(转字符串)加入数组list,最后list取中位数
const getRes = (arr)=>{
    let map = {};
    for(let v of arr){
        if(map[v]){
            map[v]++;
        }else{
            map[v] = 1;
        }
    }
    const max = Math.max(...Object.values(map));
    // 跟次数相同的数据加入新数组
    let list = [];
    for(let v in map){
        if(map[v]===max){
            // 对象的key会转化为字符串，注意取int
            list.push(parseInt(v));
        }
    }
    const mid = Math.floor(list.length/2);
    if(list && list.length%2==0){
        return Math.floor((list[mid-1]+list[mid])/2);
    }else{
        return list[mid];
    }
}
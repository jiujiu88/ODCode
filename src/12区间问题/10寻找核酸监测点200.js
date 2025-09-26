/*
张三要去外地出差，需要做核酸，需要在指定时间点前做完核酸，请帮他找到满足条件的核酸检测点。
给出一组核酸检测点的距离和每个核酸检测点当前的人数。
给出张三当前要去做核酸的出发时间，出发时间是10分钟的倍数，同时给出张三做核酸的最晚结束时间。
题目中给出的距离是整数，单位是公里，时间1分钟为一基本单位。

去找核酸点时，有如下的限制:
去往核酸点的路上，每公里距离花费时间10分钟，费用是10元。
核酸点每检查一个人的时间花费是1分钟。
每个核酸点工作时间都是8点到20点(中间不休息)。核酸点准时工作，早到晚到都不检测。
核酸检测结果可立刻知道。
在张三去某个核酸点的路上花费的时间内，此核酸检测点的人数是动态变化的，变化的规则是：
5.1 在非核酸检测时间内，没有人排队。
5.2 8点-10点每分钟增加3人。
5.3 12点-14点每分钟增加10人。
5.4 18点-20点每分钟增加20人。
5.5 其他时间每5分钟增加1人。
要求将所有满足条件的核酸检测点按照优选规则排序列出。

优选规则:
花费时间最少的核酸检测点排在前面。
花费时间一样，花费费用最少的核酸检测点排在前面。
时间和费用一样，则ID值最小的排在前面。

输入描述：
H1 M1
H2 M2
N
ID1 D1 C1
ID2  D2

原文链接：https://blog.csdn.net/weixin_43970743/article/details/146237588
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const n = parseInt(await readline());
    const sickList = (await readline()).split(",").map(Number);
    const grid = [];
    for(let i=0;i<n;i++){
        grid.push((await readline()).split(",").map(Number));
    }
    console.log(getRes(n,sickList,grid));
})();

const getRes = (n,sickList,grid)=>{
    console.log(n,sickList,grid);
    let map = Array(n).fill(0).map(()=>[]);
    console.log(map);
//     遍历grid，检查出有接触的人员
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            if(i!=j && grid[i][j]==1){
                map[i].push(j);
            }
        }
    }
    // return map;
    let res = new Set();
    for(let v of sickList){
        res.add(...map[v]);
    }
}
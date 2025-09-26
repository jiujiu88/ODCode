/*
现有若干个会议，所有会议共享一个会议室，用数组表示各个会议的开始时间和结束时间，格式为:
[[会议1开始时间，会议1结束时间]，[会议2开始时间，会议2结束时间]]
请计算会议室占用时间段。

输入描述
[[会议1开始时间，会议1结束时间]，[会议2开始时间，会议2结束时间]]
备注
会议室个数范围: [1,100]
会议室时间段: [1,24]

输出描述
输出格式预输入一致,具体请看用例
[[会议开始时间，会议结束时间]，[会议开始时间，会议结束时间]]

示例1
输入:
[[1,4], [2,5],[7,9], [14,18]]
输出
[[1,5], [7,9],[14,18]]

说明:时间段[1,4]和[2,5]重叠，合并为[1,5]

示例2
输入:
[[1,4],[4,5]]
输出:
[[1,5]]
 */


const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const areaList = JSON.parse(await readline());
    console.log(getRes(areaList));
})()

// 思路:!!合并区间一般是左端点排序,其他场景一般是右端点排序 https://leetcode.cn/discuss/post/3091107/fen-xiang-gun-ti-dan-tan-xin-ji-ben-tan-k58yb/
// 加入数组,如果需要合并,更新数组最后一个字串的右端点
const getRes = (areaList)=>{
    // 先排序
    areaList.sort((a,b)=>a[0]-b[0]);
    let list = [];
    for(let [start,end] of areaList){
        if(list.length >0 && start<=list.at(-1)[1]){
            list.at(-1)[1] = Math.max(end,list.at(-1)[1]);
        }else{
            list.push([start,end]);
        }
    }
    return list;
}
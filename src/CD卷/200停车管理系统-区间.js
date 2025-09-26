/*
题目描述
园区物业沿着马路边规划了 k 个停车位，编号 0 ~ k-1，每个停车位长度都是 1 个单位，如下图所示：
现在物业想请你开发一个停车管理系统，具体功能如下：
当有车辆申请入场时，系统会收到指令："in x"，其中 in 表示入场，x 表示车辆长度。系统需要找到一个“有连续 x 个空闲停车位”的区域，并且要求该区域的起始停车位编号尽可能小。
若识别不了车辆长度，则 x 默认为 0，此时系统需要返回 fail
若系统没有找到 “有连续 x 个空闲停车位” 的区域，此时系统需要返回 fail
若找到了 “有连续 x 个空闲停车位”的区域，此时系统需要返回该区域的起始停车位编号，表示可以入场。
当有车辆申请出场时，监控会发送指令："out y" 给系统，其中 out 表示出场，y 表示出场车辆之前占用区域的起始停车位编号。
若 y 不是被占用区域的起始停车位编号，则返回 fail
若 y 是被占用区域的起始停车位编号，则无需返回信息

输入描述
第一行输入园区停车位数量 k，不小于1，不大于1000
第二行输入系统收到的指令数量 n，不小于1，不大于1000
之后输入 n 行指令信息，每行信息只会是以下情况：
in x
out y
其中 in 和 out 是固定指令，x 是车辆长度，y 是停车位编号

输出描述
输出停车管理系统的返回信息，每行输出一个

用例
输入
100
6
in 10
in 20
in 30
out 9
in 15
in 5
输出
0
10
30
fail
60
75

说明
in 10 申请到 编号范围 [0, 9] 区域停车位，输出起始编号0
in 20 申请到 编号范围 [10, 29] 区域停车位，输出起始编号10
in 30 申请到 编号范围 [30, 59] 区域停车位，输出起始编号30
out 9 请求释放起始编号为 9 的停车区域，但是不存在该停车区域，输出fail
in 15 申请到 编号范围 [60, 74] 区域停车位，输出起始编号60
in 5 申请到 编号范围 [75, 79] 区域停车位，输出起始编号75
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const k = parseInt(await readline());
    const n = parseInt(await readline());
    let commands = [];
    for(let i=0;i<n;i++){
        commands.push((await readline()).split(" "));
    }
    getRes(k,n,commands);
})()

// 判断两个区间是否重合
const isConflict = (a,b)=>{
    const [start1,end1] = a;
    const [start2,end2] = b;
    if(start1===start2){
        return true;
    }else if(start1<start2){
        //  [1,6] [5,8]
        return end1>=start2;
    }else{
        //  [6,7] [1,7]
        return end2>=start1;
    }
}
// 思路：定义使用used数组,初始化[k,k]作为区间数组的结尾数组。让新增的区间都在这个范围内
const getRes = (k,n,commands)=>{
    // 车位长度为k
    let used = [[k,k]];
    for(let [command,x] of commands){
        x = parseInt(x);
        if(command==="in"){
            let flag = false;
        //     用start控制区间的左端点，如果没有重复区间，这直接加入数组，有重复的，则移动start到后面的区间
            let start = 0;
            for(let i=0;i<used.length;i++){
                // 找指定区间与已有区间，如果有重合，更新指定区间的start
                const insert = [start,start+x-1];
                if(!isConflict(insert,used[i])){
                    flag = true;
                    used.splice(i,0,insert);
                    console.log(start);
                    break;
                }else{
                    start = used[i][1]+1;
                }
            }
            // 如果插入失败，返回fail
            if(!flag){
                console.log("fail");
            }
        }else{
        //     出车
            let findCar = false;
            for(let i=0;i<used.length;i++){
                // 能找到这个编号，将这个车删掉
                if(used[i][0]===x){
                    findCar = true;
                    delete used[i];
                }
            }
            // 如果没找到指定开始编号的车，返回fail
            if(!findCar){
                console.log("fail");
            }
        }
    }
    console.log(used)
}


/*
题目描述
有一组区间 [a0, b0], [a1, b1], ... (a, b 表示起点, 终点)，区间有可能重叠、相邻，重叠或相邻则可以合并为更大的区间；
给定一组连接器[x1, x2, x3, ...]（x 表示连接器的最大可连接长度，即 x >= gap），可用于将分离的区间连接起来，但两个分离区间之间只能使用 1 个连接器；
请编程实现使用连接器后，最少的区间数结果。
区间数量 < 10000；a, b <= 10000
连接器梳理 <10000; x <= 10000

输入描述
区间组：[1,10],[15,20],[18,30],[33,40]
连接器组：[5,4,3,2]
输出描述
1
说明
合并后：[1,10], [15,30], [33,40]，使用 5, 3 两个连接器连接后只剩下 [1,40]

示例一
输入
[1,10],[15,20],[18,30],[33,40]
[5,4,3,2]
输出
1
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const arr = JSON.parse("["+await readline()+"]");
    const connects = JSON.parse(await readline());
    console.log(getRes(arr,connects));
})();

const getRes = (arr,connects)=>{
    console.log(arr,connects);
    // 连接器升序，保证遍历时先取到更小的
    connects.sort((a,b)=>a-b);
//     先直接合并  且计算中间的gap长度
    let res = [arr[0]];
    let gap = 0;
    for(let i=1;i<arr.length;i++){
        const [s,e] = arr[i];
        // 如果有重合，直接合并
        if(res.at(-1)[1] >= s){
        //     可以合并,取更大的右端点
            res.at(-1)[1] = Math.max(res.at(-1)[1],e);
        }else{
            // 如果不能重合，计算gap长度
            gap = s-res.at(-1)[1];
            // 只要找到了一个符合的连接器，则使用掉，尽量用最小的（已升序），这样后面可以用更大的。
            let find = false;
            for(let j=0;j<connects.length;j++){
                // 如果gap要比连接器小，则用这个连接器连接，用完则删，修改栈顶右端点为当前区间的右端点。
                if(connects[j]>=gap){
                    find = true;
                    connects.splice(j,1);
                    res.at(-1)[1] = e;
                    break;
                }
            }
            // 如果没找到，则新增
            if(!find){
                res.push([s,e]);
            }
        }
    }
    console.log(res,connects);
    return res.length;
}
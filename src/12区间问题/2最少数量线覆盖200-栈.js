/*
题目描述：
给定坐标轴上的一组线段，线段的起点和终点均为整数并且长度不小于1，请你从中找到最少数量的线段，这些线段可以覆盖住所有线段。

输入描述：
第一行输入为所有线段的数量，不超过10000，后面每行表示一条线段，格式为"x,y"，x和y分别表示起点和终点，取值范围是[-10^5，10^5]。

输出描述：
最少线段数量，为正整数

用例1
输入：
3
1,4
2,5
3,6
输出：
2
说明：选择[1,4]、[3,6]两段

输入：
4
1,4
6,9
5,8
9,10
输出
4
说明：
选择[1,4]、[5,8]、[6,9]、[9,10]

输入：
4
1,4
9,10
6,9
5,8
输出
4
说明：
选择[1,4]、[5,8]、[6,9]、[9,10]

输入：
4
-108,-58
-63,-55
-35,-15
9,10
输出
4
说明：
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const n = parseInt(await readline());
    let arr = [];
    for(let i=0;i<n;i++){
        let [l,r] = (await readline()).split(",").map(Number);
        arr.push([l,r]);
    }
    console.log(getRes1(n,arr));
})();

// 思路：参考1024 但是有不同点，这个数量线是允许断开的。因此断开时，需要再次寻找last和pre
// 注意：1、循环的范围是[最小左端点，最大右端点)，右侧为开区间（例如[8,10],找到8就能走到结束了）。
// 2、由于是负数，因此不方便初始设置值，则直接有值时赋值，循环时用maxEnd[i]||i避免取到undefined
// 思路：先记录每个左端点的最大右端点。定义pre(上一个区间的右端点，初始化为最小左端点)，last(最远右端点，初始化为-Infinity)
// 循环数组，当找到last时，表示断开了，此时while找i++的pre和last.当找到pre时，表示找到区间左端点了，更新pre为最远端点last
const getRes = (n,arr)=>{
    let min = Infinity,max = 0;
//     记录以左端点为支点，可以走到的最远的右端点  由于有负数，因此不能用Array(10000).fill(0).map((_,idx)=>idx)来赋值
    let maxEnd = {};
    for(let [start,end] of arr){
        if(maxEnd[start]===undefined){
            maxEnd[start]=start;
        }
        maxEnd[start] = Math.max(maxEnd[start],end);
        min = Math.min(min,start);
        max = Math.max(max,end);
    }
    console.log(min,max,maxEnd);
    //     数组排序
    arr.sort((a,b)=>a[0]-b[0]);
//     记录参数 由于有负数，last默认为-Infinity
    let pre = min,last =-Infinity,res = 0;
//     开始循环
    for(let i=min;i<max;i++){
        // 记录能走到最远的地方
        last = Math.max(last,maxEnd[i]||i);
        // 如果都走到last了，说明断开了，断开后继续向后找，直到找到了更远的右端点，表示这就是下一个断开的区间
        while(i>=last){
            i++;
            last = Math.max(last,maxEnd[i]||i);
            pre = i;
        }
        // 走到上一个区间的右端点，则重新开始一个新区间，并更新pre为这个区间的右端点
        if(i==pre){
            res++;
            pre = last;
        }
    }
    return res;
}

// 思路：左端点排序，用栈装线段
// 分两种场景：1、该区间右端点<=栈顶右端点，表示栈已经可以覆盖了，不需要这段区间
// 2、该区间右端点>栈顶右端点,表示栈不能覆盖全，需要新增一段栈。
// 分2种场景确定新增栈的左端点x： 1、栈顶左端点<区间左端点，x为栈顶右端点 2、栈顶左端点>=区间左端点，则完全覆盖这个栈了，要出栈，进新的，x为栈顶左端点
const getRes1 = (n,arr)=>{
    arr.sort((a,b)=>a[0]-b[0]);
    const stack = [];
    // 遍历每个区间
    for(let i=0;i<n;i++){
        if(stack.length===0){
            stack.push(arr[i]);
        }else {
            const [s1, e1] = stack[stack.length - 1];
            const [s2, e2] = arr[i];
            // 如果该区间是完全覆盖了栈顶数据，则取出原栈内数据，重新加入数组[栈顶左端点，区间右端点]
            if (s2 <= s1 && e2 > e1) {
                stack.pop();
                stack.push([s1, e2]);
            } else if (s2 > s1 && e2 > e1) {
                // 两种场景：s2<e1、s2>e1，但是到e2都没有覆盖到前面的栈，加数组[栈顶右端点，区间右端点]
                stack.push([e1, e2]);
            } else {
                // 剩下情况：栈顶覆盖了区间，则这个区间可以不要了
            }
        }
    }
    console.log(stack);
    return stack.length;
}
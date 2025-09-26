/*
题目描述
为了庆祝中国共产党成立100周年，某公园将举行多场文艺表演，很多演出都是同时进行，一个人只能同时观看一场演出，且不能迟到早退，
由于演出分布在不同的演出场地，所以连续观看的演出最少有15分钟的时间间隔，
小明是一个狂热的文艺迷，想观看尽可能多的演出， 现给出演出时间表，请帮小明计算他最多能观看几场演出。

输入描述：
第一行为一个整数N，表示演出场数，1<=N<=1000。
接下来N行，每行两个空格分割的整数，第一个整数T表示演出的开始时间，第二个整数L表示演出的持续时间。
T和L的单位为分钟，0<=T<=1440，0<L<=180。

输出描述：
输出一个整数，表示小明最多能观看的演出场数。

输入：
4
10 30
20 40
40 20
60 50
输出：
2

输入：
2
720 120
840 120
输出：
1

示例2：
输入：
2
0 60
90 60
输出：
2

输入
9
6 12
16 38
30 78
42 86
43 25
44 85
70 70
89 4
91 65
输出
3

！！！
输入 0
输出 0

输入
2
720 120
840 0
输出
0

输入
2
120 180
310 30
输出
1

输入
2
720 120
1441 120
输出
0
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const n = parseInt(await readline());
    // 1<=N<=1000
    if(n<1 || n>1000){
        console.log(0);
        return;
    }
    // 记录每场show的开始时间和结束时间
    let arr = [];
    for(let i=0;i<n;i++){
        let [t,l] = (await readline()).split(" ").map(Number);
        // ！！！校验入参 0<=T<=1440，0<L<=180 入参不符合直接返回0
        if(t<0 || t>1440 || l<=0 || l>180){
            console.log(0);
            return;
        }
        arr.push([t,t+l]);
    }
    console.log(getRes(n,arr));
})();

// 思路：
const getRes = (n,arr)=>{
//     右端点排序   比如两场是相同时间开始，但是一场持续时间特别长，选了他之后可能别的都看不了，因此要按照结束时间排序，这样能匹配到更多的场次
    arr.sort((a,b)=>a[1]-b[1]);
    console.log(n,arr)
//     从第一场开始看
    let endTime = arr[0][1];
    let res = 1;
//     找间隔大于15分钟的下一场
    for(let i=1;i<arr.length;i++){
        // 开始时间与上一场结束时间，大于15分钟，可以看
        if(arr[i][0]-endTime>=15){
            res++;
            endTime = arr[i][1];
        }
    }
    return res;

}



// 思路：区间问题，要看更多的表演，表演时间尽量短，因此根据结束时间升序，下一场表演与上一场结束时间间隔时间>=15
const getRes2 = (n,arr)=>{
//  要看更多的表演，表演时间尽量短，因此根据结束时间升序
    arr.sort((a,b)=>a[1]-b[1]);
    let endTime = arr[0][1];
    let res = 1;
    for (let i = 1; i < n; i++) {
        // 如果结束时间+15分钟比这一场的开始时间晚，则要找下一场
        if (endTime + 15 <= arr[i][0]) {
            endTime = arr[i][1];
            res++;
        }
    }
    return res;
}

// 10 40
// 20 60
// 40 60
// 60 110
// 思路:64分 双循环，外循环计算从哪场开始看，内循环记录可以看的场次，最终记录最多的场次  失分点：例如 42开始看的，但是结束要到128，而43开始看的，结束只到68，选择第二个更好。因此不能根据刚好的排序去选择下一场看什么
const getRes1 = (n,arr)=>{
//     按照开始时间排序 升序
    arr.sort((a,b)=>a[0]-b[0]);
    let endTime = 0;
    let res = 0;
    // 循环计算从第j场开始看，记录能够看最多的场次
    for(let j=0;j<n;j++) {
        let count = 0;
        for (let i = j; i < n; i++) {
            //     从第j场开始看，然后结束时间+15分钟，看下一场
            if (endTime == 0) {
                endTime = arr[i][1];
                count++;
            }
            // 如果结束时间+15分钟比这一场的开始时间晚，则要找下一场
            if (endTime + 15 > arr[i][0]) {
                continue;
            } else {
                endTime = arr[i][1] + 15;
                count++;
            }
        }
        //     循环完成后，记录最多的场次
        res = Math.max(res,count);
    }
    return res;
}
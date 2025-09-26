/*
题目描述
一个快递公司希望在一条街道建立新的服务中心。公司统计了该街道中所有区域在地图上的位置，并希望能够以此为依据为新的服务中心选址：
使服务中心到所有区域的距离的总和最小。

给你一个数组positions，其中positions[i] = [left, right] 表示第 i 个区域在街道上的位置，
其中left代表区域的左侧的起点，right代表区域的右侧终点，假设服务中心的位置为location：

如果第 i 个区域的右侧终点right满足 right < location，则第 i 个区域到服务中心的距离为 location - right；
如果第 i 个区域的左侧起点left 满足 left > location，则第 i 个区域到服务中心的距离为left - location；
如果第 i 个区域的两侧left，right满足left <= location <= right，则第 i 个区域到服务中心的距离为0
选择最佳的服务中心位置为location，请返回最佳的服务中心位置到所有区域的距离总和的最小值。

输入描述
先输入区域数组positions的长度n（1 ≤ n ≤ 10^5）

接下来 n 行每行输入成对的left和right值，以空格隔开

-10^9 ＜left ≤ 10^9
-10^9 ＜right ≤ 10^9
输出描述
输出为location

用例
输入
3
1 2
3 4
10 20
输出	8
说明	无
输入	2
1 4
4 5
输出	0
说明	无
输入	4
5 6
1 8
7 15
2 4
输出	3
说明	无
输入	6
1 3
4 9
2 15
6 27
15 17
5 8
输出	12
说明	无
输入	16
41 67
0 34
24 69
58 78
62 64
5 45
27 81
61 91
42 95
27 36
4 91
2 53
82 92
16 21
18 95
26 47
输出	127
说明	无
*/

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const n = parseInt(await readline());
    let arr = [];
    let lefts = [];
    let rights = [];
    for(let i=0;i<n;i++){
        arr.push((await readline()).split(" ").map(Number));
        lefts.push(arr[arr.length-1][0]);
        lefts.push(arr[arr.length-1][1]);
    }
    console.log(


        、
    (n,arr,lefts,rights))
}()

// 思路:
// 3
// 1 2
// 3 4
// 10 20
// 输出	8
//
// 1-20
// 1  0+2+9=11
// 2  0+1+8=9
// 3  1+0+7=8
// 4  2+0+6=8
// 5  3+1+5=9
// 6  4+2+4=10

const getRes = (n,arr,lefts,rights)=>{
    // 中心位置，left选择0，right选择最大的右侧
    let left = Math.min(...lefts),right = Math.max(...rights);
    let res = 0;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(check(mid,arr,res)){

        }
    }

}

const check = (mid,arr,res)=>{

}
/*
题目描述
一贫如洗的樵夫阿里巴巴在去砍柴的路上，无意中发现了强盗集团的藏宝地，藏宝地有编号从0~N的箱子，每个箱子上面贴有一个数字，箱子中可能有一个黄金宝箱。
黄金宝箱满足排在它之前的所有箱子数字和等于排在它之后的所有箱子数字之和；
第一个箱子左边部分的数字和定义为0；最后一个箱子右边部分的数字和定义为0.
请帮阿里巴巴找到黄金宝箱，输出第一个满足条件的黄金宝箱编号，如果不存在黄金宝箱，请返回-1。

输入描述
箱子上贴的数字列表，使用逗号分隔，例如1，-1，0 宝箱的数量不小于1个，不超过10000 宝箱上贴的数值范围不低于-1000，不超过1000

输出描述
第一个黄金宝箱的编号

用例1
输入
2,5,-1,8,6
输出
3
说明
下标3之前的数字和为：2 + 5 + -1 = 6
下标3之后的数字和为：6 = 6

用例2
输入
8,9
输出
-1
说明
不存在符合要求的位置

用例3
输入
11
输出
0
说明
下标0之前的数字和为：0
下标0之后的数字和为：0
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const gems = (await readline()).split(",").map(Number);
    console.log(getRes(gems));
})()

// 思路：单指针--先记录索引为0的左侧及右侧和，然后遍历数组，每次遍历都更新左侧和，右侧和减去当前值
const getRes = (gems)=>{
//     索引为0的箱子左侧和为left,右侧和为right
    let left = 0,right = gems.reduce((sum,cur)=>sum+cur)-gems[0];
    if(left==right) return 0;
    for(let i = 1;i < gems.length;i++){
        left += gems[i-1];
        right -= gems[i];
        if(left === right){
            return i;
        }
    }
    return -1;
}

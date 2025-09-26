/*
有这么一款单人卡牌游戏，牌面由颜色和数字组成，颜色为红、黄、蓝、绿中的一种，数字为0-9中的一个。游戏开始时玩家从手牌中选取一张卡
牌打出，接下来如果玩家手中有和他上一次打出的手牌颜色或者数字相同的手牌，他可以继续将该手牌打出，直至手牌打光或者没有符合条件可以继续打出的手牌。
现给定一副手牌，请找到最优的出牌策略，使打出的手牌最多。
输入描述：
输入为两行，第一行是每张手牌的数字，数字由空格分隔，第二张为对应的每张手牌的颜色，用r y b g这4个字母分别代表4种颜色，字母也由空格分隔。手牌数
量不超过10。
输出描述：
输出一个数字，即最多能打出的手牌的数量。
示例1：
输入
1 4 3 4 5
r y b b r
输出
3
原文链接：https://blog.csdn.net/weixin_41934659/article/details/126424140
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const numList = (await readline()).split(" ").map(Number);
    const colorList = (await readline()).split(" ");
    console.log(getRes(numList,colorList));
})()

// 思路：回溯 入参为是否使用过，上一张牌索引(初始为undefined),卡牌选择的数量
const getRes = (numList,colorList)=>{
    console.log(numList,colorList);
    const n = numList.length;
    let res = 0;
    const used = Array(n).fill(false);
    const dfs = (used,pre,count)=>{
        // 直接记录最大值即可
        res = Math.max(res,count);
        for(let i=0;i<n;i++){
            // 使用过了,找下一个
            if(used[i]) continue;
            // 判断上一个值不是undefined，且值都不一样，则找下一个
            if(pre!=undefined && numList[i]!=numList[pre] && colorList[i]!=colorList[pre]) continue;
            // 标记为使用过
            used[i] = true;
            dfs(used,i,count+1);
            used[i]=false;
        }
    }
    dfs(used,undefined,0);
    return res;
}
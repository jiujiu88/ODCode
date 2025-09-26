/*
题目描述：

机器人搬砖，一共有 N 堆砖存放在 N 个不同的仓库中，第i堆砖中有 bricks[i] 块砖头，要求在 8 小时内搬完。机器人每小时能搬砖的数量取决于有多少能量格，机器人一个小时中只能在一个仓库中搬砖，机器人的能量格只在这一个小时有效，为使得机器人损耗最小化，应尽量减小每次补充的能量格数。 为了保障在 8 小时内能完成搬砖任务，请计算每小时给机器人充能的最小能量格数
1：无需考虑机器人补充能力格的耗时;
2：无需考虑机器人搬砖的耗时;
3：机器人每小时补充能量格只在这一个小时中有效:
输入描述：
第一行为一行数字，空格分隔，表示每个仓库的转头数量。
输出描述：
机器人每小时最少需要充的能量格，若无法完成任务，输出 -1

 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const bricks = (await readline()).split(" ").map(Number);
    console.log(getRes(bricks))
}()

// 思路:同2悟空 二分法，用check方法求是否符合条件，求最小值
const getRes = (bricks)=>{
    // 最小能量格为1，最大为max。
    let left = 1,right = Math.max(...bricks);
    // 如果仓库个数多于8小时，肯定搬不完
    if(bricks.length>8){
        return -1;
    }
    // 判断机器人搬完所有货物，是否可以在8小时内完成
    function check(cost){
        let needH = 0;
        //     每棵树需要花费的时间为
        for(let v of bricks){
            needH +=Math.ceil(v/cost);
        }
        return needH<=8;
    }
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        // 如果符合条件，找更小的
        if(check(mid)){
            right = mid - 1;
        }else{
            left = mid + 1;
        }
    }
    return left;
}

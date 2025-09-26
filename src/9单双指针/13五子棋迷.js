/*
题目描述
张兵和王武是五子棋迷，工作之余经常切磋棋艺。这不，这会儿又下起来了。走了一会儿，轮张兵了，对着一条线思考起来了，
这条线上的棋子分布如下: 用数组表示: -1 0 1 1 1 0 1 0 1 -1 棋了分布说明:
-1代表白子，0代表空位，1 代表黑子
数组长度L，满足 1 < L < 40，L为奇数
你得帮他写一个程序，算出最有利的出子位置。 最有利定义：
找到一个空位(0)，用棋子(1/-1)填充该位置，可以使得当前子的最大连续长度变大
如果存在多个位置，返回最靠近中间的较小的那个坐
如果不存在可行位置，直接返回-1
连续长度不能超过5个(五字棋约束)
输入描述
第一行: 当前出子颜色
第二行: 当前的棋局状态

输出描述
1个整数，表示出子位置的数组下标

用例1
输入
1
-1 0 1 1 1 0 1 -1 1
输出
5
说明
当前为黑子 (1)，放置在下标为5的位置，黑子的最大连续长度，可以由3到5

用例2
输入
-1
-1 0 1 1 1 0 1 0 1 -1 1
输出
1
说明
当前为白子，唯一可以放置的位置下标为1，白子的最大长度，由1变为2

用例3
输入
1
0 0 0 0 1 0 0 0 0 1 0
输出
5
说明
可行的位置很多，5最接近中间的位置坐标

输入1
1 -1 1 -1 1 -1 0
输出-1
说明 原先最大连续长度为1，补种后还是为1，没有增大，所以返回-1
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const color = parseInt(await readline());
    const arr = (await readline()).split(" ").map(Number);
    console.log(getRes(color,arr));
})()

// 思路：参考补种未成活胡杨树  记录非当前棋子的索引，当值为0时进行补位，计算补位后最大连续长度 ！！！重点:补种后最大连续长度要大于原先的最大连续长度，否则-1
const getRes = (color,arr)=>{
    let mid = Math.floor(arr.length/2);
    let res = -1;
    // idx记录非当前棋子的索引，值为0时可以补种
    let idx = [];
    // ！！！记录未补种前最大长度
    let curMaxLen = 0;
    let count = 0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]!==color){
            idx.push(i);
            curMaxLen = Math.max(curMaxLen,count);
            count = 0;
        }else{
            count++;
        }
    }
//     记录最长连续长度
    let maxLen = 0;
    for(let i=0;i<idx.length;i++){
    //     如果当前值不为0，不可补种，跳出
        if(arr[idx[i]]!=0){
            continue;
        }
    //     计算3种情况的开始位置和结束位置
        let left = i==0 ? 0 : idx[i-1]+1;
        let right = i==idx.length-1 ? arr.length-1 : idx[i+1]-1;
        let len = right-left+1;
        if(len<6){
        //     ！！！如果找到了更长的，直接记录，长度要增大才行
            if(len>maxLen && len>curMaxLen){
                maxLen = len;
                res = idx[i];
            }else if(len==maxLen){
            //     如果长度相同，res取最靠近mid的下标
                if(Math.abs(idx[i]-mid)<Math.abs(res-mid)){
                    res = idx[i];
                }
            }
        }
    }
    return res;
}

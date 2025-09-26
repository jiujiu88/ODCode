/*
题目描述
在第一人称射击游戏中，玩家通过键盘的A、S、D、W四个按键控制游戏人物分别向左、向后、向右、向前进行移动，从而完成走位。

假设玩家每按动一次键盘，游戏任务会向某个方向移动一步，如果玩家在操作一定次数的键盘并且各个方向的步数相同时，此时游戏任务必定会回到原点，则称此次走位为完美走位。

现给定玩家的走位（例如：ASDA），请通过更换其中一段连续走位的方式使得原走位能够变成一个完美走位。其中待更换的连续走位可以是相同长度的任何走位。

请返回待更换的连续走位的最小可能长度。

如果原走位本身是一个完美走位，则返回0。

输入描述
输入为由键盘字母表示的走位s，例如：ASDA

输出描述
输出为待更换的连续走位的最小可能长度。

备注
走位长度 1 ≤ s.length ≤ 100000
s.length 是 4 的倍数
s中只含有'A', 'S', 'D', 'W' 四种字符
用例1
输入
WASDAASD
输出
1
说明
将第二个A替换为W，即可得到完美走位

用例2
输入
AAAA
输出
3
说明
将其中三个连续的A替换为WSD，即可得到完美走位
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：记录4个按键出现的次数，例如A、S、W分别比平衡次数多x个，则需要找到连续字串中ASW出现的次数大于等于x次，这样就能替换为平衡走位
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const s = await readline();
    console.log(getRes(s));
})()

const getRes = (s)=>{
    let res = s.length;
    // 正常完美走位每个按键需要出现target次
    const target = s.length/4;
    // 计算s中每个按键出现的次数
    let map = {"A":target,"S":target,"D":target,"W":target};
    for(let v of s){
        map[v]--;
    }
    // 如果每个按键出现次数就是target，则本身就是完美走位，不用替换，返回0--优化
    // if(Object.values(map).every(v=>v==0)){
    //     return 0;
    // }
    let total = 0;
    // ！！！计算出需要替换的子串中包含的每个字符的个数
    let resMap = {};
    for(let key in map){
        // 如果出现次数大于平衡次数，值小于0，这是需要替换的
        if(map[key]<0){
            resMap[key] = -map[key];
            total -=map[key];
        }
    }
    // 如果需要替换的total为0，则本身就是完美走位，不用替换，返回0
    if(total===0){
        return 0;
    }
    let left = 0;
    // 滑窗，找到resMap中指定按键次数的最短子串
    for(let i=0;i<s.length;i++){
        // resMap[s[i]]!=undefined &&
        if(resMap[s[i]]-->0){
            total--;
        }
        while(total==0){
            // 符合要求，记录结果
            res = Math.min(res,i-left+1);
            if(resMap[s[left]]++>=0){
                total++;
            }
            left++;
        }
    }
    return res;
}
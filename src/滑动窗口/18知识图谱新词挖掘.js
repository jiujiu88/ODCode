/*
题目描述
小华负责公司知识图谱产品，现在要通过新词挖掘完善知识图谱。
新词挖掘：给出一个待挖掘问题内容字符串Content和一个词的字符串word，找到content中所有word的新词。
新词：使用词word的字符排列形成的字符串。
请帮小华实现新词挖掘，返回发现的新词的数量。

输入描述
第一行输入为待挖掘的文本内容content；
第二行输入为词word；

输出描述
在content中找到的所有word的新词的数量。

备注
0 ≤ content的长度 ≤ 10000000
1 ≤ word的长度 ≤ 2000
用例1
输入
qweebaewqd
qwe
输出
2
说明
起始索引等于0的子串是“qwe”，它是word的新词。
起始索引等于6的子串是“ewq”，它是word的新词。

用例2
输入
abab
ab
输出
3
说明
起始索引等于0的子串是”ab“，它是word的新词。
起始索引等于1的子串是”ba“，它是word的新词。
起始索引等于2的子串是”ab“，它是word的新词。
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：找到出现次数相同字符的子串，用滑窗获取固定长度的子串，判断是否是word的子串
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const content = await readline();
    const word = await readline();
    console.log(getRes(content,word));
})()

const getRes = (content,word)=>{
    let res = 0;
//     因为时字符串，可以用长度为118的数组
    const cnt = new Array(118).fill(0);
    const base = 'a'.charCodeAt();
    const k= word.length;
    // 先计算需要符合的各字符的个数
    for(let v of word){
        cnt[v.charCodeAt()-base]++;
    }
//     用滑窗
    for(let i=0;i<content.length;i++){
        cnt[content.charCodeAt(i)-base]--;
        if(i+1<k){
            continue;
        }
    //     更新
        if(cnt.every(v=>v===0)){
            res++;
        }
    //     出
        cnt[content.charCodeAt(i+1-k)-base]++;
    }
    return res;
}
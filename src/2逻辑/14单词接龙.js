/*
单词接龙的规则是：
用于接龙的单词首字母必须要前一个单词的尾字母相同；
当存在多个首字母相同的单词时，取长度最长的单词，如果长度也相等，则取字典序最小的单词；
已经参与接龙的单词不能重复使用。
现给定一组全部由小写字母组成单词数组，并指定其中的一个单词作为起始单词，进行单词接龙。

请输出最长的单词串，单词串是单词拼接而成，中间没有空格。

输入描述：
输入的第一行为一个非负整数，表示起始单词在数组中的索引K，0 <= K < N。
输入的第二行为一个非负整数，表示单词的个数N。
接下来的N行，分别表示单词数组中的单词。

输出描述：
输出一个字符串，表示最终拼接的单词串。

备注：
单词个数N的取值范围为[1, 20]
单个单词的长度的取值范围为[1, 30]

输入
0
6
word
dd
d
dc
dword
d
输出
worddworddc

原文链接：https://blog.csdn.net/Muse_God/article/details/125085948
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const k = parseInt(await readline());
    const n = parseInt(await readline());
    const arr = [];
    for(let i=0;i<n;i++){
        arr.push(await readline());
    }
    console.log(getRes(k,n,arr));
})()

// 思路：
const getRes = (k,n,arr)=>{
    console.log(k,n,arr);

}
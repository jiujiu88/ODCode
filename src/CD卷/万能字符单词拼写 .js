/*
题目描述
有一个字符串数组words和一个字符串chars。
假如可以用chars中的字母拼写出words中的某个“单词”（字符串），那么我们就认为你掌握了这个单词。
words的字符仅由 a-z 英文小写字母组成。 例如: abc
chars 由 a-z 英文小写字母和 “?”组成。其中英文问号“?”表示万能字符，能够在拼写时当做任意一个英文字母。 例如： “?” 可以当做 "a"等字母。
注意：每次拼写时，chars中的每个字母和万能字符都只能使用一次。

输出词汇表words中你掌握的所有单词的个数。 没有掌握任何单词，则输出0。

输入
第1行输入数组words的个数，记为N。
从第2行开始到第N+1行依次输入数组words的每个字符串元素。
第N+2行输入字符串chars。

输出
输出一个整数，表示词汇表words中你掌握的单词个数。

示例1
输入
4
cat
bt
hat
tree
atach??
输出
3

说明
可以拼写字符串"cat"、“bt"和"hat”
原文链接：https://blog.csdn.net/yegu001/article/details/135465168
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    let words = [];
    for(let i=0;i<n;i++){
        words.push((await readline()))
    }
    const chars = (await readline());
    console.log(getRes(n,words,chars));
})()

// 思路：用长度为128的数组存每个单词和匹配单词的出现次数。循环每个单词，遍历128个字符，计算单词中字符出现次数与target单词的差值，累计差值如果<=?的个数，就不能成功。
const getRes = (n,words,chars)=>{
    // console.log(n,words,chars);
    // 63-122
//     记录每个单词的字符个数
    const getCnt = (word)=>{
        let arr = Array(128).fill(0);
        for(let v of word){
            arr[v.charCodeAt(0)]++;
        }
        return arr;
    }
    let res = 0;
    let charCnt = getCnt(chars);
    for(let v of words){
        let wordCnt = getCnt(v);
        // console.log(wordCnt,charCnt)
        let diff = 0;
        // 循环数组，查看每个元素差多少个数
        for(let i=0;i<128;i++){
            // 如果是负数，表示chars中的该元素比较多，可以覆盖单词，如果是正数，表示差值，chars还需要diff个字符才能覆盖单词
            diff += Math.max(0,wordCnt[i]-charCnt[i]);
        }
        // 如果差值小于万能牌的个数，表示可以完成
        if(diff<=charCnt["?".charCodeAt()]){
            res++;
        }
    }
    return res;
}
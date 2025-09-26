/*
题目
给出一个仅包含字母的字符串，不包含空格，统计字符串中各个字母(区分大小写)出现的次数，并按照字母出现次数从大到小的顺序输出各个字母及
其出现次数。如果次数相同，按照自然顺序进行排序，且小写字母在大写字母之前。

输入描述:
输入一行，为一个仅包含字母的字符串。

输出描述:
按照字母出现次数从大到小的顺序输出各个字母和字母次数，用英文分号分隔，注意末尾的分号;字母和次数间用英文冒号分隔。

示例：
输入
xyxyXX
输出
x:2;y:2;X:2;
说明
每个字符出现的次数为2 故x排在y之前，而小写字母x在大写X之前

输入
abababb
输出
b:4;a:3;
说明
b的出现个数比a多 故排在a前面

原文链接：https://blog.csdn.net/misayaaaaa/article/details/143824766
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const n = parseInt(await readline());
    let urls = [];
    for(let i=0;i<n;i++){
        urls.push((await readline()).split("/"))
    }
    const [l,target] = (await readline()).split(" ");
    console.log(getRes(n,urls,l,target));
})()


const getRes = (n,urls,l,target)=>{
    console.log(n,urls,l,target);

}
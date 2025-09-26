/*
题目描述
给定一个字符串的摘要算法，请输出给定字符串的摘要值
去除字符串中非字母的符号。
如果出现连续字符(不区分大小写) ，则输出：该字符 (小写) + 连续出现的次数。
如果是非连续的字符(不区分大小写)，则输出：该字符(小写) + 该字母之后字符串中出现的该字符的次数
对按照以上方式表示后的字符串进行排序：字母和紧随的数字作为一组进行排序，数字大的在前，数字相同的，则按字母进行排序，字母小的在前。

输入描述
一行字符串，长度为[1,200]

输出描述
摘要字符串

示例1
输入:
aabbcc
输出:
a2b2c2

示例2
输入:
bAaAcBb
输出:
a3b2b2c0
说明:
第一个b非连续字母，该字母之后字符串中还出现了2次(最后的两个Bb)，所以输出b2。a连续出现3次，输出a3，c非连续，
该字母之后字符串再没有出现过c，输出c0，Bb连续2次，输出b2
对b2、a3、c0、b2进行排序，最终输出a3b2b2c0

原文链接：https://blog.csdn.net/u012657708/article/details/131136560
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(",");
    console.log(getRes(arr));
})()

// 思路：
const getRes = (arr)=>{
    console.log(arr);

}
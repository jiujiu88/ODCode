/*
题目描述
阿甘最近学习了爬虫技术，并在某电影网站找到了一个Robots协议允许可爬的页面。
在对应该页面进行爬虫后，阿甘得到了一个字符串，字符串中包含电影名字、#、以及 <、>。
其中电影名字会使用一个或多个 '#' 号分隔，一些电影名字也会使用 <> 包裹，此时需要注意 <> 中出现的 # 不再作为分隔符，而是当成电影名字的一部分。
用例保证每对 <> 是闭合的，不会存在闭合不了的情况。
请你帮助阿甘提取所有电影名字。

输入描述
输入一行字符串，字符串长度最大1000，电影名字长度最大50

输出描述
输出字符串中出现的所有电影名字。每个电影名字输出一行。

用例
输入
<流浪地球>#阿凡达####<哪吒#2>#1942
输出
<流浪地球>
阿凡达
<哪吒#2>
1942
说明
无

原文链接：https://blog.csdn.net/qfc_128220/article/details/127418027
 */
const rl = require("readline").createInterface({
    input:process.stdin
})
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function() {
    const str = await readline();
    console.log(getRes(str));
}()

// 思路：""中的命令用isOpen标记，每次取!isOpen。
// 提示；什么时候字符是命令字符？ 当遇到不是_或者isOpen时，是命令字(isOpen为是，_也是命令字)
const getRes = (str)=>{

}
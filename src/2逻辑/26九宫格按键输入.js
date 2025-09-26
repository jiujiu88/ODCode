/*
题目描述
九宫格按键输入，有英文和数字两个模式，默认是数字模式，数字模式直接输出数字，英文模式连续按同一个按键会依次出现这个按键上的字母，
如果输入 “/” 或者其他字符，则循环中断，输出此时停留的字母。
数字和字母的对应关系如下，注意 0 只对应空格：
输入一串按键，要求输出屏幕显示
#用于切换模式，默认是数字模式，执行 # 后切换为英文模式；
/表示延迟，例如在英文模式下，输入 22/222，显示为 bc，数字模式下 / 没有效果；
英文模式下，多次按同一键，例如输入 22222，显示为 b；

输入描述
输入范围为数字 0~9 和字符’#’、’/’，输出屏幕显示，例如:
在数字模式下，输入 1234，显示 1234
在英文模式下，输入 1234，显示,adg

输出描述
输出屏幕显示的字符

测试样例1
输入：
2222/22
输出：
222222

原文链接：https://blog.csdn.net/weixin_66855397/article/details/144056251
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const str = await readline();
    console.log(getRes(str));
})()

// 思路：
const getRes = (str)=>{
    console.log(str);

}
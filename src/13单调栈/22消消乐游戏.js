/*
题目描述
游戏规则：
输入一个只包含英文字母的字符串，字符串中的两个字母如果相邻且相同，就可以消除。
在字符串上反复执行消除的动作，直到无法继续消除为止，此时游戏结束。
输出最终得到的字符串长度。

输入描述
输入原始字符串 str ，只能包含大小写英文字母，字母的大小写敏感， str 长度不超过100。

输出描述
输出游戏结束后，最终得到的字符串长度。

示例1
输入
gg
输出
0

示例2
输入
mMbccbc
输出
3

原文链接：https://blog.csdn.net/A_D_I_D_A_S/article/details/127998707
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

// 思路：同20有效的括号 依次入栈，只要遍历到的元素与栈内元素一样，则消除 需要判断元素是否符合要求
const getRes = (str)=>{
    // str 长度不超过100。
    if(str.length>100) return 0;
    let stack = [];
    for(let v of str){
        // 只能包含大小写英文字母，字母的大小写敏感
        if(!((v>='a' && v<='z') || (v>='A' && v<='Z'))){
            return 0;
        }
        // 如果遇到则消掉
        if(stack.length && stack[stack.length-1] === v){
            stack.pop();
        }else {
            // 不一样则入栈
            stack.push(v);
        }
    }
    return stack.length;
}
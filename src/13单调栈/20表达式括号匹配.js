/*
题目描述
假设一个表达式有英文字母（小写）、运算符（+，—，∗，/）和左右小（圆）括号构成，以“@”作为表达式的结束符。
请编写一个程序检查表达式中的左右圆括号是否匹配，若匹配，则返回“YES”；否则返回“NO”。表达式长度小于255，左圆括号少于20个。

输入
一行数据，即表达式。

输出
一行，即“YES” 或“NO”。

输入
2*(x+y)/(1-x)@
输出
YES

输入
(25+x)(a(a+b+b)@
输出
NO

原文链接：https://blog.csdn.net/hipoole/article/details/103542715
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

// 思路：同20有效的括号
const getRes = (str)=>{
    let stack = [];
    for(let v of str){
        if(v=='(' || v==')'){
            if(stack.length && stack[stack.length-1]=="(" && v==")"){
                stack.pop();
            }else{
                stack.push(v);
            }
        }
    }
    return stack.length ? "NO" : "YES";
}
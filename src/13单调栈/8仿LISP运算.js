/*
题目描述
LISP 语言唯一的语法就是括号要配对。 形如(OP P1 P2 …)，括号内元素由单个空格分割。 其中第一个元素 OP 为操作符，后续元素均为其参数，参数个数取决于操作符类型
注意：参数 P1, P2 也有可能是另外一个嵌套的(OP P1 P2 …)
当前 OP 类型为 add / sub / mul / div（全小写），分别代表整数的加减乘除法简单起见，所有 OP 参数个数均为 2

题目涉及数字均为整数，可能为负；
不考虑 32 位溢出翻转，计算过程中也不会发生 32 位溢出翻转 除零错误时，输出 “error”；
除法遇除不尽，向下取整，即 3 / 2 = 1

输入描述：
输入为长度不超过 512 的字符串，用例保证了无语法错误

输出描述：
输出计算结果或者“error”

举例:
输入：
(mul 3 -7)
输出：
-21

输入：
(add 1 2)
输出：
3

输入：
(sub (mul 2 4) (div 9 3))
输出：
5

输入：
(div 1 0)
输出：
error

输入：
(div 12 (sub 45 45))
输出：
error

原文链接：https://blog.csdn.net/weixin_44052055/article/details/125902077
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const str = await readline();
    console.log(getRes(str));
})();

// 计算结果
const calc = (op,x,y)=>{
    switch(op){
        case 'add':
            return x + y;
        case 'sub':
            return x - y;
        case 'mul':
            return x * y;
        case 'div':
            return Math.floor(x / y);
    }
}

// 思路：定义字符串res,只用一个栈，只要遇到空格或者反括号且res不为空，则入栈（操作符、x、y）；非括号空格肯定是字符，加到res；遇到反括号出栈，开始计算
const getRes = (str)=>{
    const stack = [];
    let res = "";
    // 遍历str  (sub (mul 2 4) (div 9 3))
    for(let v of str){
        // 遇到反括号和空格，且res不为空，都入栈
        if((v==")" || v==" ") && res!=""){
            stack.push(res);
            res = "";
        }
        if(v==")"){
        //     开始计算 一定是栈顶的3个元素计算
            const y = stack.pop();
            const x = stack.pop();
            const op = stack.pop();
            if(op=="div" && y=="0"){
                return "error";
            }
            stack.push(calc(op,parseInt(x),parseInt(y)));
        }
        if(!["(",")"," "].includes(v)){
            res += v;
        }
    }
    return stack.pop();
}

// 思路：先运算符，再显示两个数字，用符号栈和数字栈将对应数据入栈，遇到括号则出栈计算
const getRes1 = (str)=>{
    // console.log(str);
    // 数组和)没有空格，不方便记录，因此加上空格，遇到空格就加入栈
    str = str.replaceAll(")"," )");
    const opeStack = [];
    const numStack = [];
    let num = "";
    let ope = "";
    // 遍历str
    for(let v of str){
        if(v=="("){

        }else if(v==")"){
            // 计算
            const y = numStack.pop();
            const x = numStack.pop();
            const op = opeStack.pop();
            if(op=="div" && y==0){
                return "error";
            }
            numStack.push(calc(op,x,y));
        }else if(v==" "){
            if(num!=""){
                numStack.push(parseInt(num));
                num = "";
            }
            if(ope!=""){
                opeStack.push(ope);
                ope = "";
            }
            console.log("---",numStack,opeStack)
        }else if((v>=0 && v<=9) || v=="-"){
            // 可能是负数，也要加进来
            num += v;
        }else{
            ope +=v;
        }
    }
    return numStack[0];
}
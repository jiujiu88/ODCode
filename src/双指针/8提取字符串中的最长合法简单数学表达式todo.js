/*
题目描述
提取字符串中的最长合法简单数学表达式，字符串长度最长的，并计算表达式的值。如果没有，则返回 0 。

简单数学表达式只能包含以下内容：

0-9数字，符号+-*
说明：

所有数字，计算结果都不超过long
如果有多个长度一样的，请返回第一个表达式的结果
数学表达式，必须是最长的，合法的
操作符不能连续出现，如 +--+1 是不合法的
输入描述
字符串

输出描述
表达式值

用例1
输入
1-2abcd
输出
-1
说明
最长合法简单数学表达式是"1-2"，结果是-1

输入1a2b3c
输出0

输入1a2+b3c
输出0

输入1+2++3+4+5
输出3

输入1+2*31+41+51+abc++1234567890++
输出3  31不合法

输入1+2*3+4+5+abc++9007199254740991+0+0
输出3
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const s = await readline();
    console.log(getRes(s));
})()

// 思路：用isNum记录是数字还是字母，表达式正常时加入path,遇到不合法字符将path加入res，找到最长的res表达式，eval执行表达式计算结果
const getRes = (s)=>{
//     ！！！s结尾加入不合法字符，避免处理最后一个字符，不符合时都记录结果
    s = s + 'a';
    let left = 0,right = s.length;
    let res = [],path = [];
    let isNum = true;
    for(let i=0;i<s.length;i++){
        if(isNum && isNumber(s[i])){
            isNum = false;
            path.push(s[i]);
        }else if(!isNum && isSymbol(s[i])){
            isNum = true;
            path.push(s[i]);
        }else{
            if(path.length){
                // 如果最后一个字符的后一个字符还是数字，说明出现了大于9的数字，不符合，删掉数字，删除上一个符号
                if(!isNum && isNumber(s[i])){
                    path.pop();
                    path.pop();
                }
                // 如果最后一个字符是符号，删掉
                if(isNum){
                    path.pop();
                }
                // 表达式中要包含数字和符号，所以长度必须等于3，只能返回一个二元表达式，1+2*3+4+5+abc++9007199254740991+0+0取到1+2
                if(path.length==3){
                    res.push(path);
                }
                path = [];
            }
        //     下一个有效表达式从数字开始
            isNum = true;
        }
    }
    if(res.length){
        // res.sort((a,b)=>b.length - a.length);
        return eval(res[0].join(''));
    }else{
        return 0;
    }
}

const isNumber = (char)=>{
    return char >= '0' && char <= '9';
}

const isSymbol = (char)=>{
    return ["+","-","*"].includes(char);
}
/*
题目描述
现需要实现一种算法，能将一组压缩字符串还原成原始字符串，还原规则如下：
1、字符后面加数字N，表示重复字符N次。例如：压缩内容为A3，表示原始字符串为AAA。
2、花括号中的字符串加数字N，表示花括号中的字符重复N次。例如压缩内容为{AB}3，表示原始字符串为ABABAB。
3、字符加N和花括号后面加N，支持任意的嵌套，包括互相嵌套，例如：压缩内容可以{A3B1{C}3}3

输入描述
输入一行压缩后的字符串

输出描述
输出压缩前的字符串

备注
输入保证，数字不会为0，花括号中的内容不会为空，保证输入的都是合法有效的压缩字符串
输入输出字符串区分大小写
输入的字符串长度范围为[1, 10000]
输出的字符串长度范围为[1, 100000]
数字N范围为[1, 10000]

用例
输入
{A3B1{C}3}3
输出
AAABCCCAAABCCCAAABCCC
说明
{A3B1{C}3}3代表A字符重复3次，B字符重复1次，花括号中的C字符重复3次，最外层花括号中的AAABCCC重复3次。

原文链接：https://blog.csdn.net/caibiyuge/article/details/129207634

1.遇到字符{:将其入栈。
2.遇到字符}:计算重复次数,将栈中的字符组合成一个字符串， 复拼接后再入栈。
3.遇到字母字符:判断下一个字符是否是数字,若是数字,则将当前字母重复拼接后入栈;若不是数字,则直接将当前字母入栈。
后,将栈中的字符串顺序拼接，得到解压缩后的字符串。

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

const isNum =(v)=>{
    return v>=0 && v<=9;
}
const isLetter = (v)=>{
    return (v>="a" && v<="z") || (v>="A" && v<="Z");
}
// 思路：
const getRes = (str)=>{
    let letterStack = [];
    let numStack = [];
    let num = "";
    let letter = "";
    for(let i=0;i<str.length;i++){
        if(isLetter(str[i])){
            // 把前面算好的先装起来
            letter = letter.repeat(parseInt(num));
            letterStack.push(letter);
            letter = "";
            // 先把字母记录完
            while(isLetter(str[i])){
                letter += str[i];
                i++;
            }
            letterStack.push(letter);
            letter = "";
        }
        // 剩下的是数字或者}
        if(str[i]=="{"){

        }else if(str[i]=="}"){
            letterStack.push(letter);
            letter = "";
        }else{
            num +=str[i];
        }





        if(isNum(str[i])){
            // 先把数字记录完
            while(isNum(str[i])){
                num += str[i];
                i++;
            }
            numStack.push(parseInt(num));
            num = "";
        //     记完就开始计算并入栈
            letter = (letterStack.length?letterStack.pop():"") + letter.repeat(numStack.pop());
            letterStack.push(letter);
            letter = "";
        }
        if(str[i]=="{"){

        }else if(str[i]=="}"){
            // letterStack.push(letter);
            // letter = "";
        }else{
            letter +=str[i];
        }
    }
    return letterStack.pop();
}
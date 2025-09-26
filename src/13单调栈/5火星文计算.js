/*
题目描述
已知火星人使用的运算符为#、$，其与地球人的等价公式如下：
x#y = 2*x+3*y+4
x$y = 3*x+y+2
其中x、y是无符号整数
地球人公式按C语言规则计算
火星人公式中，$的优先级高于#，相同的运算符，按从左到右的顺序计算
现有一段火星人的字符串报文，请你来翻译并计算结果。

输入描述
火星人字符串表达式（结尾不带回车换行）
输入的字符串说明：字符串为仅由无符号整数和操作符（#、$）组成的计算表达式。
例如：123#4$5#67$78。
用例保证字符串中，操作数与操作符之间没有任何分隔符。
用例保证操作数取值范围为32位无符号整数。
保证输入以及计算结果不会出现整型溢出。
保证输入的字符串为合法的求值报文，例如：123#4$5#67$78
保证不会出现非法的求值报文，例如类似这样字符串：
#4$5 //缺少操作数
4$5# //缺少操作数
4#$5 //缺少操作数
4 $5 //有空格
3+4-5*6/7 //有其它操作符
12345678987654321$54321 //32位整数计算溢出

示例：
输入：
7#6$5#12
输出：
226
说明：
7#6$5#12 = 7#(3*6+5+2)#12 = 7#25#12 = (2*7+3*25+4)#12 = 93#12 = 2*93+3*12+4 = 186+36+4 = 226

输入：
7#6#3$5#12
输出：
288
说明：
7#6#3$5#12 = 7#6#(3*3+5+2)#12 = 7#6#16#12 = (2*7+3*6+4)#16#12 =
36#16#12 = (2*36+3*16+4)#12 = 124#12 = 2*124+3*12+4 = 248+36+4 = 288

// 第一个#加入栈，第二个又是#，可以让第一个先计算，然后又遇到$,让$先计算再入栈
7#6#3$5#12 = (2*7+3*6+4)#3$5#12 = 36#(3*3+5+2)#12 = 36#12#12
原文链接：https://blog.csdn.net/fontend123/article/details/131884864
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const s = await readline();
    console.log(getRes1(s));
})();

// 思路：先判断是数字，遍历到不是数字时，加入数字栈，然后遍历，如果下一个操作符是#，而栈顶是$,此时必须先计算好$入栈。最后剩下#，正序计算。
const getRes = (s)=>{
    // 结尾增加#，可以保证最后一个元素是#，前面栈内的$都会被计算。如果不加，例如7#6#3$5#12$23，最后一个是$,就不会计算
    s +="#";
    const isNum = (x)=>{
        return x>=0 && x<9;
    }
    const numStack = [];
    const opeStack = [];
    let num = "";
    for(let i=0;i<s.length;i++){
        // 遇到数字则把数字计算完，加入栈中
        if(isNum(s[i])){
            while(isNum(s[i])){
                num += s[i++];
            }
            numStack.push(parseInt(num));
            num = "";
        }
    //     上面计算完后，i指向了非数字的操作符
        if(s[i]=="$" || s[i]=="#"){
            // 如果当前栈顶是$，则优先计算
            while(opeStack.length && opeStack[opeStack.length-1]=="$"){
                const y = numStack.pop();
                const x = numStack.pop();
                const ope = opeStack.pop();
                numStack.push(3*x+y+2);
            }
            opeStack.push(s[i]);
        }
    }
    // 最后剩下的都是#字符，要从前往后计算
    while(numStack.length>1){
        const x = numStack.shift();
        const y = numStack.shift();
        const ope = opeStack.shift();
        numStack.unshift(2*x+3*y+4);
    }
    return numStack[0];
}

// 优化：栈内操作符是$或者#，如果下一个操作符是#(优先级大于等于栈顶)，那么先计算$(优先级高)或者#(在前面先计算)。这样在结尾加#,能让所有数据都算完
const getRes1 = (s)=>{
    // 结尾增加#，可以保证最后一个元素是#，前面栈内的$都会被计算。如果不加，例如7#6#3$5#12$23，最后一个是$,就不会计算
    s +="#";
    const isNum = (x)=>{
        return x>=0 && x<9;
    }
    // 计算运算符的优先级
    const priority = (x)=>{
        if(x=="$"){
            return 2;
        }else{
            return 1;
        }
    }
    const numStack = [];
    const opeStack = [];
    let num = "";
    for(let i=0;i<s.length;i++){
        // 遇到数字则把数字计算完，加入栈中
        if(isNum(s[i])){
            while(isNum(s[i])){
                num += s[i++];
            }
            numStack.push(parseInt(num));
            num = "";
        }
        //     上面计算完后，i指向了非数字的操作符
        if(s[i]=="$" || s[i]=="#"){
            // 如果当前栈顶是$，则优先计算
            // while(opeStack.length && s[i]<=opeStack[opeStack.length-1]){
            while(opeStack.length && priority(s[i])<=priority(opeStack[opeStack.length-1])){
                const y = numStack.pop();
                const x = numStack.pop();
                const ope = opeStack.pop();
                if(ope=="$") {
                    numStack.push(3*x+y+2);
                }else{
                    numStack.push(2*x+3*y+4);
                }
            }
            opeStack.push(s[i]);
        }
    }
    return numStack[0];
}
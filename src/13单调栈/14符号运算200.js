/*
题目描述
给定一个表达式，求其分数计算结果。
表达式的限制如下：
所有的输入数字皆为正整数（包括0）
仅支持四则运算（±/*）和括号
结果为整数或分数，分数必须化为最简格式（比如6，3/4，7/8，90/7）
除数可能为0，如果遇到这种情况，直接输出"ERROR"
输入和最终计算结果中的数字都不会超出整型范围
用例输入一定合法，不会出现括号匹配的情况

输入描述
字符串格式的表达式，仅支持±/*，数字可能超过两位，可能带有空格，没有负数
长度小于200个字符

输出描述
表达式结果，以最简格式表达
如果结果为整数，那么直接输出整数
如果结果为负数，那么分子分母不可再约分，可以为假分数，不可表达为带分数
结果可能是负数，符号放在前面
用例
输入	1 + 5 * 7 / 8
输出	43/8
说明	无
输入	1 / (0 - 5)
输出	-1/5
说明	符号需要提到最前面
输入	1 * (3*4/(8-(7+0)))
输出	12
说明	注意括号可以多重嵌套
原文链接：https://blog.csdn.net/banxia_frontend/article/details/135419807
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

const isSum = (x)=>{
    return x>="0" && x<="9";
}
const priority = (x)=>{
    if(x==="+"||x==="-"){
        return 1;
    }else{
        return 2;
    }
}
const calc = (numStack,operateStack)=>{
    const b = numStack.pop();
    const a = numStack.pop();
    const top = operateStack.pop();
    let res = 0;
    switch(top){
        case "+":
            res = a+b;
            break;
        case "-":
            res = a-b;
            break;
        case "*":
            res = a*b;
            break;
        case "/":
            res = a/b;
            break;
    }
//     算好后再入数字栈
    numStack.push(res);
}
// 辗转相除法，求两个数的最大公约数
function getMaxCommonDivisor(x, y) {
    while (y != 0) {
        let tmp = y;
        y = x % y;
        x = tmp;
    }
    return x;
}
// 转化为分数和
const trans = (x)=>{
    let sign = x<0 ? "-" : "";
    x = Math.abs(x);
    if(x && (x+"").includes(".")){
        let cnt = (x+"").split(".")[1].length;
        let mother = Math.pow(10,cnt);
        let son = mother*x;
        let comDivisor = getMaxCommonDivisor(mother,son);
        son /= comDivisor;
        mother /=comDivisor;
        return `${sign}${son}/${mother}`
    }else{
        return x;
    }
}
const getRes = (str)=>{
    // console.log(str);
//     先去空格
    str.replace(/\s/g,"");
    let numStack = [];
    let operateStack = [];
    let num = 0;
    // 1 * (3*4/(8-(7+0)))
    for(let i=0;i<str.length;i++){
        const v = str[i];
        // 判定顺序：数字-操作符-)-(
        if(isSum(v)){
        //     由于数字后可能是操作符，可能是）,因此直接在这里遍历完数字   215-
            let j = i+1;
            num = parseInt(v);
            while(isSum(str[j])){
                num = num*10+parseInt(str[j]);
                j++;
            }
            numStack.push(num);
            // console.log("1:",numStack);
        }else if("+-*/".includes(v)){
            // 注意处理操作符先后问题，如果当前操作符比栈顶操作符（如果栈顶是(则不计算）优先级更低，则要先将栈内计算好
            if(operateStack.length){
                while(operateStack[operateStack.length-1]!=="(" && priority(v)<priority(operateStack[operateStack.length-1])){
                    // 计算栈内数据
                    calc(numStack,operateStack);
                }
            }
            operateStack.push(v);
            // console.log("2:",operateStack)
        }else if(v==")"){
        //     遇到右括号，则循环到左括号计算栈内数据
            // 用while,可能括号内有多个运算符 (7+0-9)
            while(operateStack.length && operateStack[operateStack.length-1]!="("){
                calc(numStack,operateStack);
            }
        //     将(出栈
            operateStack.pop();
            // console.log("3:",operateStack)
        }else if(v=="("){
            // 左括号直接入栈
            operateStack.push(v);
            // console.log("4:",operateStack)
        }
    }
    // console.log("end:",numStack,operateStack);
//     剩下的数字栈只要有2个及以上数字，则循环计算
    while(numStack.length>=2){
        calc(numStack,operateStack);
    }
    return trans(numStack[0]);
}
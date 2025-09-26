/*
题目描述
为了提升数据传输的效率，会对传输的报文进行压缩处理。
输入一个压缩后的报文，请返回它解压后的原始报文。
压缩规则：n[str]，表示方括号内部的 str 正好重复 n 次。
注意 n 为正整数（0 < n <= 100），str只包含小写英文字母，不考虑异常情况。

输入描述
输入压缩后的报文：
1）不考虑无效的输入，报文没有额外的空格，方括号总是符合格式要求的；
2）原始报文不包含数字，所有的数字只表示重复的次数 n ，例如不会出现像 5b 或 3[8] 的输入；

输出描述
解压后的原始报文
注：原始报文长度不会超过1000，不考虑异常的情况

示例1
输入
3[k]2[mn]
输出
kkkmnmn
说明
k 重复3次，mn 重复2次，最终得到 kkkmnmn

示例2
输入
3[m2[c]]

输出
mccmccmcc
说明
m2[c] 解压缩后为 mcc，重复三次为 mccmccmcc

原文链接：https://blog.csdn.net/2301_76543445/article/details/147563753
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const s = await readline();
    console.log(getRes(s));
})();

// 思路：用数字栈和元素栈存数据，取[]中的数据  参考394. 字符串解码
const getRes = (s)=>{
    console.log(s);
    const numStack = [];
    const eleStack = [];
    let isOpen = false;
    let num = "";
    let ele = "";
    const isNum = (x)=>{
        return x>=0 && x<=9;
    }
    for(let i=0;i<s.length;i++){
        const v = s[i];
        if(isNum(v)){
            num +=v;
        }else if(s[i]=="["){
            numStack.push(parseInt(num));
            eleStack.push(ele);
            num = "";
            ele = "";
        }else if(s[i]=="]"){
        //     要开始计算了
            ele = eleStack.pop()+ele.repeat(numStack.pop());
        }else{
            ele += s[i];
        }
    }
    return ele;
}

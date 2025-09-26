/*
题目描述
一个整数可以由连续的自然数之和来表示。

给定一个整数，计算该整数有几种连续自然数之和的表达式，且打印出每种表达式

输入描述
一个目标整数T (1 <=T<= 1000)

输出描述
该整数的所有表达式和表达式的个数。

如果有多种表达式，输出要求为：自然数个数最少的表达式优先输出，每个表达式中按自然数递增的顺序输出，具体的格式参见样例。

在每个测试数据结束时，输出一行”Result:X”，其中X是最终的表达式个数。

用例1
输入
9
输出
9=9
9=4+5
9=2+3+4
Result:3
说明
整数 9 有三种表示方法，第1个表达式只有1个自然数，最先输出，

第2个表达式有2个自然数，第2次序输出，

第3个表达式有3个自然数，最后输出。

每个表达式中的自然数都是按递增次序输出的。

数字与符号之间无空格

用例2
输入
10
输出
10=10
10=1+2+3+4
Result:2
输入490
输出
490=490
490=121+122+123+124
490=96+97+98+99+100
490=67+68+69+70+71+72+73
490=15+16+17+18+19+20+21+22+23+24+25+26+27+28+29+30+31+32+33+34
490=4+5+6+7+8+9+10+11+12+13+14+15+16+17+18+19+20+21+22+23+24+25+26+27+28+29+30+31
Result:6
 */

const rl = require("readline").createInterface({
    input:process.stdin
})
// 思路：循环1-1000，滑窗计算和，和大于等于target时缩小窗口，等于target时记录结果
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const s = await readline();
    let res = getRes(s);
    // 输出结果
    for(let v of res){
        console.log(s+"="+v.join("+"));
    }
    console.log("Result:"+res.length);
})()

const getRes = (s)=>{
    let res = [];
    let left = 1;
    let sum = 0;
    for(let i=1;i<=1000;i++){
        // 如果循环到单个整数都大于target了，则跳出循环
        if(i>s){
            break;
        }
        sum += i;
        while(sum>=s){
            if(sum==s){
                // ！！！直接path数组不要拼接，否则排序会出问题 例96+97+98+99+100和67+68+69+70+71+72+73比较就不对了
                let path = [];
                for(let j=left;j<=i;j++){
                    path.push(j);
                }
                res.push(path);
            }
            sum -= left++;
        }
    }
    // 根据长度升序排序
    res.sort((a,b)=>a.length-b.length);
    return res;
}
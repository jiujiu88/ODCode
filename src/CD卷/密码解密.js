/*
题目描述
给定一段“密文”字符串 s，其中字符都是经过“密码本”映射的，现需要将“密文”解密并输出。
映射的规则（‘a’ ~ ‘i’）分别用（‘1’ ~ ‘9’）表示；（‘j’ ~ ‘z’）分别用（“10*” ~ “26*”）表示。
约束：映射始终唯一。

输入描述
“密文”字符串

输出描述
明文字符串
备注：翻译后的文本长度在100以内
用例
输入	20*19*20*
输出	tst
说明	无
原文链接：https://blog.csdn.net/banxia_frontend/article/details/135030145
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

// 思路：!!注意要倒序，先匹配大的再匹配小的。循环26个字母(1~26)，key为26*~10*,9~1,value为z~a（String.fromCharCode(96+i)）,结果为replaceAll(key,value)
// 例如 20*19*20* 先匹配1-9，变为b0*ai*b0*,然后就匹配不上了。
const getRes = (str)=>{
    // 先匹配大的
    for(let i=26;i>=1;i--){
        let k = i+(i>9?"*":"");
        let val = String.fromCharCode(96+i);
        str = str.replaceAll(k,val);
    }
    return str;
}
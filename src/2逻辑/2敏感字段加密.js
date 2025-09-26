/*
题目描述
给定一个由多个命令字组成的命令字符串：
1、字符串长度小于等于127字节，只包含大小写字母，数字，下划线和偶数个双引号；
2、命令字之间以一个或多个下划线_进行分割；
3、可以通过两个双引号””来标识包含下划线_的命令字或空命令字（仅包含两个双引号的命令字），双引号不会在命令字内部出现；
请对指定索引的敏感字段进行加密，替换为******（6个*），并删除命令字前后多余的下划线_。
如果无法找到指定索引的命令字，输出字符串ERROR。

输入描述
输入为两行，第一行为命令字索引K（从0开始），第二行为命令字符串S。

输出描述
输出处理后的命令字符串，如果无法找到指定索引的命令字，输出字符串ERROR

用例1
输入
1
password__a12345678_timeout_100
输出
password_******_timeout_100

用例2
输入
2
aaa_password_"a12_45678"_timeout__100_""_
输出
aaa_password_******_timeout_100_""

原文链接：https://blog.csdn.net/qq_34143141/article/details/131489270
 */
const rl = require("readline").createInterface({
    input:process.stdin
})
let iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function() {
    const k = parseInt(await readline());
    const str = await readline();
    console.log(getRes(k,str));
}()

// 思路：""中的命令用isOpen标记，每次取!isOpen。
// 提示；什么时候字符是命令字符？ 当遇到不是_或者isOpen时，是命令字(isOpen为是，_也是命令字)
const getRes = (k,str)=>{
    // 加结尾，用来收尾
    str +="_";
    let isOpen = false;
    let res = [];
    let subS = "";
    for(let v of str){
        if(v=='"'){
            isOpen = !isOpen;
        }
        if(isOpen || v!="_"){
            subS +=v;
        }else{
            if(subS!=""){
                res.push(subS);
                subS = "";
            }
        }
    }
    if(k>=0 && k<res.length){
        res[k] = "******";
        return res.join("_");
    }else{
        return "ERROR";
    }
}
/*
题目描述
警察在侦破一个案件时，得到了线人给出的可能犯罪时间，形如“HH:MM” 表示的时刻。
根据警察和线人的约定，为了隐蔽，该时间是修改过的，解密规则为：利用当前出现过的数字，构造下一个距离当前时间最近的时刻，则该时间为可能的犯罪时间。
每个出现数字都可以被无限次使用。

输入描述
形如HH:MM的字符串，表示原始输入

三、输出描述
形如HH:MM的字符串，表示推理出来的犯罪时间。

补充说明
可以保证线人给定的字符串一定是合法的。例如，“01:35”和“11:08”是合法的，“1:35”和“11:8”是不合法的
最近的时刻有可能在第二天

解题思路
我们需要解密一个时间，找到由当前出现过的数字构造的下一个距离当前时间最近的时刻。每个出现的数字可以被无限次使用。
提取可用数字：从输入的时间字符串中提取所有可用的数字。
生成所有可能的时间：利用这些可用数字生成所有可能的合法时间。
找到最近的时间：比较生成的时间与输入的时间，找到距离最近的时间。
原文链接：https://blog.csdn.net/guorui_java/article/details/139703461
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

// 思路:01:35下一个最近时间是01:50，就是解密时间
// 用dfs找到所有可能的时间,排列,可以重复使用数字
const getRes = (str)=>{
//     dfs找4个数的可能组合，需要判断是否是正确时间，找离当前时间最近的即可（换成分钟）
    const n = 4;
    str = str.replace(":","");
    let res  = new Set();
    let path = [];
    let arr = str.split("").sort((a,b)=>a-b);
    const dfs = ()=>{
        if(path.length===n){
            // 有效的时间加入结果
            let h = path.slice(0,2).join("");
            let m = path.slice(2).join("");
            if(h>="00" && h<="24" && m>="00" && m<="60") {
                res.add(path.join(""));
            }
            return;
        }
        for(let i=0;i<n;i++){
            path.push(arr[i]);
            dfs();
            path.pop();
        }
    }
    dfs();
    // 排序
    res = [...res].sort();
    // 找到str在res中的下标，如果刚好是最后一个，那么就取第二天的第一个，否则取idx下一个时间
    let idx = res.indexOf(str);
    let target = "";
    if(idx===res.length-1){
        target = res[0];
    }else{
        target = res[idx+1];
    }
    target = [...target];
    // splice返回值是删除值，因此是空的
    target.splice(2,0,":")
    return target.join("");
}
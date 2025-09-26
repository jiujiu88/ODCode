/*
题目描述：
给定一个非空数组（列表），其元素数据类型为整型，请按照数组元素十进制最低位从小到大进行排序，十进制最低位相同的元素，相对位置保持不变。
当数组元素为负值时，十进制最低位等同于去除符号位后对应十进制值最低位。
输入描述：
给定一个非空数组，其元素数据类型为32位有符号整数，数组长度[1, 1000]

输出描述：
输出排序后的数组

示例1
输入：
1,2,5,-21,22,11,55,-101,42,8,7,32
输出：
1,-21,11,-101,2,22,42,32,5,55,7,8

原文链接：https://blog.csdn.net/qq_34465338/article/details/131327756
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const list = (await readline()).split(",");
    console.log(getRes(list));
})()

// 思路：取元素最后一个字符比较，升序（不用管正负，直接排序后最后一个字符相等的就是保持原位置）
const getRes = (list)=>{
    // console.log(list);
    list.sort((a,b)=>a.at(-1)-b.at(-1));
    return list.join(",");
}
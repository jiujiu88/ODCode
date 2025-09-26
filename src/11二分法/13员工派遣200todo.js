/*
题目描述
某公司部门需要派遣员工去国外做项目。现在，代号为x的国家和代号为y的国家分别需要cntx名和cnty名员工。部门每个员工有一个员工号(1,2,3…)，工号连续，从1开始。部长派遣员工的规则：

规则1、从[1, k]中选择员工派遣出去
规则2、编号为x的倍数的员工不能去x国，编号为y的倍数的员工不能去y国
问题：找到最小的k，使得可以将编号在[1, k]中的员工分配给X国和y国，且满足x国和y国的需求。

输入描述
四个整数 x, y, cntx, cnty。(2 <= x < y <= 30000; x和y一定是质数)

输出描述
满足条件的最小的k

解题思路
问题分析:

我们需要找到一个最小的k，使得在[1, k]范围内有足够的员工可以分配给x国和y国。
编号为x的倍数的员工不能去x国，编号为y的倍数的员工不能去y国。
这意味着我们需要计算在[1, k]范围内有多少员工可以被分配给x国和y国。
关键点:

对于x国，可用的员工是那些编号不是x的倍数的员工。
对于y国，可用的员工是那些编号不是y的倍数的员工。
由于x和y是质数，且x < y，编号为x*y的倍数的员工既不能去x国也不能去y国。
算法选择:

使用二分查找来确定最小的k。
对于每个k，计算可以分配给x国和y国的员工数量，并检查是否满足需求。
*/

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const n = parseInt(await readline());
    const weights = (await readline()).split(" ").map(Number);
    console.log(getRes(weights,n))
}()

// 思路:
const getRes = (weights,n)=>{

}

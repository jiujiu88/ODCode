/*
题目描述
VLAN 是一种对局域网设备进行逻辑划分的技术，为了标识不同的VLAN，引入 VLAN ID（1-4094之间的整数）的概念。
定义一个 VLAN ID 的资源池（下称VLAN资源池），资源池中连续的VLAN用 开始VLAN-结束VLAN 表示，不连续的用单个整数表示，所有的VLAN用英文逗号连接起来。
现在有一个VLAN资源池，业务需要从资源池中申请一个VLAN，需要你输出从VLAN资源池中移除申请的VLAN后的资源池。

输入描述
第一行为字符串格式的VLAN资源池
第二行为业务要申请的VLAN，VLAN 的取值范围为 [1，4094] 之间的整数。

输出描述
从输入VLAN资源池中移除申请的VLAN后字符串格式的VLAN资源池，输出要求满足题目描述中的格式，并且按照VLAN从小到大升序输出。
如果申请的VLAN不在原VLAN资源池内，输出原VLAN资源池升序排序后的字符串即可。
备注
输入VLAN资源池中VLAN的数量取值范围为 [2-4094] 间的整数，资源池中VLAN不重复且合法（[1,4094]之间的整数），输入是乱序的

输入
1-5
2
输出
1,3-5
说明
VLAN资源池中有 1、2、3、4、5，移除2后，剩下 1、3、4、5，升序后的结果为1,3-5。

输入
5,1-3
10
输出
1-3,5
说明
资源池中有VLAN 1、2、3，5，而申请的VLAN 10不在原资源池中，按照格式并按升序排序后输出的结果为1-3,5。

原文链接：https://blog.csdn.net/wtswts1232/article/details/145517130
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(",");
    const apply = parseInt(await readline());
    console.log(getRes(arr,apply));
})()

// 思路：
const getRes = (arr,apply)=>{
    console.log(arr,apply);

}
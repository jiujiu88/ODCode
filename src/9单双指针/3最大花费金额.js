/*
题目描述
双十一众多商品进行打折销售，小明想购买自己心仪的一些物品，但由于受购买资金限制，所以他决定从众多心仪商品中购买三件，而且想尽可能的花完资金。
现在请你设计一个程序帮助小明计算尽可能花费的最大资金数额。---三数之和

输入描述
输入第一行为一维整型数组M，数组长度小于100，数组元素记录单个商品的价格，单个商品价格小于1000。
输入第二行为购买资金的额度R，R小于100000。
输入格式是正确的，无需考虑格式错误的情况。
输出描述
输出为满足上述条件的最大花费额度。
如果不存在满足上述条件的商品，请返回-1。
用例1
输入
23,26,36,27
78
输出
76
说明
金额23、26和27相加得到76，而且最接近且小于输入金额78。

用例1
输入
23,30,40
26
输出
-1
说明
因为输入的商品，无法组合出来满足三件之和小于26.故返回-1。
 */

const rl = require("readline").createInterface({
    input :process.stdin
})
const iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const arr = (await readline()).split(",").map(Number);
    const r = parseInt(await readline());
    console.log(getRes(arr,r));
})()

// 思路：升序排序，双指针，参考三数之和，循环数据，固定一个数，二三个数从剩下的数组种用双指针确认，<=0时记录结果，left右移找更大的结果，否则right左移
const getRes = (arr,r)=>{
    // 先升序排序
    arr.sort((a,b)=>a-b);
    let res = -1;
    // i为第一个数，left为第二个数，right为第三个数，尽量找比较大的
    for(let i=0;i<arr.length-2;i++){
        let left = i+1,right = arr.length-1;
        while(left<right){
            let sum = arr[i]+arr[left]+arr[right];
        //     找更大的结果，right右移
            if(sum<=r){
                res = Math.max(res,sum);
                left++;
            }else{
                // 找更小的结果，right左移
                right--;
            }
        }
    }
    return res;
}

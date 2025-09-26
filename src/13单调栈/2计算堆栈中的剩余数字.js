/*
题目描述
向一个空栈中依次存入正整数，假设入栈元素 n(1<=n<=2^31-1)按顺序依次为 nx…n4、 n3、n2、 n1, 每当元素入栈时，
如果 n1=n2+…+ny(y 的范围[2,x]， 1<=x<=1000)，则 n1~ny 全部元素出栈，重新入栈新元素 m(m=2*n1)。
如：依次向栈存入 6、 1、 2、 3, 当存入 6、 1、 2 时，栈底至栈顶依次为[6、 1、 2]；
当存入 3时， 3=2+1， 3、 2、 1 全部出栈，重新入栈元素 6(6=2*3)，此时栈中有元素 6；
因为 6=6，所以两个 6 全部出栈，存入 12，最终栈中只剩一个元素 12。

输入描述
使用单个空格隔开的正整数的字符串，如”5 6 7 8″，
左边的数字先入栈，输入的正整数个数为 x， 1<=x<=1000。

输出描述
最终栈中存留的元素值，元素值使用空格隔开，如”8 7 6 5″， 栈顶数字在左边。 6 1 2 3

输入
5 10 20 50 85 1
输出
1 170

输入
6 7 8 13 9
输出
9 13 8 7 6

输入
1 2 5 7 9 1 2 2
输出
4 1 9 14 1

原文链接：https://blog.csdn.net/u010049474/article/details/146779457
 */

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const list = (await readline()).split(" ").map(Number);
    console.log(getRes(list));
})();

// 思路: 栈  遍历数组将当前元素入栈(push)，此时将栈内元素倒序，从栈顶依次取，计算与当前元素的差值，如果差值为0，则遍历到的元素全部出栈。
// 再将2*n入栈(push)，此时的入栈也要走一遍上面的流程，用递归处理
const getRes = (list)=>{
    // console.log(list);
    // 入栈时处理逻辑，如果栈顶到栈内元素的和与当前入栈元素一样，则将栈内元素出栈。
    const pushStack = (stack,v)=>{
        let diff = v;
        for(let i=stack.length-1;i>=0;i--){
            diff -=stack[i];
            if(diff===0){
                // 将遍历到的元素都出栈
                stack.splice(i);
                // 将2v入栈
                pushStack(stack,2*v);
                break;
            }
            // 剪枝，差值都小于0了，再减下去更小，不可能相等了，退出
            if(diff<0){
                break;
            }
        }
        // 如果没有匹配上，则直接入栈
        if(diff!==0){
            stack.push(v);
        }
    }
    // 从开始一直入栈
    let stack = [list[0]];
    for(let i=1;i<list.length;i++){
        pushStack(stack,list[i])
    }
    return stack.reverse().join(" ");
}
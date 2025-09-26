/*
题目描述:
某农场主管理了一大片果园，fields[i]表示不同果林的面积，单位:(m^2)，
现在要为所有的果林施肥且必须在n天之内完成，否则影响收成。
小布是果林的工作人员，他每次选择一片果林进行施肥，且一片果林施肥完后当天不再进行施肥作业。
假设施肥机的能效为k，单位:(m^2lday)，请问至少租赁能效k为多少的施肥机才能确保不影响收成?
如果无法完成施肥任务，则返回-1。
输入描述:
第一行输入为m和n,
m表示 fields 中的元素个数，
n表示施肥任务必须在n天内(含n天)完成;
第二行输入为fields,fields[i]表示果林i的面积，单位:(m^2)对于每组数据
输出描述
输出最小施肥机的能效k，无多余空格。
补充说明:
1 <= fields.length <= 10^41 <=n<=10^91<= fieldsil<=10^9
*/

const rl = require("readline").createInterface({
    input : process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void async function(){
    const [m,n] = (await readline()).split(" ").map(Number);
    const fields = (await readline()).split(" ").map(Number);
    console.log(getRes(m,n,fields))
}()

// 思路:同2悟空 check二分  用check方法计算能效k，求最小的limit
const getRes = (m,n,fields)=>{
    if(m>n) return -1;
    let left = 1,right = Math.max(...fields);
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(check(fields,n,mid)){
            right = mid - 1;
        }else{
            left = mid + 1;
        }
    }
    return left;
}

const check = (fields,n,target)=>{
    let needDays = 0;
    for(let v of fields){
        needDays += Math.ceil(v/target);
    }
    return needDays<=n;
}

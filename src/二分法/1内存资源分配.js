/*
有一个简易内存池，内存按照大小粒度分类，每个粒度有若干个可用内存资源，用户会进行一系列内存申请，需要按需分配内存池中的资源返回申请结果成功失败列表。
分配规则如下：
分配的内存要大于等于内存的申请量，存在满足需求的内存就必须分配，优先分配粒度小的，但内存不能拆分使用；
需要按申请顺序分配，先申请的先分配。
有可用内存分配则申请结果为true，没有可用则返回false。
注意：不考虑内存释放
输入描述
输入为两行字符串：
第一行为内存池资源列表，包含内存粒度数据信息，粒度数据间用逗号分割，一个粒度信息内用冒号分割，冒号前为内存粒度大小，冒号后为数量
资源列表不大于1024
每个粒度的数量不大于4096
第二行为申请列表，申请的内存大小间用逗号分割
申请列表不大于100000
如
64:2,128:1,32:4,1:128
50,36,64,128,127
输出描述
输出为内存池分配结果
如：
true,true,true,false,false
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const sourceList = (await readline()).split(",").map((v=>v.split(":").map(Number)));
    // ！！！申请内存可能存在空值，需去重
    const applyList = (await readline()).split(",").filter(v=>v).map(Number);
    console.log(getRes(sourceList,applyList));
})()

// 思路：二分法 资源排序，通过二分法找到符合条件的资源下标，减去消耗数量，记录结果。
// 方法一：数量为0用arr.splice(i,1)删除
const getRes = (sourceList,applyList)=>{
    let res = [];
//     先将资源按照内存大小升序
//     [ [ 1, 128 ], [ 32, 4 ], [ 64, 2 ], [ 128, 1 ] ]
//     50,36,64,128,127
    sourceList.sort((a,b)=>a[0]-b[0]);
//     然后遍历申请表，用二分法寻找资源
    for(let v of applyList){
        let idx = search(sourceList,v);
        // 如果找到最后面说明没有符合得了，返回false
        if(idx==sourceList.length){
            res.push(false);
        }else{
            // 找到之后减去消耗的数量
            sourceList[idx][1]--;
            // 数量为0则删除
            if (sourceList[idx][1] == 0) {
                sourceList.splice(idx,1);
            }
            res.push(true);
        }
    }
    return res.join(",");
}

const search = (arr,target)=>{
    let left = 0,right = arr.length-1;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(arr[mid][0]>=target){
            right = mid-1;
        }else{
            left = mid+1;
        }
    }
    return left;
}

// 方法二： 如果插入位置数量为0，继续右移找更大内存
const getRes1 = (sourceList,applyList)=>{
    let res = [];
//     先将资源按照内存大小升序
//     [ [ 1, 128 ], [ 32, 4 ], [ 64, 2 ], [ 128, 1 ] ]
//     50,36,64,128,127
    sourceList.sort((a,b)=>a[0]-b[0]);
//     然后遍历申请表，用二分法寻找资源
    for(let v of applyList){
        let idx = binarySearch(sourceList,v);
        // 如果找到最后面说明没有符合得了，返回false
        if(idx==sourceList.length){
            res.push(false);
        }else{
            // 找到之后减去消耗的数量
            sourceList[idx][1]--;
            res.push(true);
        }
    }
    return res.join(",");
}

const binarySearch = (arr,target)=>{
    let left = 0,right = arr.length-1;
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(arr[mid][0]>=target){
            right = mid-1;
        }else{
            left = mid+1;
        }
    }
    // 如果资源不够了，那么结果右移，直到找到下一个大的内存,!!!注意边界条件，先判断left边界再判断内存数量，否则arr[left]会越界
    while(left<=arr.length-1 && arr[left][1]<=0){
        left +=1;
    }
    return left;
}
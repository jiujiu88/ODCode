var maxArea = function(height) {
    // 双指针
    let left = 0;
    let right = height.length-1;
    let res = 0;
    while(left<=right){
        res = Math.max(res,(right-left)*Math.min(height[left],height[right]))
        // 如果左边比较短，则移动左边，保持右边长的，寻找可能更长的可能性
        if(height[left]<height[right]){
            left++;
        }else{
            right--;
        }
    }
    console.log(res);
};
// var maxArea = function(height) {
//     // 找到x*y最大
//     let res = 0;
//     for(let i=0;i<height.length-1;i++){
//         for(let j=i+1;j<height.length;j++){
//             res = Math.max(res,(j-i)*Math.min(height[i],height[j]));
//         }
//     }
//     return res;
// };
maxArea([1,8,6,2,5,4,8,3,7])

// 930 前缀和
var numSubarraysWithSum = function(nums, goal) {
    let sum = 0;
    let cnt = new Map();
    let res = 0;
    // [1,0,1,0,1]
    // [0,1,1,2,2,3]

    for(let v of nums){
        cnt.set(sum,(cnt.get(sum)||0)+1);
        sum += v;
        res += cnt.get(sum-goal)||0;
    }
    return res;
};
console.log(numSubarraysWithSum([1,0,1,0,1],2))

// 3306
var countOfSubstrings = function(word, k) {
    // 哈希改为数组 双滑窗合并为一个
    let res = 0;
    let left1=0,left2=0;
    let obj1 = {"a":0,"o":0,"e":0,"i":0,"u":0},obj2 = {"a":0,"o":0,"e":0,"i":0,"u":0};
    let other1 = 0,other2 = 0;
    for(let i=0;i<word.length;i++){
        obj1[word[i]]!=undefined ? obj1[word[i]]++ : other1++;
        while(Object.values(obj1).every(v=>v>0) && other1>=k){
            obj1[word[left1]]!=undefined ? obj1[word[left1]]-- : other1--;
            left1++;
        }
        obj2[word[i]]!=undefined ? obj2[word[i]]++ : other2++;
        while(Object.values(obj2).every(v=>v>0) && other2>=k+1){
            obj2[word[left2]]!=undefined ? obj2[word[left2]]-- : other2--;
            left2++;
        }
        res +=left1-left2;
    }
    return res;
};
console.log(countOfSubstrings("aeiou",0))

// 2537
var countGood = function(nums, k) {
    // 越长越合法
    let res = 0;
    let left = 0;
    let map = new Map();
    // 记录整数有x个时，有多少对下标满足i < j 且 arr[i] == arr[j]
    let cnt = new Map();
    let sum = 0;
    for(let i=0;i<nums.length;i++){
        let oldSum = cnt.get(nums[i])||0;
        // 记录不同整数的个数
        map.set(nums[i],(map.get(nums[i])||0)+1);
        // 记录不同整数满足条件的下标对数
        cnt.set(nums[i],map.get(nums[i])>=2? map.get(nums[i])*(map.get(nums[i])-1)/2 : 0);
        sum += cnt.get(nums[i])-oldSum;
        while(sum>=k){
            let oldSum1 = cnt.get(nums[left])||0;
            map.set(nums[left],(map.get(nums[left])||0)-1);
            cnt.set(nums[left],map.get(nums[left])>=2? map.get(nums[left])*(map.get(nums[left])-1)/2 : 0);
            sum += cnt.get(nums[left])-oldSum1;
            left++;
        }
        res +=left;
    }
    return res;
};

console.log(countGood([3,1,4,3,2,2,4],2))

// 1438
var longestSubarray = function(nums, limit) {
    let res = 0;
    let l = 0;
    // 单调队列 维护最大最小值 max为单调递减队列，头部为最大值;min为单调递增队列，头部是最小值
    let max = [nums[0]];
    let min = [nums[0]];
    for(let r=0;r<nums.length;r++){
        // 8 7 5   6加入 先去掉5 然后加入
        while(max.length>0 && nums[r]>max[max.length-1]){
            max.pop();
        }
        max.push(nums[r]);
        // min单调递增  1 3 4 6  2加入 先去掉6 4 3
        while(min.length>0 && nums[r]<min[min.length-1]){
            min.pop();
        }
        min.push(nums[r]);
        // 如果最大最小值相差大于limit，left指针右移
        while(max[0]-min[0]>limit){
            // l指针需移出队列
            if(max[0]==nums[l]){
                max.shift();
            }
            if(min[0]==nums[l]){
                min.shift();
            }
            l++;
        }
        // 记录结果
        res = Math.max(res,r-l+1);
    }
    return res;
};
console.log(longestSubarray([10,1,2,4,7,2],5))

// 344
var reverseString = function(s) {
    // 相向双指针 左右两端往中间靠拢 用数组的解构赋值
    let r = s.length;
    let l = -1;
    // 05 14 23
    while(l++<r--){
        [s[l],s[r]] = [s[r],s[l]];
    }
    return s;
};
console.log(reverseString(["H","a","n","n","a","h"]))

// 1750
var minimumLength = function(s) {
    // 相向双指针
    s = [...s]
    let left = 0;
    let right = s.length-1;
    while(left<=right && s[left]===s[right]){
        let base = s[left];
        while(left<=right && s[left]==base){
            left++;
        }
        while(left<=right && s[right]==base){
            right--;
        }
    }
    return right-left+1;
};
console.log(minimumLength("cabaabac"))

// 2105
var minimumRefill = function(plants, capacityA, capacityB) {
    // 双指针
    let res = 0;
    let left = 0;
    let right = plants.length-1;
    let remainA = capacityA;
    let remainB = capacityB;
    while(left<=right){
        // 先判断是否需要重新装水
        while((left!=right || (left==right && remainA>=remainB)) && remainA<plants[left]){
            res++;
            remainA +=capacityA;
        }
        while((left!=right || (left==right && remainA<remainB)) && remainB<plants[right]){
            res++;
            remainB +=capacityB;
        }
        // A和B分别浇水
        // 同一株植物
        if(left==right){
            if(remainA>=remainB){
                remainA -=plants[left++];
            }else{
                remainB -=plants[right--];
            }
        }else{
            // A、B分别给不同植物浇水
            remainA -=plants[left++];
            remainB -=plants[right--];
        }
    }
    return res;
};
console.log(minimumRefill([726,739,934,116,643,648,473,984,482,85,850,806,146,764,156,66,186,339,985,237,662,552,800,78,617,933,481,652,796,594,151,82,183,241,525,221,951,732,799,483,368,354,776,175,974,187,913,842],1439,1207))

var fourSum = function(nums, target) {
    // 排序+双指针
    nums.sort((a,b)=>a-b);
    let a = 0;
    let d = nums.length-1;
    let res = [];
    // -2 -1 0 0 1 2
    // 循环外侧的两个数
    // -3 -1 0 2 4 5
    while(a<d){
        let b=a+1;
        let c=d-1;
        let sum = 0;
        // 固定外面左右两侧的数，循环中间的两个数
        while(b<c){
            sum = nums[a]+nums[b]+nums[c]+nums[d];
            if(sum>target){
                c--;
            }else if(sum<target){
                b++;
            }else{
                res.push([nums[a],nums[b],nums[c],nums[d]]);
                // 去重
                while(nums[b]==nums[b+1]) b++;
                while(nums[d]==nums[d-1]) d--;
                b++;
                c--;
            }
        }
        // 去重
        if(nums[a]==nums[a+1]) a++;
        if(nums[d]==nums[d-1]) d--;
        // 里面记录完成后，接着查看sum的结果，来判断外层左移还是右移
        if(sum>target){
            d--;
        }else if(sum<target){
            a++;
        }else{
            a++;
            d--;
        }
    }
    return res;
};
console.log(fourSum([-3,-1,0,2,4,5],2))

// var sortArrayByParityII = function(nums) {
//     let i = 0;
//     for(let v of nums){
//         // 如果是偶数，赋值给偶数下标
//         if(v%2==0){
//             nums[i] = v;
//             i+=2;
//         }
//     }
//     let j = 1;
//     for(let v of nums){
//         // 如果是奇数，赋值给奇数下标
//         if(v%2!=0){
//             nums[j] = v;
//             j+=2;
//         }
//     }
//     return nums;
// };
// console.log(sortArrayByParityII([4,2,5,7]))

var binarySearch = function(nums,target){
    let left = 0,right = nums.length-1;
    while(left<=right){
        let mid = (left+right)>>1;
        if(nums[mid]>target){
            right = mid-1;
        }else{
            left = mid+1;
        }
    }
    return left;
}
console.log(binarySearch([1,4],4))

var countFairPairs = function(nums, lower, upper) {
    // 0 1 4 4 5 7
    nums.sort((a,b)=>a-b);
    // 小于等于upper的数目-小于等于lower-1的数组
    return getRes(nums,upper)-getRes(nums,lower-1);
};

var getRes = function(nums,target){
    let n = nums.length,res = 0;
    for(let i=0;i<n;i++){
        // 快速找到target-nums[i]的元素的最后一个下标，即target-nums[i]+1的下标-1
        let right = binarySearch(nums,target-nums[i]+1)-1;
        // right指针要在左指针i的右边
        if(right>i){
            res+=right-i;
        }
    }
    return res;
}
console.log(countFairPairs([0,0,0,0,0,0],0,0))

var TimeMap = function() {
    this.map = {};
};

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function(key, value, timestamp) {
    if(!this.map[key]){
        this.map[key] = {};
    }
    this.map[key][timestamp] = value;
};
// {"foo":{1:"bar",4:"bar2"}}
/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function(key, timestamp) {
    if(!this.map[key]){
        return "";
    }else{
        let list = Object.keys(this.map[key]);
        // 找到目标timestamp在数组中的位置
        let idx = binarySearch(list,timestamp);
        if(idx>0){
            idx = idx-1;
        }else{
            return "";
        }
        var time = list[idx];
        if(this.map[key][time]!=undefined){
            return this.map[key][time];
        }else{
            return "";
        }
    }
};

var obj = new TimeMap()
// obj.set("foo", "bar", 1)
// console.log(obj.get("foo", 1))
// console.log(obj.get("foo", 3))
// obj.set("foo", "bar2", 4)
// console.log(obj.get("foo", 4))
// console.log(obj.get("foo", 5))
obj.set("love","high",10)
obj.set("love","low",20)
console.log("---",obj.get("love",5))
// console.log(obj.get("love",10))
console.log(obj.get("love",15))
// console.log(obj.get("love", 20))
// console.log(obj.get("love", 25))


var minEatingSpeed = function(piles, h) {
    // 没堆香蕉可以分次吃 最少1根，最多则是最多的香蕉（每次最多一堆，不会再吃第二堆） 开区间
    let left = 0,right = Math.max(...piles);
    function check(target){
        let needH = 0;
        for(let v of piles){
            // 计算每一堆需要吃几小时,统计所有时间
            needH+= Math.ceil(v/target);
        }
        return needH<=h;
    }
    while(left+1<right){
        let mid = Math.floor((left+right)/2);
        if(check(mid)){
            right = mid;
        }else{
            left = mid;
        }
    }
    return right;
};
console.log(minEatingSpeed([10,10,10,10],4))

function strstr(source,target) {
    // 先将target分组，变为层级
    let level = [];
    // set用来保存[]中的值
    let set = new Set();
    // 用来判断是否是[]中的字符
    let isOpen = false;
    for (let v of target) {
        if (v == "[") {
            isOpen = true;
        } else if (v == "]") {
            level.push(set);
            set = new Set();
            isOpen = false;
        } else {
            if (isOpen) {
                set.add(v);
            } else {
                level.push(v);
            }
        }
    }
    return level;
}
console.log(strstr("abc","[a]bc"))

var threeSum = function(nums) {
    // 排序后，用相向双指针，先固定一个数x，另外两个数用相向双指针得到target-x
    let res = [];
    nums.sort((a,b)=>a-b);
    const n = nums.length;
    for(let i=0;i<n-2;i++){
        let x = nums[i];
        // 去重 如果和上一个数一样，跳过
        if(i>0 && x==nums[i-1]){
            continue;
        }
        // 剪枝 如果x和最小的两个数相加>0，则直接break，因为后面的数之和更大不可能=0了
        // if(x+nums[i+1]+nums[i+2]>0){
        //     break;
        // }
        // // 如果x和最大的两个数相加<0，说明这个x太小了，继续找下一个x
        // if(x+nums[n-2]+nums[n-1]<0){
        //     continue;
        // }
        let left = i+1;
        let right = n-1;
        while(left<right){
            let sum = x+nums[left]+nums[right];
            // 剪枝
            if(sum>0)
                if(sum>0){
                    right--;
                }else if(sum<0){
                    left++;
                }else{
                    res.push([x,nums[left],nums[right]]);
                    // 找到结果之后移动左右指针
                    left++;
                    right--;
                    // 去重 如果和上一个数一样，找下一个数
                    while(left<right && nums[left]==nums[left-1]) left++;
                    while(left<right && nums[right]==nums[right+1]) right--;
                }
        }
    }
    return res;
};
// console.log(threeSum([-1,0,1,2,-1,-4]))

var test1111 = function(height) {
    // 相向双指针 每个柱子可以接水的高度取决于前缀最大值和后缀最大值，如果前缀最大值更小，那么就是短板，则可以计算接水数，然后移动指针
    const n = height.length;
    let res = 0;
    let left = 0,right = n-1;
    let preMax = 0,sufMax = 0;
    // 左右指针一定是在最高峰相遇不会接水所以不用=，因为每次都是移动短板，最终到更高的柱子
    while(left<right){
        if(height[left]<height[right]){
            preMax = Math.max(preMax,height[left]);
            res +=preMax-height[left];
            left++;
        }else{
            sufMax = Math.max(sufMax,height[right]);
            res +=sufMax-height[right];
            right--;
        }
    }
    return res;
};
console.log(test1111([0,1,0,2,1,0,1,3,2,1,2,1]))
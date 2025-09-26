const rl = require("readline").createInterface({
    input:process.stdin
})
/*
给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
返回容器可以储存的最大水量。
说明：你不能倾斜容器。
输入：[1,8,6,2,5,4,8,3,7]
输出：49
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
示例 2：
输入：height = [1,1]
输出：1
 */
// 思路： 双指针 每次都保留更长的木板，这样盛水更多，移动短板
rl.on("line",line=>{
    let height = JSON.parse(line);
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
})

// 暴力超时
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
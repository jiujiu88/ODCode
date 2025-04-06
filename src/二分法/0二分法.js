const rl = require("readline").createInterface({
    input :process.stdin
})
// 有序 无重复元素
// 二分查找算法如果最终找不到目标值位置，那么最后L指针的位置其实就是目标值target的有序插入位置。
// 有序插入位置
let lines = []
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==2) {
        let nums = JSON.parse(lines[0]);
        let target = parseInt(lines[1]);
        const binarySearch = (nums,target)=>{
            // 左闭右闭，此时l可以等于r ，例如[1]
            let l = 0, r = nums.length-1;
            while (l <= r) {
                let mid = Math.floor((r+l) / 2);
                if (nums[mid] == target) {
                    return mid;
                } else {
                    if (nums[mid] > target) {
                        // 右闭，所以取比middle小的
                        r = mid-1;
                    } else {
                        l = mid+1;
                    }
                }
            }
            // 有序插入位置 为了避免和正常索引（正数产生冲突，返回-l-1）
            return -l-1;
        //     如果没找到直接返回-1
        //     return -1;
        }
        // 测试是否可以找到target  用return -1
        console.log(binarySearch(nums, target));
        // 测试有序插入位置
        // const target = 4;
        // const arr = [1, 3, 5, 7, 9, 11, 13];
        const idx = binarySearch(nums, target);
        // 可以根据idx是否小于0来判断，是正好找到mid了，还是没有找到相同的数，只能插入l下标
        if (idx < 0) {
            console.log(-idx - 1);
        }
        lines.length = 0;
    }

})

// 左闭右开，此时l不能等于r ，例如[1]
/*let l = 0, r = nums.length;
while (l < r) {
    let mid = Math.floor((r+l) / 2);
    if (nums[mid] == target) {
        console.log(mid);
        return;
    } else {
        if (nums[mid] > target) {
            // 右开，所以直接取middle
            r = mid;
        } else {
            l = mid+1;
        }
    }
}*/


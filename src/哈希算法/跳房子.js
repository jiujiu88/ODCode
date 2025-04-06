const rl = require("readline").createInterface({
    input :process.stdin
})
/*
题目描述
跳房子，也叫跳飞机，是一种世界性的儿童游戏。
游戏参与者需要分多个回合按顺序跳到第1格直到房子的最后一格。
跳房子的过程中，可以向前跳，也可以向后跳。
假设房子的总格数是count，小红每回合可能连续跳的步教都放在数组steps中，请问数组中是否有一种步数的组合，可以让小红两个回合跳到量后一格?
如果有，请输出索引和最小的步数组合。
输入[-1,2,4,9,6]
8
输出[-1,9]
 */
const lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==2){
        const nums = JSON.parse(lines[0]);
        const target = parseInt(lines[1]);
        let map = new Map();
        let res = [];
        for(let i=0;i<nums.length;i++){
            if(map.has(target-nums[i])){
                if((res.length && res[0]+res[1]>i+map.get(target-nums[i])) || res.length==0){
                    res = [map.get(target-nums[i]),i];
                }
            }
            map.set(nums[i],i);
        }
        console.log([nums[res[0]],nums[res[1]]]);
        /*
        const nums = JSON.parse(lines[0]);
        const sum = parseInt(lines[1]);
        let map = new Map();
        let res = [];
        let min = Infinity;
        for(let i=0;i<nums.length;i++){
            if(map.has(sum-nums[i])){
                if((i+map.get(sum-nums[i])<min) || res.length==0){
                    res = [nums[i],sum-nums[i]];
                    min = i+map.get(sum-nums[i]);
                }
            }
            // 如果当前索引更小，则用当前索引
            if(map.has(nums[i])){
                if(i<map.get(nums[i])) {
                    map.set(nums[i], i);
                }
            }else{
                map.set(nums[i],i);
            }

        }
        console.log(res,map);
         */
        lines.length=0;
    }
})

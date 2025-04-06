/*
小明负责公司年会，想出一个趣味游戏：
屏幕给出 1 ~ 9 中任意 4 个不重复的数字，大家以最快时间给出这几个数字可拼成的数字从小到大排列位于第 N 位置的数字，其中 N 为给出数字中最大的（如果不到这么多数字则给出最后一个即可）。
注意：
2 可以当作 5 来使用，5 也可以当作 2 来使用进行数字拼接，且屏幕不能同时给出 2 和 5；
6 可以当作 9 来使用，9 也可以当作 6 来使用进行数字拼接，且屏幕不能同时给出 6 和 9。
如给出：1，4，8，7，则可以拼接的数字为：
1，4，7，8，14，17，18，41，47，48，71，74，78，81，84，87，147，148，178 ... (省略后面的数字)
那么第 N （即8）个的数字为 41。
输入描述
输入以逗号分隔的 4 个 int 类型整数的字符串。
输出描述
输出为这几个数字可拼成的数字从小大大排列位于第 N （N为输入数字中最大的数字）位置的数字，
如果输入的数字不在范围内或者有重复，则输出-1。
输入	1,4,8,7
输出	41
说明
可以构成的数字按从小到大排序为：
1，4，7，8，14，17，18，41，47，48，71，74，78，81，84，87，147，148，178  ... （省略后面的数字），
故第8个为41
 */
//全排列
const rl = require("readline").createInterface({
    input:process.stdin
})
rl.on("line",line=>{
    let nums = line.split(",").map(Number);

    console.log(getRes(nums));
})

function getRes(nums){
    let n = Math.max(...nums);
    let set = new Set(nums);
    // 输入有重复，输入同时包含25/69,超过边界，返回-1
    if(set.size!=4 || (nums.includes(2) && nums.includes(5)) || (nums.includes(6) && nums.includes(9)) || n>9 || Math.min(...nums)<1) return -1;
    let used = new Array(nums.length).fill(false);
    let res = [];
    let path = [];
    let map = new Map([[2,5],[5,2],[6,9],[9,6]]);
    dfs(used,path,res,nums,map);
    // 对全排列结果排序
    res.sort((a,b)=>a-b);
    return res.length>n?res[n-1]:res.length;
}

function dfs(used,path,res,nums,map){
    if(path.length>0) {
        res.push(path.join(""));
    }
    for(let i=0;i<nums.length;i++){
        if(used[i]) continue;
        used[i] = true;
        path.push(nums[i]);
        dfs(used);
        path.pop();
        //     25、69可以互相使用  但是3978 只能出现 63 67 68 不能出现69（只能替换，不能多用）
        if(map.has(nums[i])){
            path.push(map.get(nums[i]));
            dfs(used,path,res,nums,map);
            path.pop();
        }
        used[i] = false;
    }
    return res;
}

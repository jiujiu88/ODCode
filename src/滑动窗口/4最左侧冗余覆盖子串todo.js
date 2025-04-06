/*
给定两个字符串 s1 和 s2 和正整数 k，其中 s1 长度为 n1，s2 长度为 n2。
在 s2 中选一个子串，若满足下面条件，则称 s2 以长度 k 冗余覆盖 s1
该子串长度为 n1 + k
该子串中包含 s1 中全部字母
该子串每个字母出现次数不小于 s1 中对应的字母
给定 s1，s2，k，求最左侧的 s2 以长度 k 冗余覆盖 s1 的子串的首个元素的下标，如果没有返回-1。
输入描述
输入三行，第一行为 s1，第二行为 s2，第三行为 k
s1 和 s2 只包含小写字母
输出描述
最左侧的 s2 以长度 k 冗余覆盖 s1 的子串首个元素下标，如果没有返回 -1。
输入
ab
aabcd
1
输出	0
输入
abc
dfs
10
输出	-1
输入
dbe
aadcdbce
2
输出3
 */
const rl = require("readline").createInterface({
    input:process.stdin
})
const lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==3){
        let s1 = lines[0];
        let s2 = lines[1];
        let n1 = s1.length;
        let n2 = s2.length;
        let k = parseInt(lines[2]);
        if(n2<n1+k){
            console.log(-1)
            return;
        }
        let map = {};
        for(let v of s1){
            map[v]?map[v]++:map[v]=1;
        }
        // 快慢指针
        let l = 0,r = 0;
        // 覆盖个数
        let count = 0;
        while(l<=r && r<n2){
            let v = s2[r];
            if(map[v]!=undefined && map[v]-- >0){
                count++;
            }
            if(count==n1){
                console.log(l);
                return;
            }
            if(r-l+1==n1+k){
                let x = s2[l];
                if(map[x]!=undefined && map[x]++ >0){
                    count--;
                }
                l++;
            }
            r++;
        }
        console.log(-1)
    }
})

/*
const rl = require("readline").createInterface({
    input:process.stdin
})
const lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==3){
        const [s1,s2] = [lines[0],lines[1]];
        const k = parseInt(lines[2]);
        const n1 = s1.length;
        const n2 = s2.length,len = n1+k;
        console.log(n1,n2,len);
        console.log(getIndex(s1,s2,k));
        lines.length = 0;
    }
})

function getIndex(s1,s2,k){
    //2972 2728 2813
    const n1 = s1.length,n2 = s2.length,len = n1+k;
    // 如果s2的长度都比目标长度短，直接返回-1
    if(n2<len) return -1;
    // 计算出现次数，用map
    let map = new Map();
    // 先计算s1中的全部字母出现次数
    for(let v of s1){
        map.set(v,(map.get(v)||0)+1);
    }
    // return map
    let resMap = new Map();
    // 要求目标长度为len、满足s1的字母出现次数 定长 入-更新-出
    for(let i=0;i<n2;i++){
        // 入
        resMap.set(s2[i],(resMap.get(s2[i])||0)+1);
        if(i+1<len) continue;
        return resMap
        // 更新结果--左侧下标为i-len+1
        // if(check(map,resMap)){
        //     return i-len+1;
        // }
        // 出
        // resMap.set(s2[i-len+1],resMap.get(s2[i-len+1])-1);
    }
    // 如果前面没有返回，最后返回-1
    return -1;
}

function check(map1,map2){
    // map2中出现的字母数量必须大于等于map1的字母数量
    if(map1.size>map2.size){
        return false;
    }
    for(let [k,v] of map1){
        // 如果map2中没有map1中的字母或者出现次数更少，返回false
        if(!map2.has(k) || map2[k]<v){
            return false;
        }
    }
    return true;
} */
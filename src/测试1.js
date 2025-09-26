const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async ()=>{
    const arr1 = (await readline()).split(";").map(v=>v.split(","));
    const arr2  = (await readline()).split(";").map(v=>v.split(","));
    getRes(arr1,arr2);
})()

const getRes = (arr1,arr2)=>{
    // console.log(arr1,arr2)
//     用map记录
    // 记录课程1的学号和成绩
    let map1 = new Map();
    // 记录课程2的学号和成绩
    let map2 = new Map();
    // 记录班级和修2门课的学生学号
    let banjiMap = new Map();
    // key为学号，value为成绩
    for(let [k,v] of arr1){
        map1.set(k,parseInt(v));
    }
    for(let [k,v] of arr2){
        map2.set(k,parseInt(v));
    }
    for(let k of map1.keys()){
        // 循环课程1，如果课程2也选修过，记录这个学生
        if(map2.has(k)){
            // key为班级编号，value为学号集合
            let banji = k.slice(0,5);
            if(!banjiMap.has(banji)) {
                banjiMap.set(banji, []);
            }
            banjiMap.get(banji).push(k);
        }
    }
    // console.log(map1,map2,banjiMap)
//     最后对学生的成绩和学号排序
    if(banjiMap.size==0){
        console.log("NULL");
        return;
    }
    let arr = [...banjiMap.keys()].sort((a,b)=>a-b);
    // 首先班级升序排序
    console.log(arr);
    // 循环班级，对班级内的学生的成绩和学号进行排序
    arr.forEach(classId=>{
        banjiMap.get(classId).sort((a,b)=>{
            let scoreA = map1.get(a)+map2.get(a);
            let scoreB = map1.get(b)+map2.get(b);
            // 成绩降序，学号升序
            if(scoreA==scoreB){
                return a-b;
            }else{
                return scoreB-scoreA;
            }
        })
        console.log(classId);
        console.log(banjiMap.get(classId).join(";"))
    })
}
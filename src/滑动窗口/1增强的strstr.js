const rl = require("readline").createInterface({
    input:process.stdin
})
const lines = [];
rl.on("line",line=>{
    lines.push(line);
    if(lines.length==2){
        const [source,target] = lines;
        function strstr(source,target){
            // 先将target分组，变为层级
            let level = [];
            // set用来保存[]中的值
            let set = new Set();
            // 用来判断是否是[]中的字符
            let isOpen = false;
            for(let v of target){
                if(v=="["){
                    isOpen = true;
                }else if(v=="]"){
                    isOpen = false;
                    level.push(set);
                    set = new Set();
                }else{
                    if(isOpen){
                        set.add(v);
                    }else{
                        level.push(new Set(v));
                    }
                }
            }
            // return level
            for(let i=0;i<source.length;i++){
                let j = 0;
                for(;j<level.length;j++){
                    if(!level[j].has(source[i+j])) {
                        break;
                    }
                }
                if(j==level.length){
                    return i;
                }
            }
            return -1;
        }
        console.log(strstr(source,target))
        lines.length = 0;
    }
})

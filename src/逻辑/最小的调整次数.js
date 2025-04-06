/*
有一个特异性的双端队列，该队列可以从头部或尾部添加数据，但是只能从头部移出数据。
小A依次执行2n个指令往队列中添加数据和移出数据。其中n个指令是添加数据（可能从头部添加、也可能从尾部添加），依次添加1到n；n个指令是移出数据。
现在要求移除数据的顺序为1到n。
为了满足最后输出的要求，小A可以在任何时候调整队列中数据的顺序。
请问 小A 最少需要调整几次才能够满足移除数据的顺序正好是1到n
输入	5
head add 1
tail add 2
remove
head add 3
tail add 4
head add 5
remove
remove
remove
remove
输出	1
 */
const rl = require("readline").createInterface({
    input : process.stdin
})
const lines = [];
rl.on("line",line=> {
    lines.push(line);
    if(lines[0] && parseInt(lines[0])*2+1==lines.length){
        let n = parseInt(lines[0]);
        let count = 0;
    //     尾部添加时，顺序不变
        let len = 0;
        let isSort = true;
        for(let i=1;i<=2*n;i++){
            let command = lines[i];
            if(command.startsWith("head")){
                if(len!=0 && isSort){
                    isSort = !isSort;
                }
                len++;
            }else if(command.startsWith("tail")){
                len++;
            }else{
                // 如果数组为空，跳过
                if(len==0) continue;
                // 如果不按顺序，要调整一次
                if(!isSort){
                    count++;
                    isSort = !isSort;
                }
                len--;
            }
        }
        console.log(count);
    }
})
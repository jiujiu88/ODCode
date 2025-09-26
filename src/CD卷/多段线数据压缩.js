/*
题目描述：
下图中，每个方块代表一个像素，每个像素用其行号和列号表示，但可以发现，这种表示不是最简的，其实只需要存储 6 个蓝色的关键点即可，
它们是线段的起点、拐点、终点，而剩下 4 个点是冗余的。现在，请根据输入的包含有冗余数据的多段线坐标列表，输出其最简化的结果。

输入描述：
2 8 3 7 3 6 3 5 4 4 5 3 6 2 7 3 8 4 7 5
1、所有数字以空格分隔，每两个数字一组，第一个数字是行号，第二个数字是列号；
2、行号和列号范围为[0,64)，用例输入保证不会越界，考生不必检查；
3、输入数据至少包含两个坐标点。

输出描述：
2 8 3 7 3 5 6 2 8 4 7 5
压缩后的最简化坐标列表，和输入数据的格式相同。
特别注意：输出的坐标相对顺序不能变化。

示例1：
输入
2 8 3 7 3 6 3 5 4 4 5 3 6 2 7 3 8 4 7 5

输出
2 8 3 7 3 5 6 2 8 4 7 5
说明：
如上图所示，6 个蓝色像素的坐标依次是（2,8）、（3,7）、（3,5）、（6,2）、（8,4）、（7,5）。将他们按顺序出即可。

原文链接：https://blog.csdn.net/qq_25360769/article/details/140315701
 */
const rl = require("readline").createInterface({
    input :process.stdin
})
var iter = rl[Symbol.asyncIterator]();
const readline = async ()=>(await iter.next()).value;
void (async function (){
    const list = (await readline()).split(" ").map(Number);
    console.log(getRes(list));
})()

// 思路：寻找拐点 偏移量：B为B-A的offX，offY,C为C-B的offX，offY,基础系数xs为max(abs(offX),abs(offY))
// 偏移量directX为offX/xs. B和C偏移量不一致，B是拐点
// 例如 -1-1 22 偏移量为33 系数为3 可计算dirextX为1,directY为1
const getRes = (list)=>{
    let res = [];
    let offsetX = 0,offsetY = 0;
    let preX = list[0],preY = list[1];
    let preDirectX = 0,preDirectY = 0;
    // 当前点和上个点判断方向是否一致（记录x和y的偏移量，和上个点比较），不一致则上个点是拐点
    for(let i=2;i<list.length;i+=2){
        let curX = list[i],curY = list[i+1];
        offsetX = curX-preX;
        offsetY = curY-preY;
        const base = Math.max(Math.abs(offsetX),Math.abs(offsetY));
        const directX = offsetX/base;
        const directY = offsetY/base;
        console.log(directX,directY);
        // 如果这个点的偏移量和上个偏移量不一致，则表示上个点就是拐点
        if(!(directX==preDirectX && directY==preDirectY)){
            // console.log("记录上个拐点"+preX,preY)
            res.push(preX,preY);
        }
        // 设置上个点的坐标和偏移量
        preX = curX;
        preY = curY;
        preDirectX = directX;
        preDirectY = directY;
    }
    // 记录结尾下标
    res.push(preX,preY);
    return res;
}
/*
题目描述
某业务需要根据终端的IP地址获取该终端归属的城市，可以根据公开的IP地址池信息查询归属城市。
地址池格式如下：
城市名=起始IP,结束IP
起始和结束地址按照英文逗号分隔，多个地址段采用英文分号分隔。比如：
City1=1.1.1.1,1.1.1.2;City1=1.1.1.11,1.1.1.16;City2=3.3.3.3,4.4.4.4;City3=2.2.2.2,6.6.6.6

一个城市可以有多个IP段，比如City1有2个IP段。
城市间也可能存在包含关系，如City3的IP段包含City2的IP段范围。
现在要根据输入的IP列表，返回最佳匹配的城市列表。
注：最佳匹配即包含待查询IP且长度最小的IP段，比如例子中3.4.4.4最佳匹配是City2=3.3.3.3,4.4.4.4，5.5.5.5的最佳匹配是City3=2.2.2.2,6.6.6.6
输入描述
输入共2行。
第一行为城市的IP段列表，多个IP段采用英文分号 ';' 分隔，IP段列表最大不超过500000。
城市名称只包含英文字母、数字和下划线。最多不超过100000个。IP段包含关系可能有多层，但不超过100层。
第二行为查询的IP列表，多个IP采用英文逗号 ',' 分隔，最多不超过10000条。

输出描述
最佳匹配的城市名列表，采用英文逗号 ',' 分隔，城市列表长度应该跟查询的IP列表长度一致。

备注
无论是否查到匹配正常都要输出分隔符。举例：假如输入IP列表为IPa,IPb，两个IP均未有匹配城市，此时输出为","，即只有一个逗号分隔符，两个城市均为空；
可以假定用例中的所有输入均合法，IP地址均为合法的ipv4地址，
满足 (1~255).(0~255).(0~255)**.**(0~255)) 的格式，且可以假定用例中不会出现组播和广播地址；
用例
输入
City1=1.1.1.1,1.1.1.2;City1=1.1.1.11,1.1.1.16;City2=3.3.3.3,4.4.4.4;City3=2.2.2.2,6.6.6.6
1.1.1.15,3.3.3.5,2.2.2.3
输出
City1,City2,City3

说明
1）City1有2个IP段，City3的IP段包含City2的IP段；
2）1.1.1.15仅匹配City1=1.1.1.11,1.1.1.16，所以City1就是最佳匹配；
2.2.2.3仅匹配City3=2.2.2.2,6.6.6.6，所以City3是最佳匹配；
3.3.3.5同时匹配为City2=3.3.3.3,4.4.4.4和City3=2.2.2.2,6.6.6.6，
但是City2=3.3.3.3,4.4.4.4的IP段范围更小，所以City3为最佳匹配；
原文链接：https://blog.csdn.net/2301_76543445/article/details/141124888
 */
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
void (async function (){
    const citys = (await readline()).split(";");
    const addrs = (await readline()).split(",");
    console.log(getRes(citys,addrs));
})()

// 思路：城市列表转为对象，存city、（ip转数字）IP开始数字、IP结尾数字、长度。循环ip段，判断在哪个城市列表中(比较city大小和minLen大小)，记录结果。
const trans2Num = (ip)=>{
//     例如1.1.1.1 ，转为整数
    let list = ip.split(".");
    let res = "";
    for(let v of list){
        res = parseInt(v) | (res<<8);
    }
    return res;
}
const getRes = (citys,addrs)=>{
    let res = [];
    console.log(citys,addrs)
    const validIPs = [];
    for(let v of citys){
        const [city,start,end] = v.split(/[=,]/);
        validIPs.push({
            city:city,
            start:trans2Num(start),
            end:trans2Num(end),
            len:trans2Num(end)-trans2Num(start)
        })
    }
    // 计算结果
    for(let addr of addrs){
    //     先判断，这个ip在哪个城市
        let ip = trans2Num(addr);
        let resCity = "";
        // 初始话最小长度为无穷，这样第一次一定能取到符合ip范围的一个城市
        let minLen = Infinity;
        for(let validIP of validIPs){
            // 如果找到ip段长度最小的，则是结果
            if(ip>=validIP.start && ip<=validIP.end){
                // 如果长度相同，那么取城市大的（例如city1和city2的IP段长度相同，取city2）
                // 如果存在区间长度相同的匹配城市，则字典序更大的是最佳匹配城市
                if(validIP.len<minLen || (validIP.len==minLen && validIP.city>resCity)) {
                    resCity = validIP.city;
                    minLen = validIP.len;
                }
            }
        }
        res.push(resCity);
    }
    return res.join(",");
}
/*
// 输入输出处理
void (async function () {
    // 城市IP列表
    const cities = (await readline()).split(";");
    // 带查询的IP列表
    const queryIps = (await readline()).split(",");

    // IP地址转整型
    function ip2dec(ip) {
        let res = 0;

        const blocks = ip.split(".");
        for (let block of blocks) {
            res = parseInt(block) | (res << 8);
        }

        return res;
    }

    class Range {
        constructor(city, startIpStr, endIpStr) {
            this.city = city;
            // 将IP地址转为整型
            this.startIpDec = ip2dec(startIpStr);
            this.endIpDec = ip2dec(endIpStr);
            this.ipLen = this.endIpDec - this.startIpDec + 1;
        }
    }

    const ranges = [];

    for (let s of cities) {
        const [city, startIpStr, endIpStr] = s.split(/[=,]/);
        ranges.push(new Range(city, startIpStr, endIpStr));
    }

    const ans = [];

    // 遍历待查询的IP地址
    for (let ip of queryIps) {
        const ipDec = ip2dec(ip);

        // 记录该目标IP地址的最佳匹配城市
        let city = "";
        // 记录最佳匹配城市IP段的长度
        let minLen = Infinity;

        // 将带查询IP与城市IP段列表逐一匹配
        for (let range of ranges) {
            // 如果带查询的IP地址 在某城市的IP段范围内，且该城市的IP段长度更小，则该城市为待查询IP的最佳匹配城市
            if (ipDec >= range.startIpDec && ipDec <= range.endIpDec) {
                // 2024.04.05 根据考友反馈，如果存在区间长度相同的匹配城市，则字典序更大的是最佳匹配城市，此类用例有20%
                if (
                    minLen > range.ipLen ||
                    (minLen == range.ipLen && city < range.city)
                ) {
                    city = range.city;
                    minLen = range.ipLen;
                }
            }
        }

        ans.push(city);
    }

    console.log(ans.join(","));
})();*/
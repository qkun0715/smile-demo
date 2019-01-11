//生成随机数
function GetRandomNum(min, max) {
    let range = max - min;
    let rand = Math.random();
    return (min + Math.round(rand * range))
}

// console.log(GetRandomNum(10000,99999))

//生成用户名位数

function GetRadomUserName(min, max) {
    let tempStringArray = "123456789qwertyuiopasdfghjklzxcvbnm".split("");
    let outPuttext = "";
    for (let i = 1; i < GetRandomNum(min, max); i++) {
        outPuttext = outPuttext + tempStringArray[GetRandomNum(0, tempStringArray.length)]
    }
    return outPuttext;
}

// console.log(GetRadomUserName(7,16));


//200W数据

let startTime =(new Date()).getTime();//开始时间

var db = connect('company');

db.randomInfo.drop();

//批量添加
let tempInfo = [];

for (let i = 0; i < 2000000; i++) {
    tempInfo.push({
        username: GetRadomUserName(7, 16),
        regeditTime: new Date(),
        randNum0: GetRandomNum(100000, 999999),
        randNum1: GetRandomNum(100000, 999999),
        randNum2: GetRandomNum(100000, 999999),
        randNum3: GetRandomNum(100000, 999999),
        randNum4: GetRandomNum(100000, 999999),
        randNum5: GetRandomNum(100000, 999999),
        randNum6: GetRandomNum(100000, 999999),
        randNum7: GetRandomNum(100000, 999999),
        randNum8: GetRandomNum(100000, 999999),
        randNum9: GetRandomNum(100000, 999999)
    })
}

db.randomInfo.insert(tempInfo);

var endTime =(new Date()).getTime()-startTime;

print("[demo]:-----------------"+endTime+"ms");


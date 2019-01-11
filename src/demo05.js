// db.workmate.find(
//     {"skill.skillOne":"HTML+CSS"},
//     {name:true,"skill.skillOne":true,_id:false}
// )

//age <= 30 && >=25
// db.workmate.find(
//     {age:{$lte:30,$gte:25}},
//     {name:true,age:true,"skill.skillOne":true,_id:false}
// )
// var startDate=new Date('01/01/2018');
// db.workmate.find(
//     {regeditTime:{$gt:startDate}},
//     {name:true,age:true,"skill.skillOne":true,_id:false}
// )

/**
 * $in  一个key  多个value 返回包含value的值
 * $nin  一个key  多个value 返回不包含value的值
 */
// db.workmate.find(
//     {age:{$in:[25,33,30]}},
//     {name:true,age:true,"skill.skillOne":true,_id:false}
// )

/**
 * $or  多条件查询  包含一项即可  || 关系、
 * $and && 关系
 */
// db.workmate.find(
//     {
//         $and: [
//             {age: {$gte: 30}},
//             {"skill.skillThree": 'PHP'}
//         ]
//     },
//     {name: true, age: true, "skill.skillThree": true, _id: false}
// )

/**
 * 查询数组
 */
db.workmate.find(
    {interest:['画画','聚会','看电影']},
    {name:true,_id:false,interest:true,age:true}
)

//$all && 关系
db.workmate.find(
    {interest:{$all:['看电影','看书']}},
    {name:true,_id:false,interest:true,age:true}
)
//$ in ||关系
db.workmate.find(
    {interest:{$in:['看电影','看书']}},
    {name:true,_id:false,interest:true,age:true}
)

//$size  个数
db.workmate.find(
    {interest:{$size:3}},
    {name:true,_id:false,interest:true,age:true}
)

//$slice  截取几位显示
db.workmate.find(
    {interest:{$size:3}},
    {name:true,_id:false,interest:{$slice:1},age:true}
)

db.workmate.find(
    {},
    {name:true,age:true,_id:false}
).limit(3).skip(3).sort({age:1})
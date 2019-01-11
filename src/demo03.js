var db = connect('company');

//$set
// db.workmate.update({name: 'MIMI'}, {
//     $set: {
//         sex: 0,
//         age:20
//     }
// });
//内嵌套 部分
// db.workmate.update({name: 'MIMI'}, {
//     $set: {"skill.skillThree":'word'}
// });

//$unset 删除
// db.workmate.update({name: 'MIMI'}, {
//     $unset: {age:''}
// });
// db.workmate.update({name: 'MIMI'}, {
//     $set: {age:20}
// });

//$inc
// db.workmate.update({name: 'MIMI'}, {
//     $inc: {age:-2}
// });

//$multi(是否继续查找)  问题：对象所有的数据添加一个兴趣字段interset
// db.workmate.update({}, {$set: {interset:[]}},{multi:true});

//upsert
// db.workmate.update({name:'xiaoWang'}, {$set: {age:20}},{upsert:true});

/* 对数据的修改*/
//$push
// db.workmate.update({name:'xiaoWang'}, {$push:{interset:'draw'}});

//$ne 有就不修改  没有就添加
// db.workmate.update({name:'xiaoWang',interset:{$ne:'playGmae'}},{$push:{interset: 'playGmae'}});
//$addToSet  $ne 升级版
// db.workmate.update({name: 'xiaoWang'}, {$addToSet: {interset: 'readBook'}});

//$each 批量添加
// var newInterest=['Sing','RI','Code'];
// db.workmate.update({name: 'xiaoWang'}, {$addToSet:{interset:{$each:newInterest}}});

//$pop  1从末端进行删除  -1开始位置进行删除
// db.workmate.update({name: 'xiaoWang'}, {$pop: {interset: 1}})

//数组定位修改
db.workmate.update({name: 'xiaoWang'}, {$set:{"interset.2":'呜呜呜'}})
print('[SUCCESS:] The data was insert success')

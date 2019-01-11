var myModify = {
    findAndModify: 'workmate',
    query: {name: 'JSPang'},
    update: {$set: {age: 18}},
    new: true
}

var result = db.runCommand(myModify);
printjson(result);

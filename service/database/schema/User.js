const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
var bcrypt = require('bcryptjs')  //对密码加密


//创建UserSchema
const userScheme = new Schema({
    UserId: ObjectId,
    userName: {unique: true, type: String},
    password: String,
    createAt: {type: Date, default: Date.now()},
    lastLoginAt: {type: Date, default: Date.now()}
}, {
    collection: 'use'
});
// userScheme.pre('save', function (next) {
//     console.log(this)
//     bcrypt.genSalt(10, function (err, salt) {
//         console.log(`是否获取了密码${userScheme.password}`)
//         if (err) return next(err);
//         bcrypt.hash(this.password, salt, function (err, hash) {
//             console.log(this.password)
//             if (err) return next(err);
//             this.password = hash;
//             console.log('执行加密3')
//             next()
//         })
//     })
// })

//发布模型
mongoose.model('User', userScheme);

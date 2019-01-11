const Router = require('koa-router');
const mongoose = require('mongoose')

let router = new Router();
router.get('/', async (ctx) => {
    ctx.body = '首页'
});

router.post('/register', async (ctx) => {
    //将接受到的数据 在数据库中处理  使用mongoose
    let User = mongoose.model('User')
    let newUser = new User(ctx.request.body)
    //保存到数据库
    await newUser.save()
        .then(() => {
            ctx.body = {
                code: 200,
                message: '注册成功'
            }
        }).catch((error) => {
            ctx.body = {
                code: 500,
                message: error
            }
        })
});
/*登录的实践 */
router.post('/login', async (ctx) => {
    //得到前端传递过来的数据
    let loginUser = ctx.request.body
    console.log(loginUser);
    let userName = loginUser.userName;
    let password = loginUser.password
    //引入User的model
    const User = mongoose.model('User')
    //查找用户名是否存在，如果存在开始比对密码
    await User.findOne({userName: userName}).exec()
        .then(async (result) => {
            console.log(result);
            if (result) {
                //当用户名存在时，开始比对密码
                // let newUser = new User()  //因为是实例方法，所以要new出对象，才能调用
                if (password === result.password) {
                    ctx.body = {code: 200, message: true}
                } else {
                    ctx.body = {code: 200, message: false}
                }
            } else {
                ctx.body = {code: 200, message: false}
            }
        }).catch(error => {
            console.log(error)
            ctx.body = {code: 500, message: error}
        })
});

module.exports = router





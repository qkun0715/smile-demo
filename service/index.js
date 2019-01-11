const Koa = require('koa')
const app = new Koa()
const {connect, initSchemas} = require('./database/init')
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router');
const cors = require('koa2-cors')
app.use(bodyParser());
app.use(cors())


let user = require('./serviceApi/user');
let goods = require('./serviceApi/goods');

//装载所有子路由
let router  =new Router();
router.use('/user',user.routes());
router.use('/goods',goods.routes());

//加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods())

//查询数据库 获取数据
;(async () => {
    await connect()
    initSchemas()
})()

app.use(async (ctx) => {
    ctx.body = '<h1>hello Koa2</h1>'
})
app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})

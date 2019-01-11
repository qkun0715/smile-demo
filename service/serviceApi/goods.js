// const Koa = require('koa');
// const app = new Koa();
const Router = require('koa-router');
let router = new Router();

const mongoose = require('mongoose');
//读取文件
const fs = require('fs');

router.get('/insertAllGoodsInfo', async (ctx) => {
    fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        //对于数据库的操作就要经过模型 才能处理（增删改查）
        const Goods = mongoose.model('Goods');
        data.map((value, index) => {
            console.log(value);
            //new一个Goods对象，再对对象进行操作
            let newGoods = new Goods(value);
            newGoods.save().then(() => {
                saveCount++
                console.log('成功' + saveCount)
            }).catch((err) => {
                console.log(err)
            })
        })
    });
    ctx.body = '开始导入数据'
});

router.get('/insertAllCategory', async (ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0;
        const Category = mongoose.model('Category');
        data.RECORDS.map((value, index) => {
            let newCategory = new Category(value);
            newCategory.save().then(() => {
                saveCount++;
                console.log('插入成功：' + saveCount);
            }).catch((err) => {
                console.log(err)
            })
        })
    })
    ctx.body = '开始导入Category数据'
});

router.get('/insertAllCategorySub', async (ctx) => {
    //读取文件数据
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let saveCount = 0;
        //模型
        const CategorySub = mongoose.model('CategorySub');

        data.RECORDS.map((value, index) => {
            const newCategorySub = new CategorySub(value);
            //有对象之后  进行插入数据库
            newCategorySub.save().then(() => {
                saveCount++;
                console.log('插入成功：' + saveCount);
            }).catch((err) => {
                console.log(err)
            })
        })
    })
    ctx.body = '开始导入CategorySub数据'
});

/**
 * 获取商品详情信息接口
 * @type {Router|*}
 */
router.post('/getDetailGoodsInfo', async (ctx) => {
    //参数需要一个goodsId
    // let goodsId = ctx.request.body.goodsId;
    // const Goods = mongoose.model('Goods');
    // //查询数据
    // await Goods.findOne({ID: goodsId}).exec()
    //     .then(async (result) => {
    //         ctx.body = {code: 200, message: result}
    //     }).catch((error) => {
    //         console.log(error)
    //         ctx.body = {code: 500, message: error}
    //     })

    //第二种写法
    try {
        let goodsId = ctx.request.body.goodsId;
        const Goods = mongoose.model('Goods');
        let result = await Goods.findOne({ID: goodsId}).exec();
        ctx.body = {code: 200, message: result}
    } catch (error) {
        ctx.body = {code: 500, message: error}
    }
});

/**
 * 获取大分类数据
 * @type {Router|*}
 */
router.get('/getCategoryList', async (ctx) => {
    try {
        const Category = mongoose.model('Category');
        let result = await Category.find().exec();
        ctx.body = {code: 200, message: result}
    } catch (error) {
        ctx.body = {code: 500, message: error}
    }
});

/**
 * 获取小分类数据
 * @type {Router|*}
 */
router.post('/getCategorySubList', async (ctx) => {
    try {
        let categoryId = ctx.request.body.categoryId;
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec();
        ctx.body = {code: 200, message: result}
    } catch (error) {
        ctx.body = {code: 500, message: error}
    }
});

/**
 * 根据类别获取商品列表  分页
 * @type {Router|*}
 */
router.post('/getGoodsListByCategorySubID', async (ctx) => {
    try {
        let categorySubId = ctx.request.body.categorySubId;
        let page = ctx.request.body.page;
        let num = 10;
        let start = (page - 1) * num; //开始的位置
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID: categorySubId})
            .skip(start)
            .limit(num)
            .exec();
        ctx.body = {code: 200, message: result}
    } catch (e) {
        ctx.body = {code: 500, message: e}
    }
});

module.exports = router

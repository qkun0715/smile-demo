const BASE_URL = "https://www.easy-mock.com/mock/5c1b050848952b7bd65142a4/";
const LOCAL_URL = "http://localhost:3000/";
const URL = {
    getHomeInfo: BASE_URL + "home",
    registerUser: LOCAL_URL + 'user/register',
    login:LOCAL_URL+'user/login',   //用户注册接口
    getDetailGoodsInfo:LOCAL_URL+'goods/getDetailGoodsInfo',   //获取商品详情
    getCategoryList:LOCAL_URL+'goods/getCategoryList',   //得到大类信息
    getCategorySubList:LOCAL_URL+'goods/getCategorySubList',   //得到小类信息
    getGoodsListByCategorySubID:LOCAL_URL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息
};

export default {
    url: URL
}

<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" width="80%" class="location-icon"/>
                </van-col>
                <van-col span="16">
                    <input class="search-input"/>
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!--swipwer area-->
        <div class="swipe-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--type bar-->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" width="90%"/>
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!--advertes area-->
        <div>
            <img v-lazy="advertesPicture" width="100%"/>
        </div>

        <!--recommend area-->
        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%"/>
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!--floor area-->
        <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
        <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>

        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20"> <!--gutter 间隔-->
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <goods-info-component
                                    :goodsImage="item.image"
                                    :goodsName="item.name"
                                    :goodsPrice="item.price"
                                    :goodsId="item.goodsId">
                            </goods-info-component>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import FloorComponent from '../components/FloorComponent'
    import {toMoney} from "../filter/moneyFilter";
    import GoodsInfoComponent from '../components/GoodsInfoComponent'
    import server from '../common/serviceApi'
    import {Toast} from "vant";

    export default {
        name: 'home',
        components: {
            swiper,
            swiperSlide,
            FloorComponent,
            GoodsInfoComponent
        },
        data() {
            return {
                locationIcon: require('../common/images/icon_location.png'),
                bannerPicArray: [],
                category: [],
                advertesPicture: '',
                recommendGoods: [],
                swiperOption: {
                    slidesPerView: 3
                },
                floor1: [],
                floor2: [],
                floor3: [],
                floorName: {},
                hotGoods: [], //热卖商品
            }
        },
        created() {
            axios.get(server.url.getHomeInfo)
                .then((res) => {
                    if (res.status === 200) {
                        this.bannerPicArray = res.data.data.slides;
                        this.category = res.data.data.category;
                        this.advertesPicture = res.data.data.advertesPicture.PICTURE_ADDRESS;
                        this.recommendGoods = res.data.data.recommend;
                        this.floor1 = res.data.data.floor1;
                        this.floor2 = res.data.data.floor2;
                        this.floor3 = res.data.data.floor3;
                        this.floorName = res.data.data.floorName;
                        this.hotGoods = res.data.data.hotGoods
                    } else {
                        Toast.fail(res.statusText)
                    }

                    console.log(res)
                }).catch((error) => {
                console.log(error)
            })
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money)
            }
        }

    }
</script>

<style lang="stylus" scoped>
    .search-bar
        height: 2.2rem
        background-color: #e5017d
        line-height: 2.2rem
        overflow: hidden

        .location-icon
            padding-left: 0.3rem
            padding-top: 0.2rem

        .search-input
            width: 100%
            height: 1.3rem
            border-top: 0
            border-left: 0
            border-right: 0
            border-bottom: 1px solid #fff !important
            background-color: #e5017d
            color: white

    .swipe-area
        width: 20rem
        clear: both

    .type-bar
        background-color: #fff
        margin: 0 .3rem .3rem .3rem
        border-radius: .3rem
        font-size: 14px
        display: flex
        flex-direction: row
        flex-flow nowrap

    .type-bar div {
        padding: .3rem
        font-size: 12px
        text-align: center
        flex 1
    }

    .recommend-area
        background-color: #fff
        margin-top: .3rem

        .recommend-title
            margin-left: .2rem
            border-bottom: 1px solid #eee
            font-size: 14px
            padding: .2rem
            color: #e5017d

        .recommend-body
            border-bottom: 1px solid #eee

            .recommend-item
                width: 99%
                border-right: 1px solid #eee
                font-size: 12px
                text-align: center

    .hot-area
        text-align: center;
        font-size: 14px;
        height: 1.8rem;
        line-height: 1.8rem;
        .hot-goods
            height 130rem
            overflow hidden
            background-color #fff

</style>

<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar
                    title="商品详情"
                    left-text="返回"
                    left-arrow
                    @click-left="onBack"
            />
        </div>

        <div class="top-image">
            <img :src="goodsInfo.IMAGE1" width="100%"/>
        </div>

        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>

        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="评价">开发中</van-tab>
            </van-tabs>
        </div>

        <div class="goods-bottom">
            <div>
                <van-button size="large" type="primary">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import serviceApi from '../common/serviceApi'
    import {Toast} from "vant";
    import {toMoney} from "../filter/moneyFilter";

    export default {
        name: 'Goods',
        components: {},
        data() {
            return {
                goodsId: '',
                goodsInfo: {},
            }
        },
        created() {
            this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId;
            console.log(this.goodsId)
            this.getInfo()
        },
        mounted() {

        },
        filters: {
            moneyFilter(money) {
                return toMoney(money)
            }
        },
        methods: {
            getInfo() {
                axios({
                    url: serviceApi.url.getDetailGoodsInfo,
                    method: 'post',
                    data: {
                        goodsId: this.goodsId
                    }
                }).then((res) => {
                    if (res.data.code === 200 && res.data.message) {
                        this.goodsInfo = res.data.message
                    } else {
                        Toast('获取数据失败')
                    }
                    console.log(this.goodsInfo)
                }).catch((error) => {
                    console.log(error)
                    Toast('获取数据失败')
                })
            },
            onBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    .detail
        font-size 0px

    .goods-bottom
        position fixed
        bottom 0px
        left 0px
        background-color: #fff
        width: 100%
        display flex
        flex-direction row
        flex-flow norow

    .goods-bottom > div
        flex 1
        padding 5px

</style>

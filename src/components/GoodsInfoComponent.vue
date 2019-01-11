<template>
    <div class="goods-info" @click="getGoodsPage">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
    import {toMoney} from "../filter/moneyFilter";

    export default {
        name: 'GoodsInfoComponent',
        components: {},
        props:['goodsImage','goodsName','goodsPrice','goodsId'],
        data() {
            return {}
        },
        mounted() {

        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        methods: {
            getGoodsPage(){
                this.$router.push({name:'Goods',params:{goodsId:this.goodsId}})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    .goods-name{
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
    }
</style>

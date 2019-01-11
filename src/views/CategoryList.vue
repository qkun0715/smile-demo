<template>
    <div>
        <div>
            <van-nav-bar title="商品列表"/>
        </div>

        <div>
            <van-row>
                <van-col span="6">
                    <div id="nav-left">
                        <ul>
                            <li v-for="(item,index) in category"
                                :key="index"
                                @click="clickCategory(index,item.ID)"
                                :class="{categoryActive:categoryIndex===index}">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item,index) in categorySub" :key="index"
                                     :title="item.MALL_SUB_NAME"
                            ></van-tab>
                        </van-tabs>
                    </div>

                    <div id="list-div">
                        <!--在哪里使用PullRefresh 下拉刷新 就在它上面加-->
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list v-model="loading"
                                      :finished="finished"
                                      finished-text="没有更多了"
                                      @load="onLoad">
                                <div class="list-item" v-for="(item,index) in goodslist" :key="index"
                                    @click="goGoodsInfo(item.ID)">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" width="100%" :onerror="errorImg"/>
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div>￥{{item.ORI_PRICE |moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import serviceApi from '../common/serviceApi'
    import {Toast} from "vant";
    import {toMoney} from "../filter/moneyFilter";

    export default {
        name: "CategoryList",
        data() {
            return {
                category: [],
                categoryIndex: 0,
                categorySub: [],
                loading: false, ////上拉加载使用
                finished: false, //下拉加载是否没有数据了
                active: 0,
                goodslist: [],  //商品列表数据
                isRefresh: false, //下拉刷新
                categorySubId: '',  //商品子类别id
                page: 1,
                errorImg: 'this.src="' + require('@/common/images/errorimg.png') + '"'
            }
        },
        created() {
            this.getCategoryList()
        },
        mounted() {
            let winHeight = document.documentElement.clientHeight;
            document.getElementById('nav-left').style.height = winHeight - 46 + 'px';
            document.getElementById('list-div').style.height = winHeight - 90 + 'px'
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        methods: {
            getCategoryList() {
                axios({
                    url: serviceApi.url.getCategoryList,
                    method: 'get'
                }).then(res => {
                    if (res.data.code === 200 && res.data.message) {
                        this.category = res.data.message;
                        this.getCategorySubByCategoryId(this.category[0].ID)
                        console.log(res.data.message)
                    }
                }).catch(error => {
                    Toast(error)
                })
            },
            clickCategory(index, categoryId) {
                console.log(categoryId);
                this.categoryIndex = index;
                this.page = 1;
                this.finished = false;
                this.goodslist = [];
                this.getCategorySubByCategoryId(categoryId)
            },
            //根据大类id来获取小类数据
            getCategorySubByCategoryId(categoryId) {
                axios({
                    url: serviceApi.url.getCategorySubList,
                    method: 'post',
                    data: {
                        categoryId: categoryId
                    }
                }).then((res) => {
                    if (res.data.code === 200 && res.data.message) {
                        this.categorySub = res.data.message;
                        this.active = 0;
                        this.categorySubId = this.categorySub[0].ID;
                        this.onLoad();
                        console.log(res.data.message)
                    } else {
                        Toast('服务器错误，数据取得失败')
                    }

                }).catch((error) => {
                    Toast(error)
                })
            },
            //得到小类商品列表信息
            getGoodsList(categorySubId) {
                axios({
                    url: serviceApi.url.getGoodsListByCategorySubID,
                    method: 'post',
                    data: {
                        categorySubId: categorySubId,
                        page: this.page
                    }
                }).then((res) => {
                    if (res.data.code === 200 && res.data.message) {
                        this.page++;
                        this.goodslist = this.goodslist.concat(res.data.message);
                        console.log(res.data.message)
                    } else {
                        this.finished = true
                    }
                    this.loading = false;

                }).catch((error) => {
                    console.log(error)
                })
            },
            //上拉加载更多
            onLoad() {
                setTimeout(() => {
                    this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID;
                    this.getGoodsList(this.categorySubId)

                }, 500)
            },
            //下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.finished = false;
                    this.isRefresh = false;
                    this.goodslist = [];
                    this.page = 1;
                    this.onLoad()
                }, 500)
            },
            onClickCategorySub(index) {
                this.categorySubId = this.categorySub[index].ID;
                console.log(`categorySubId :${this.categorySubId}`);
                this.goodslist = [];
                this.finished = false;
                this.page = 1;
                this.onLoad()
            },
            goGoodsInfo(id){
                this.$router.push({name:'Goods',params:{goodsId:id}})
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #nav-left
        background-color aliceblue

    #nav-left > ul > li
        line-height 2rem
        border-bottom 1px solid #E4E7ED
        padding 3px
        font-size 0.8rem
        text-align center

    .categoryActive
        background-color #fff

    #list-div {
        overflow scroll
    }

    .list-item {
        display: flex;
        flex-direction: row;
        font-size: 0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding: 5px;
    }

    .list-item-img {
        flex: 8;
    }

    .list-item-text {
        flex: 16;
        margin-top: 10px;
        margin-left: 10px;
    }

</style>

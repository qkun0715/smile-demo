<template>
    <div>
        <div class="main-div">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>

        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: 'Main',
        components: {},
        data() {
            return {
                active: 0,
                nowPath: '', //当前路径
            }
        },
        created() {
            this.changeTabBarActive()
        },
        updated() {
            this.changeTabBarActive()

        },
        mounted() {

        },
        methods: {
            changeTabBarActive() {
                this.nowPath = this.$route.path;
                if (this.nowPath === '/Cart') {
                    this.active = 2;
                }
            },
            changeTabbar(active) {
                switch (active) {
                    case 0:
                        this.$router.push({name: 'Home'});
                        break;
                    case 1:
                        this.$router.push({name: 'CategoryList'});
                        break;
                    case 2:
                        this.$router.push({name: 'Cart'});
                        break;
                    case 3:
                        this.$router.push({name: 'Home'});
                        break
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>

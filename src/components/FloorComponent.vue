<template>
    <div class="floor">
        <div class="floor-title">{{floorTitle}}</div>
        <div class="floor-anomaly">
            <div class="floor-one">
                <img :src="floorData_0.image" width="100%"/>
            </div>
            <div>
                <div class="floor-two">
                    <img :src="floorData_1.image" width="100%"/>
                </div>
                <div>
                    <img :src="floorData_2.image" width="100%"/>
                </div>
            </div>
        </div>
        <div class="floor-rule">
            <div v-for="(item,index) in floorData.slice(3)" :key="index">
                <img :src="item.image" width="100%"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FloorComponent',
        components: {},
        props:['floorData','floorTitle'],
        data() {
            return {
                floorData_0:{},
                floorData_1:{},
                floorData_2:{}

            }
        },
        create(){

        },
        watch:{
            floorData(val){
                this.floorData_0=this.floorData[0],
                this.floorData_1=this.floorData[1],
                this.floorData_2=this.floorData[2]
            }
        },
        mounted() {

        },
        methods: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    .floor-title
        text-align center
        font-size 14px
        height 1.8rem
        line-height 1.8rem
        border-bottom 1px solid #ddd
    .floor-anomaly
        display: flex
        flex-direction: row
        background-color: #fff
        border-bottom: 1px solid #ddd

        .floor-one
            border-right: 1px solid #ddd

        .floor-two
            border-bottom: 1px solid #ddd

    .floor-rule
        display: flex
        flex-direction: row
        flex-flow: wrap
        background-color: #fff

        > div
            -webkit-box-sizing: border-box
            box-sizing: border-box
            width: 10rem
            border-bottom: 1px solid #ddd

        > div:nth-child(odd)
            border-right: 1px solid #ddd
</style>

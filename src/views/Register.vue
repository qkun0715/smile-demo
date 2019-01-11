<template>
    <div>
        <van-nav-bar
                title="用户注册"
                left-text="返回"
                left-arrow
                @click-left="goBack"
        />
        <div class="register-panel">

            <van-field
                    v-model="username"
                    label="用户名"
                    icon="clear"
                    placeholder="请输入用户名"
                    required
                    @click-icon="username=''"
                    :error-message="usernameErrorMsg"/>

            <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    icon="clear"
                    placeholder="请输入密码"
                    required
                    @click-icon="password=''"
                    :error-message="passwordErrorMsg"/>

            <div class="register-btn">
                <van-button type="primary"
                            size="large"
                            @click="registerAction"
                            :loading="openLoading">马上注册
                </van-button>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import serviceApi from '../common/serviceApi'
    import {Toast} from "vant";

    export default {
        name: 'Register',
        components: {},
        data() {
            return {
                username: '',
                password: '',
                openLoading: false,//是否开启用户注册的loading状态
                usernameErrorMsg: '',//当用户名出现错误的提醒信息
                passwordErrorMsg: '' //当密码出现错误的提醒信息
            }
        },
        mounted() {

        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            registerAction() {
                // if (this.checkForm()) {
                //     this.registerUser()
                // }
                this.checkForm() && this.registerUser()
            },
            registerUser() {
                this.openLoading = true
                axios({
                    url: serviceApi.url.registerUser,
                    method: 'post',
                    data: {
                        userName: this.username,
                        password: this.password
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        Toast.success(res.data.message)
                        this.$router.push('/')
                    } else {
                        console.log(res.data.message);
                        this.openLoading = false;
                        Toast.fail('注册失败')
                    }
                }).catch(err => {
                    this.openLoading = false;
                    Toast.fail('注册失败');
                    console.log(err)
                })
            },
            /** 表单验证方法**/
            checkForm() {
                let isOk = true;
                if (this.username.length < 5) {
                    this.usernameErrorMsg = '用户名不能少于5位';
                    isOk = false
                } else {
                    this.usernameErrorMsg = '';
                }
                if (this.password.length < 5) {
                    this.passwordErrorMsg = '密码不能少于5位';
                    isOk = false
                } else {
                    this.passwordErrorMsg = '';
                }

                return isOk
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    .register-panel
        width: 96%
        border-radius 5px
        margin 20px auto
        padding-bottom 50px

        .register-btn
            padding-top: 10px
</style>

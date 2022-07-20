<template>
    <div>
        <img class="personicon" src="@/assets/icon.png" />
        <el-input v-model="form.tel" placeholder="用户账号"></el-input>

        <img class="pwicon" src="@/assets/pw.png" />
        <el-input
            type="password"
            v-model="form.pw"
            placeholder="密码"
        ></el-input>

        <br />

        <div class="bottom">
            <el-checkbox class="chestyle" v-model="checked"
                >记住密码</el-checkbox
            >
            <el-button class="forge" type="text">忘记密码</el-button>
        </div>

        <el-button
            type="primary"
            class="log"
            @click="login(form)"
        >
            登录
        </el-button>
        <div style="text-align: right">
            <el-button class="regis" type="text" @click="func()"
                >立即注册</el-button
            >
        </div>
    </div>
</template>

<script>
import { loginAPI } from '@/API'
export default {
    data() {
        return {
            form: { tel: '', pw: '' },
            checked: false,
        }
    },
    mounted() {
        let ARmanager = localStorage.getItem('ARmanager')
        if (ARmanager === '1') {
            this.form.tel = localStorage.getItem('tel')
            this.form.pw = localStorage.getItem('pw')
            this.checked = true
        }
    },

    methods: {
        func() {
            this.toPage('/Register')
        },
        //
        submitForm() {
            if (this.checked) {
                localStorage.setItem('ARmanager', '1')
                localStorage.setItem('tel', this.form.tel)
                localStorage.setItem('pw', this.form.pw)
            } else {
                localStorage.removeItem('ARmanager')
                localStorage.removeItem('tel')
                localStorage.removeItem('pw')
            }
        },

        login() {
            loginAPI
                .AdminLogin({
                    customerAccount: this.form.tel,
                    password: this.form.pw,
                })
                .then((res) => {
                    if (res.code == 1000) {
                        this.submitForm()
                        console.log(res)

                        sessionStorage.setItem(
                            'customerCode',
                            res.data.customerCode
                        )
                        sessionStorage.setItem('name', res.data.name)
                        sessionStorage.setItem('phone', res.data.phone)
                        console.log(sessionStorage.getItem('customerCode'))
                        sessionStorage.setItem('token', res.data.token)
                        sessionStorage.LOGIN_STATE = 1
                        sessionStorage.permission = 0

                        sessionStorage.permissionOldMode = JSON.stringify([])

                        sessionStorage.nowMenuPermission = '00002'
                        this.$store.commit('base/changeManager')
                        this.$store.dispatch('permission/getRoutes')
                        this.$router.push('/Home')
                        this.$store.commit('bar/Reset_BarList')
                    }
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.reso {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 1000px;
}
.el-checkbox {
    color: #8f8e8e;
}
::v-deep {
    .el-input__inner:hover {
        border-color: gray;
    }
    .el-checkbox__inner {
        border: 1.5px solid #829fff;
        border-radius: 2px;
    }
}

.regis {
    margin-top: 20px;
    font-size: 14px;
    font-weight: 500;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #8f8e8e;
}
.el-button--text {
    color: #0076fe;
    text-decoration: none;
    padding: 0;
}
.el-button--primary:hover {
    background: #95aefe;
}
.el-button--primary:active {
    background: #698cfd;
}
.el-button--primary:focus {
    background: #829fff;
}

.el-button--primary {
    border-color: #829fff;
    background: #829fff;
}

.chestyle {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.label {
    position: absolute;
    left: 420px;
    margin-top: -53px;
    width: 69px;
    height: 19px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #020202;
    line-height: 60px;

    padding-left: 20px;
}

.post {
    margin-top: 152px;
    display: inline-block;
    width: 400px;
    height: 620px;
    background: #d2d2d2;
    border-radius: 10px 0px 0px 10px;
}
.info {
    //margin-left: 400px;
    display: inline-block;
    overflow: hidden;
    width: 600px;
    height: 620px;
    background: #ffffff;
    border-radius: 0px 10px 10px 0px;
}
.help {
    position: relative;
    width: 131px;
    height: 33px;
    top: 20px;
    border: 1px solid #8f8e8e;
    border-radius: 10px;
    margin-left: 347px;
}
.wxlabel {
    line-height: 30px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #676666;
}
.qr {
    margin-top: 20px;
    float: right;
    margin-right: 20px;
}
.button {
    display: flex;
    margin-top: 125px;
    width: 359px;
    margin-left: 120px;
    justify-content: left;
}

.el-input__inner {
    height: 46px;

    height: 46px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding-left: 40px;
    background-color: transparent;
}

.font {
    width: 81px;
    height: 19px;
    src: url('/assets/ping.ttf');
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #020202;
    vertical-align: middle;
    text-align: center;
}
.line {
    width: 110px;
    height: 4px;
    background: #a5a5a5;
    border-radius: 2px;
    margin-left: 120px;
}
.personicon {
    position: relative;
    top: 35px;
    right: 160px;
}

.pwicon {
    position: relative;
    top: 35px;
    right: 160px;
}

.container {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    margin-top: 21px;
}
.bottom {
    display: flex;
}
.mem {
    line-height: 18px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #8f8e8e;
}
.forge {
    margin-left: 192px;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 500;

    color: #8f8e8e;
}
.log {
    width: 360px;
    height: 50px;
    background: #829fff;
    border-radius: 5px;
    text-align: center;
}
</style>

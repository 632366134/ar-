<template>
    <div class="pageLogin">
        <div class="content">
            <el-form>
                <el-form-item label="账号用户名" :label-width="formLabelWidth"
                    ><el-input
                        v-model="form.account"
                        style="width: 300px"
                    ></el-input
                ></el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth"
                    ><el-input
                        v-model="form.tel"
                        style="width: 300px"
                    ></el-input
                ></el-form-item>
                <el-form-item label="联系人姓名" :label-width="formLabelWidth">
                    <el-input
                        v-model="form.linkName"
                        :label-width="formLabelWidth"
                        style="width: 300px"
                    ></el-input
                ></el-form-item>
                <el-form-item label="公司名称" :label-width="formLabelWidth">
                    <el-input
                        v-model="form.name"
                        :label-width="formLabelWidth"
                        style="width: 300px"
                    ></el-input
                ></el-form-item>
                <el-form-item label="联系人邮件" :label-width="formLabelWidth">
                    <el-input
                        v-model="form.linkEmail"
                        :label-width="formLabelWidth"
                        style="width: 300px"
                    ></el-input
                ></el-form-item>
                <el-form-item
                    label="请设置密码密码"
                    :label-width="formLabelWidth"
                    ><el-input
                        type="password"
                        v-model="form.pw"
                        style="width: 300px"
                    ></el-input
                ></el-form-item>
                <el-form-item
                    label="请再次输入密码"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        type="password"
                        v-model="form.pw1"
                        style="width: 300px"
                    ></el-input
                ></el-form-item>
                <div class="footer-btn">
                    <el-button
                        type="primary"
                        style="width: 100px"
                        @click="regis()"
                        >提交</el-button
                    >
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { registAPI } from '@/API'
export default {
    data() {
        return {
            form: {
                account: '',
                tel: '',
                pw: '',
                pw1: '',
                name: '',
                linkEmail: '',
                linkName: '',
            },
            formLabelWidth: '130px',
        }
    },
    methods: {
        func() {
            this.toPage('/Login')
        },
        regis(form) {
            if (
                this.form.account == '' ||
                this.form.account == undefined ||
                this.form.account == null
            ) {
                this.$message({
                    message: '请输入用户名',
                    type: 'warning',
                })
            } else if (
                this.form.name == '' ||
                this.form.name == undefined ||
                this.form.name == null
            ) {
                this.$message({ message: '请输入名称', type: 'warning' })
            } else if (
                this.form.linkName == '' ||
                this.form.linkName == undefined ||
                this.form.linkName == null
            ) {
                this.$message({ message: '请输入联系人姓名', type: 'warning' })
            } else if (
                this.form.pw == '' ||
                this.form.pw == undefined ||
                this.form.pw == null
            ) {
                this.$message({ message: '请输入密码', type: 'warning' })
            } else if (this.form.pw == this.form.pw1) {
                registAPI
                    .Regist({
                        customerAccount: this.form.account,
                        password: this.form.pw,
                        linkEmail: this.form.linkEmail,
                        name: this.form.name,
                        linkName: this.form.linkName,
                        linkPhone: this.form.tel,
                    })
                    .then((res) => {
                        if (res.code == 1000) {
                            this.func()
                            console.log(res.data)
                            this.$message({
                                message: '添加成功',
                                type: 'success',
                            })
                        }
                    })
            } else {
                this.$message({
                    message: '密码输入不一致',
                    type: 'warning',
                })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.pageLogin {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    max-width: 800px;
    height: 100%;
    align-items: center;
    height: 100%;
    align-items: center;
    justify-content: center;

    .content {
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.16);
        padding: 50px 80px;
        border: 2px solid #efefef;
    }
    .footer-btn {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
    // margin-top: 100px;
}
</style>

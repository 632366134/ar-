/**
 * 所有登录的接口
 */

import axios from "@/utils/axios.js"

const baseProject = 'arPcCustomerWeb/'


/**
 * 
 * 平台账号密码登录接口
 * @param {*} param0 
 */

const AdminLogin = (data) => {
    return axios({
        url: `${baseProject}customer/login`,
        data
    })
}

/**
 * 
 * 平台推出登录
 * @param {*} param0 
 */

const loginOut = (data) => {
    return axios({
        url: `${baseProject}staffUser/staffLogBack`,
        data
    })
}


export default {
    AdminLogin,
    loginOut
}
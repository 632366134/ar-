/**
 * 所有登录的接口
 */

import axios from "@/utils/axios.js"

const baseProject = 'arPcCustomerWeb/'


/**
 * 
 * 上传数据
 * @param {*} param0 
 */

const TableAdd = (data) => {
    return axios({
        url: `${baseProject}resource/insertProject`,
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
    TableAdd

}
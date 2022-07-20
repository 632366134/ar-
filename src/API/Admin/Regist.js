/**
 * 所有登录的接口
 */

import axios from "@/utils/axios.js"

const baseProject = 'arPcCustomerWeb/'


/**
 * 
 * 
 * @param {*} param0 
 */

const Regist = (data) => {
    return axios({
        url: `${baseProject}customer/register`,
        data
    })
}

/**
 * 
 * 

 */



export default {
    Regist

}
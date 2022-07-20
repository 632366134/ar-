import axios from "@/utils/axios.js"
const baseProject = 'arPcCustomerWeb/'
const baseBaiduProject = 'arOpenWeb/'
const baseFileProject = 'arFileWeb/'
const baseFileIp = '//file.arsnowslide.com/'
const wxMiniAppWeb = 'wxMiniAppWeb/'


/**
 * 获取雪花编号
 * @param {*} param0 
 */
const getSnowList = (data = { num: 1 }) => {
    return axios({
        url: `${baseProject}resource/getSnow`,
        data
    }).then(res => {
        if (res.code == 1000) {
            res.data = res.data.map((v) => '' + v)
        }
        // console.log(Array.from(new Set(res.data)).length, data.num, typeof data.num);
        if (Array.from(new Set(res.data)).length !== data.num) {
            return {
                cCode: 1006,
                message: "获取编号数量不一致"
            }
        }
        return res
    })
}
/**
 * 获取文件名称
 * @param {*} param0 
 */
const getCosFileName = (data = { fileNameNum: 1 }) => {
    return axios({
        url: `${baseFileProject}upLoad/getCosFileName?fileNameNum=${data.fileNameNum}`,
        ip: `${baseFileIp}`,
        data,
    })
}
/**
 * 百度图片上传
 * @param {*} param0 
 */
const putInStorage = (data) => {
    return axios({
        url: `${baseBaiduProject}bd/putInStorage`,
        data,
    })
}
/**
 * 华为云上传
 * @param {*} param0 
 */
const imageAdd = (data) => {
    return axios({
        url: `${baseBaiduProject}huawei/imageAdd`,
        data,
    })
}
/**
 * 获取图片路径
 * @param {*} data ["195360628956909568/195360837581590528/226449936531365888.png"]
 */
const getPicUrl = (data) => {
    return axios({
        url: `${baseProject}path/concatUrl`,
        data,
    })
}
/**
 * 获取小程序码
 * @param {*} data ["195360628956909568/195360837581590528/226449936531365888.png"]
 */
const getUnlimited = (data) => {
    return axios({
        url: `${wxMiniAppWeb}wx/getUnlimited`,
        data,
        responseType: 'ArrayBuffer'
    })
}
export default {
    getUnlimited,
    getPicUrl,
    imageAdd,
    putInStorage,
    getCosFileName,
    getSnowList,
}
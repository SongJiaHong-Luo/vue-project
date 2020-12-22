/**
 * @param {string} url
 * @returns {Object}
 */
// 处理请求参数,把请求路径上面的参数分离
function paramsObj(url) {
    // decodeURIComponent:用来编码和解码URI的，函数内部对URI进行编译
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(item => {
        const index = item.indexOf('=')
        if (index !== -1) {
            const name = item.substring(0, index)
            const val = item.substring(index + 1, item.length)
            obj[name] = val
        }
    })
    return obj
}
module.exports = {
    paramsObj
}
const Mock = require('mockjs')
// 引入相关mock文件
const user = require('./user')
const { paramsObj } = require('./utils')
// 解构出所有引入的mock文件
const mocks = [
    ...user,
]
function mockXHR() {
    // 模拟数据  mock patch
    Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
    Mock.XHR.prototype.send = function() {
        if (this.custom.xhr) {
            this.custom.xhr.withCredentials = this.withCredentials || false
            if (this.responseType) {
                this.custom.xhr.responseType = this.responseType
            }
        }
        this.proxy_send(...arguments)
    }
    function XHR2ExpressReqWrap(respond) {
        return function(options) {
            let result = null
            if (respond instanceof Function) {
                const { body, type, url } = options
                result = respond({
                    method: type,
                    body: JSON.parse(body),
                    query: paramsObj(url)
                })
            } else {
                result = respond
            }
        }
    }
    for (const i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
        
    }

}
module.exports = {
    mocks,
    mockXHR
}
// chokidar用于自动监听文件的变化的插件
const chokidar = require('chokidar')
// body-parser用于把客户端发送的HTTP请求体中纯文本的内容转换成JSON编码或者url编码处理以及对于文件的上传处理的对象形式供路由调用。
const bodyParser = require('body-parser')
// chalk用于添加背景颜色和颜色，让文本有颜色
const chalk = require('chalk')
const path = require('path')
const Mock = require('mockjs')
// process.cwd() 方法会返回 Node.js 进程的当前工作目录。
const mockDir = path.join(process.cwd(), 'mock')
// 设置注册虚假的服务器请求数据
function registerRoute(app) {
    let mockLastIndex
    const {mocks} = require('./index')
    const mocksForServer = mocks.map(route => {
        return responseFake(route.url, route.type, route.response)
    })
    console.log(mocksForServer)
    for(const mock of mocksForServer) {
        app[mock.type](mock.url,mock.response)
        mockLastIndex = app._router.stack.length
        console.log(mockLastIndex)
    }
    const mockRoutesLength = Object.keys(mocksForServer).length
    console.log(mockRoutesLength)
    return {
        mockRoutesLength: mockRoutesLength,
        mockStartIndex: mockLastIndex - mockRoutesLength
    }
}
function unRegisterRoute() {
    Object.keys(require.cache).forEach(i => {
        console.log(require)
        if (i.includes(mockDir)) {
            delete require.cache[require.resolve(i)]
        }
    })
}
// 模拟虚拟服务器返回数据
const responseFake = (url, type, respond) => {
    return {
        url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
        type: type || 'get',
        response(req, res) {
            console.log('request invoke'+ req.path)
            res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
        }
    }
}
module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    const mockRoutes = registerRoute(app)
    const mockRoutesLength = mockRoutes.mockRoutesLength
    const mockStartIndex = mockRoutes.mockStartIndex
    chokidar.watch(mockDir, {
        ignored: /mock-server/,
        ignoreInitial: true
    }).on('all', (Event, path) => {
        if(Event === 'change' || Event === "add") {
            try {
                // 移除mock routes stack
                app._router.stack.splice(mockStartIndex, mockRoutesLength)
                // 清楚routes缓存
                unRegisterRoute()
                const mockRoutes = registerRoute(app)
                mockRoutesLength = mockRoutes.mockRoutesLength
                mockStartIndex = mockRoutes.mockStartIndex
                console.log(chalk.blue(`\n > 模拟服务器重新加载成功！更改路径${path}`))
            }catch (err) {
                console.log(chalk.red(err))
            }
        }
    })
}
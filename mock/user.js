
// 用户相关的模拟数据
const userNames = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    },
}
// 设置用户信息
const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: '我是一个管理者',
        avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        roleName: '管理者'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: '我是一个编辑者',
        avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        roleName: '编辑者'
    }
}

// 导出用户相关数据
module.exports = [
    // 用户登录
    {
        url: '/user/login',
        type: 'post',
        response: config => {
            console.log(config)
            const { userName } = config.body
            // userName是一个变量根据userName的名称（admin或者editor）去寻找对应的token值 inUserName传入的username
            const inUserName = userNames[userName]
            // 如果token中用户名和传入的不一样
            if(!inUserName) {
                return {
                    code: 60240,
                    message: '您输入的用户名或者密码不正确'
                }
            }
            // 如果正确返回token
            return {
                code: 200,
                data: inUserName
            }
        }
    },
    // 获取用户信息
    {
        url: '/user/userInfo\.*',
        type: 'get',
        response: config => {
            console.log(config)
            const { token } = config.query
            // hen·-
            const info = users[token]
            // 如果token中用户名和传入的不一样
            if(!info) {
                return {
                    code: 60240,
                    message: '您输入的用户名或者密码不正确'
                }
            }
            // 如果正确返回token
            return {
                code: 200,
                data: info
            }
        }
    },
    // 登录退出
    {
        url: '/user/loginOut',
        type: 'post',
        response: _ => {
            return {
                code: 200,
                data: 'success'
            }
        }
    }
]
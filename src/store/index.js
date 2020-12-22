import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'
import user from './modules/user'

Vue.use(Vuex)
// require.context方法是把文件夹中的所有的引进，不需要通过import一个一个迎  require.context(directory, useSubdirectories, regExp)
// directory: 要查找的文件路径
// useSubdirectories: 是否查找子目录
// regExp: 要匹配文件的正则
const modulesFiles = require.context('./modules',true, /\.js$/)
// reduce的参数为一个回调函数，reduce(function(上一个回调的返回值或初始值，当前要处理的数组，当前要处理的数组的索引，原数组),初始值)
const modules = modulesFiles.keys().reduce((modules,modulePath) => {
    // 把'./app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
},{})
const store = new Vuex.Store({
    modules,
    user,
    getters
})
export default store

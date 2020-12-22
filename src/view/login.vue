<!-- 登录页面 -->
<template>
  <div class="loginMain">
    <div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginRules"
        ref="loginFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="loginBtn">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {validUsername} from '../utils/validate'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 自定义验证方法
    const checkName = (rule,value,cb) => {
      if(value === '') {
        cb(new Error('请输入用户名'))
      }else {
        const n = value.length;
        const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        if(n<1 || n>6) {
          cb(new Error('请输入长度为1-6的用户名'))
        }else if(!reg.test(value)) {
          cb(new Error('您输入的用户名不合法'))
        }
      }
    }
     const checkPass = (rule,value,cb) => {
      if(value === '') {
        cb(new Error('请输入密码'))
      }else {
        const n = value.length;
        const reg1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if(!reg1.test(value)) {
          cb(new Error('您输入的密码必须包含数字和字母，并且在6-18位'))
        }
      }
    }
    //这里存放数据
    return {
      loginForm: {
        userName: "admin",
        password: "sdf1234",
      },
      age: 16,
      loginRules: {
        userName: [
            { required: true, validator: this.checkName, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: this.checkPass, trigger: 'blur' }
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //   登录按钮
    loginBtn() {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm)
          .then((res) => {
            console.log(res)
            // this.$router.push({path: })
          })
        }
        // const {data: res} = await this.$http.post('list',this.loginForm);
        // console.log(res);
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>
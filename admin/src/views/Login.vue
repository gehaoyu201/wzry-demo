<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <!--监听form表单原生的表单事件，prevent阻止表单的默认提交不要跳转页面-->
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  components: {},
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      // window.console.log(res.data);
      //sessionStorage.token = res.data.token   //浏览器关闭就没了
      localStorage.token = res.data.token; //浏览器关闭了还在
      localStorage.username = this.model.username;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登陆成功"
      });
    }
  }
};
</script>

<style scope>
.login-container {
  width: 25rem;
  margin: 4rem auto;
}
</style>



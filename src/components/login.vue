<template>
    <div class="login">
        <div class="panel">
            <el-input placeholder="用户名" v-model="username"></el-input>
            <el-input placeholder="密码" type="password" v-model="password"></el-input>
            <el-button @click="login" type="primary">登陆</el-button>
            <el-button @click="register">注册</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: "LoginPanel",
    data() {
        return {
            username: '',
            password: ''
        };
    },
    computed: {
    },
    methods: {
        login() {
            let self = this
            this.$http.get("http://124.220.17.233:8888", {
                params: {
                    style: "login",
                    name: self.username,
                    password: self.password
                }
            }).then(res => {
                //请求成功，触发then中的函数
                if (res.data) {
                    sessionStorage.logined = true
                    sessionStorage.username = self.username
                    self.success()
                } else {
                    alert('账号密码错误')
                }
            })
                .catch(error =>
                    //请求失败，触发catch中的函数 可省略
                    console.log(error));
        },
        register() {
            let self = this
            this.$http.get("http://124.220.17.233:8888", {
                params: {
                    style: "register",
                    name: self.username,
                    password: self.password
                }
            }).then(res => {
                //请求成功，触发then中的函数
                console.log(res)
                if (res.data=='注册成功') {
                    sessionStorage.logined = true
                    sessionStorage.username = self.username
                    self.success()
                } else {
                    alert('账号名已存在')
                }
            })
                .catch(error =>
                    //请求失败，触发catch中的函数 可省略
                    console.log(error));
        },
        success() {
            this.$router.push({ path: "/user" });
        },
    },
    mounted() {
    },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
    width: 100%;
    background-color: #91959a93;
    text-align: center;
}

.el-input {
    position: relative;
    font-size: 14px;
    width: 80%;
    margin: 20px 0 0 0;
    display: inline-block;
}

.el-button {
    margin: 20px;
}
</style>
  
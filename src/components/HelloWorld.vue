<template>
  <div class="menu">
    <div class="top">
      <el-button @click="back" icon="el-icon-arrow-left" class="back" type="primary"></el-button>
      <el-button @click="goHome" class="user" circle></el-button>
    </div>
    <div>
      <!-- <keep-alive> -->
        <router-view />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>
<script>
//import { RouterLink } from 'vue-router';

export default {
  name: "HelloWorld",
  data() {
    return {
      data: [],
      user: '',
      logined: false,
    };
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    },
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/user" });
    },
    back() {
      this.$router.go(-1);
    },
    getUser() {
      return sessionStorage.username
    }
  },
  mounted() {
    this.user = this.getUser()
  },
  //components: { RouterLink }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  background-color: #409EFF;
  height: 22px;
  padding: 8px;
}

.link {
  color: aliceblue;
  text-decoration: none;
}

.user {
  float: right;
}

.back {
  float: left;
  padding: 0;
  width: 20px;
  height: 22px;
}

.menu {
  width: 100%;
  height: 100%;
}

.login {}
</style>

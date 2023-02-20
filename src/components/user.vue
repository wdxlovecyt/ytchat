<template>
    <div class="panel">
        <div class="search">
            <div class="inputpanel">
                <el-input placeholder="搜索好友" size="small" v-model="name" @keyup.enter.native="search">
                </el-input>
            </div>
            <div class="sendpanel">
                <el-button @click="search" type="primary" size="mini" round>发送</el-button>
            </div>

        </div>
        <div id="2" class="friends">
            <div class="friend" v-for="item in users" :key="item.name" @click="talk(item.name)">
                <div class="content">
                    <button class="photo"></button><span class="name">{{ item.name }}</span>
                </div>
            </div>
        </div>
        <div id="1" class="friends">
            <div class="friend" v-for="item in friends" :key="item.name" @click="talk(item.name)">
                <div class="content">
                    <button class="photo"></button><span class="name">{{ item.name }}</span>
                </div>
            </div>
        </div>
        <div class="send">
            <el-button @click="exit" size="mini" round>退出登陆</el-button>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'UserPanel',
    data() {
        return {
            data: [],
            name: '',
            friends: [],
            users: []
        }
    },
    methods: {
        search() {
            let self = this
            this.$http.get("http://124.220.17.233:8888", {
                params: {
                    style: "search",
                    name: self.name
                }
            }).then(res => {
                //请求成功，触发then中的函数
                console.log(res)
                self.users = res.data
            })
        },
        talk(name) {
            console.log(name)
            sessionStorage.friendname = name
            this.$router.push({ path: "/chat" });
        },
        load() {
            let self = this
            this.$http.get("http://124.220.17.233:8888", {
                params: {
                    style: "load",
                    name: sessionStorage.username
                }
            }).then(res => {
                //请求成功，触发then中的函数
                if (res.data != null) {
                    self.friends = [{ name: res.data }]
                }
            })
        },
        exit() {
            this.$router.push({ path: "/login" });
        }
    },
    mounted() {
        this.load()
    },
    activated() {
        this.load()
    },
    updated() {

    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
    /* position: absolute; */
    width: 100%;
    background-color: rgb(204, 211, 217);
    top: 38;
    height: 42px;
}

.el-input {
    margin: 5px;
}

.inputpanel {
    display: inline-block;
    width: 80%;
}

.sendpanel {
    display: inline-block;
    width: 19%;
}

.panel {
    background-color: rgb(255, 255, 255);
}

.friends {
    /* position: absolute; */
    width: 100%;
    overflow: scroll;
}

.friend {
    margin: 1px 0;
    display: flex;
}

.content {
    text-align: left;
    background-color: rgb(236, 239, 241);
    border-radius: 5px;
    width: 100%;
    display: inline-block;
    padding: 5px;
}

.name {
    font-size: 12px;
    position: absolute;
    margin: 4px 10px;
}

.photo {
    width: 20px;
    height: 20px;
    position: relative;
    top: 2px;
    border-radius: 10px;
    background-color: white;
    border: none;
}

.send {
    position: absolute;
    width: 100%;
    background-color: rgba(255, 255, 255, 0);
    bottom: 0;
    height: 30px;
}
</style>
  
<template>
    <div class="panel">
        <div class="friend"><button class="photo"></button>{{ name }}</div>
        <div id="1" class="messages">
            <div class="message" v-for="item in data" :key="item.id">
                <div :class="item.user == user ? 'Ucontent' : 'content'">{{ item.content }}</div>
            </div>
        </div>
        <div class="send">
            <div class="inputpanel">
                <el-input size="small" v-model="msg" @keyup.enter.native="send">
                </el-input>
            </div>
            <div class="sendpanel">
                <el-button @click="send" type="primary" size="mini" round>发送</el-button>
            </div>

        </div>
    </div>
</template>
  
<script>
import io from 'socket.io-client'
const socket = io('ws://124.220.17.233:8888')
export default {
    name: 'ChatPanel',
    //props:['user'],
    data() {
        return {
            data: [],
            msg: '',
            user: '',
            name: ''
        }
    },
    methods: {
        send() {
            let self = this
            socket.emit('send', { user: self.user, content: self.msg,file:[self.user + sessionStorage.friendname, sessionStorage.friendname + self.user]})
            self.msg = ''
        },
        scrolltest() {
            var div = document.getElementById("1");
            div.scrollTop = div.scrollHeight;
        },
        getUser() {
            return sessionStorage.username
        }
    },
    mounted() {
        let self = this
        this.name = sessionStorage.friendname
        console.log(this.name)
        this.user = this.getUser()
        socket.emit('load', [self.user + sessionStorage.friendname, sessionStorage.friendname + self.user])
        socket.on('getload', (msg) => {
            self.data = msg
        })
        socket.on('receive', (msg) => {
            self.data.push(msg)
        })

    },
    updated() {
        this.scrolltest()
    },
    activated() {
        this.name = sessionStorage.friendname
        this.scrolltest()
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.friend {
    background-color: rgba(191, 197, 201, 0.405);
    height: 30px;
    width: 100%;
    color: rgb(7, 7, 7);
}

.send {
    position: absolute;
    width: 100%;
    background-color: rgb(204, 211, 217);
    bottom: 0;
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

.messages {
    position: absolute;
    width: 100%;
    top: 80px;
    bottom: 42px;
    overflow: scroll;
}

.message {
    margin: 10px 0;
    display: flex;
}

.content {
    background-color: rgb(210, 213, 216);
    border-radius: 5px;
    width: auto;
    display: inline-block;
    padding: 10px;
}

.Ucontent {
    background-color: rgb(118, 163, 207);
    border-radius: 5px;
    width: auto;
    display: inline-block;
    padding: 10px;
    margin-left: auto;
    margin-right: 10px;
}
.photo {
    width: 20px;
    height: 20px;
    position: relative;
    top: 5px;
    border-radius: 10px;
    background-color: white;
    border: none;
    margin-right: 10px;
}
</style>
  
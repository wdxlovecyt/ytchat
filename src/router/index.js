//1.导入VueRouter
import Vue from "vue";
import VueRouter from 'vue-router'
import User from "../components/user.vue";
import Chat from "../components/chat.vue";
import Login from "../components/login.vue";
//2.使用路由
Vue.use(VueRouter);
//3.创建VueRouter的实例

const router = new VueRouter({
    //tips:不想要 #（锚点）就添加下面代码
    //mode:'history',
    //4.配置路由的path和组件
    routes: [
        {
            path: "/user",
            name: 'home',
            component: User,
        },
        {
            path: "/chat",
            name: 'chat',
            component: Chat,
        },
        {
            path: "/login",
            name: 'login',
            component: Login,
        },
    ]
})
// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

//5.导入路由实例
export default router


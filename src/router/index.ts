import {createRouter, createWebHistory} from 'vue-router'
import {routes} from './routes'
// import {userInfo} from "../store/user";

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach(async () => {
//     const user = userInfo()
//     if(user.getUserInfo.isLogin === false) {
//         return router.push('/login')
//     } else {
//         return true
//     }
//
// })

export default router

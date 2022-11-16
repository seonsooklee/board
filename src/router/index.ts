import {createRouter, createWebHistory} from 'vue-router'
import {routes} from './routes'
import {userInfo} from "../store/user";

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, fo) => {
    const user = userInfo()
    if (!user.getUserInfo.isLogin) {
        if (to.path === '/login') {
            return true;
        }
        return '/login'

    } else {
        if (to.path === '/login') {
            return '/main';
        }
        return true
    }
})

export default router

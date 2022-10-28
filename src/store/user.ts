import {defineStore} from 'pinia'
import {computed, ref} from "vue";

export const userInfo = defineStore('user', () => {

    const user = ref({
        email: null,
        auth: null,
        isLogin: false,
    });

    const addUserInfo = (param: any) => {
        user.value = param
    }

    const getUserInfo = computed(() => {
        return  user.value
    })

    return { user, addUserInfo, getUserInfo }

})

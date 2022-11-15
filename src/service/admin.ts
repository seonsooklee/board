import { instance } from "../modules/axios";

const fetchUserList = (page: number, size: number) => {
    return instance.get(`member/all?page=${page}&size=${size}`)
}

const editUser = (data: object) => {
    return instance.put(`member`, data)
}

const editAuth = (data: object) => {
    return instance.put(`member/auth`, data)
}

const deleteUser = (email: string) => {
    return instance.delete(`member/${email}`)
}

const fetchUserDetail = (email: string) => {
    return instance.get(`member/?email=${email}`)
}

const search = (search: string) => {
    return instance.get(`member/?email=${search}`)
}

export default {
    fetchUserList,
    editUser,
    editAuth,
    deleteUser,
    fetchUserDetail,
    search
}

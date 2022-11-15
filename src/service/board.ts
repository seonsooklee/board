import { instance } from "../modules/axios";

const fetchList = (page: number, size: number) => {
    return instance.get(`board/all?page=${page}&size=${size}`)
}

const search = (value: string) => {
    return instance.get(`board/${value}`)
}

const addItem = (data: object) => {
    return instance.post('board', data)
}

const editItem = (data: object) => {
    return instance.put('board', data)
}

const fetchDetail = (id: string ) => {
    return instance.get(`board/${id}`)
}

const deleteItem = (seq: string) => {
    return instance.delete(`board/${seq}`)
}

const postReply = (data: object) => {
    return instance.post(`board/reply`, data)
}

const updateReply = (data: object) => {
    return instance.put(`board/reply`, data)
}

const deleteReply = (id: string) => {
    return instance.delete(`board/reply/${id}`)
}

export default {
    fetchList,
    search,
    addItem,
    editItem,
    fetchDetail,
    deleteItem,
    postReply,
    updateReply,
    deleteReply
}

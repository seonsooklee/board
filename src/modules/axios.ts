import axios from "axios";

const toTokenJson = () => {
    const token = localStorage.getItem('originalToken')
    if (token) {
        return token?.replace(/\"/gi, "")
    }
}

export const instance = axios.create({
    baseURL:'https://jssampletest.herokuapp.com/api/',
    timeout: 600000,
    headers: {
        Authorization: 'Bearer ' + toTokenJson()
    }
})



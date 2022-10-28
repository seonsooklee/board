const toTokenJson = () => {
    const token = localStorage.getItem('originalToken')
    if (token) {
        return token?.replace(/\"/gi, "")
    }
}

export const instance = () => {
    return {
        headers: {
            Authorization: 'Bearer ' + toTokenJson()
        }
    }
}

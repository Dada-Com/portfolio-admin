import axious from "axios"

const API = axious.create({
    baseURL: "http://localhost:8081"
})

export default API
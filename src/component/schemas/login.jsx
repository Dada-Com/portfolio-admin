import * as Yup from "yup"

export const LoginSchema = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please provide a valid password")
})
import React from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../style/loginpage.css"
import { Form, Formik, useFormik } from 'formik'
import { LoginSchema } from "../component/schemas/login"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "../../node_modules/react-toastify/dist/ReactToastify.css"
import api from "../component/api_client/api"
const loginpage = () => {
    const initialValues = {
        username: "",
        password: ""
    }
    const { values, touched, errors, setFieldValue, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: LoginSchema,
        onSubmit: (values, action) => {
            console.log(values)
            toast.success("Sucessfully Submited")
        }
    })

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const allInputvalue = {
            username: values.username,
            password: values.password,
        }
        if (errors.username && touched.username || errors.password && touched.password
            || values.username === "" || values.password === "") {
            toast.error("Please fill required fields")
        } else {
            try {
                const res = await api.post("/api/auth/login", allInputvalue)
                // console.log(res.data)
                if (res.data === true) {
                    navigate("/adminpanel/homeedit")
                    toast.success("login sucessful")
                } else {
                    toast.error("login fail")
                }
            } catch (error) {
                console.log(error)
            }

        }
    };
    return (
        <div className='contain2 '>
            <div className='title'>Login</div>
            <form onSubmit={handleSubmit}>
                <div className="form-floating uname ">
                    <input type="username"
                        className={errors.username && touched.username ? "form-control inputerror" : "form-control"}
                        id="username"
                        name="username"
                        placeholder="name@example.com"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    <label htmlFor="floatingInput">UserName</label>
                    {errors.username && touched.username ? (
                        <p className="form-error">{errors.username}</p>
                    ) : null}
                </div>
                <div className="form-floating pass ">
                    <input type="password"
                        className={errors.password && touched.password ? "form-control inputerror" : "form-control"}
                        id="password"
                        name='password'
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    <label htmlFor="floatingPassword">Password</label>
                    {errors.password && touched.password ? (
                        <p className="form-error">{errors.password}</p>
                    ) : null}
                </div>
                <button type="submit"
                    id='buttons'
                    className="btn btn-primary"
                >Login</button>
            </form>
        </div>
    )
}


export default loginpage;

/*
const res =  await api.post("/api/auth/login", allInputvalue)
                .then(response=>{
                    toast.success("login sucessful")
                    if (response.data === true) {
                        navigate("/adminpanel/homeedit")
                    }
                    console.log(response)
                })
                .catch(error => {
                    toast.error("login fail")
                    console.log(error)
                })
*/
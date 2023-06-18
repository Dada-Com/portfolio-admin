import React, { useState } from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../style/signuppage.css"
import api from "../component/api_client/api"
import { toast } from 'react-toastify'
import "../../node_modules/react-toastify/dist/ReactToastify.css"
const signuppage = () => {
    const [signupvalue, setSignupvalue] = useState({
        username: "",
        adminid: "",
        password: "",
        reenterpassword: ""
    });

    const handleInput = (e) => {
        const { id, value } = e.target;
        setSignupvalue({ ...signupvalue, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const allInputvalue = {
            username: signupvalue.username,
            adminid: signupvalue.adminid,
            password: signupvalue.password,
        };
        if (signupvalue.password.match(signupvalue.reenterpassword)) {
            api.post("/api/auth/signup", allInputvalue)
                .then(response => {
                    console.log(response)
                    toast.success("User is registered successful")
                    setSignupvalue({
                        username: "",
                        adminid: "",
                        password: "",
                        reenterpassword: ""
                    })
                })
                .catch(error => {
                    console.log(error)
                    toast.error("User is registered fail")
                })
        }
    };
    return (
        <div className='contain1 '>
            <div className='title'>Sign up</div>
            <div className="form-floating uname">
                <input type="email"
                    className="form-control"
                    id="username"
                    placeholder="name@example.com"
                    value={signupvalue.username}
                    onChange={handleInput}
                />
                <label id='lable' htmlFor="floatingInput">UserName</label>
            </div>
            <div className="form-floating adminid">
                <input type="text"
                    className="form-control"
                    id="adminid"
                    placeholder="name@example.com"
                    value={signupvalue.adminid}
                    onChange={handleInput}
                />
                <label id='lable' htmlFor="floatingInput">Admin ID</label>
            </div>
            <div className="form-floating pass ">
                <input type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={signupvalue.password}
                    onChange={handleInput}
                />
                <label id='lable' htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating repass ">
                <input type="password"
                    className="form-control"
                    id="reenterpassword"
                    placeholder="Password"
                    value={signupvalue.reenterpassword}
                    onChange={handleInput} />
                <label id='lable' htmlFor="floatingPassword">Re-enter Password</label>
            </div>
            <button type="button" onClick={handleSubmit} className="btn btn-primary" id='button'>Signup</button>
        </div>
    )
}


export default signuppage;

import React from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'
import '../style/adminnavigation.css'
import { Outlet } from 'react-router-dom'
/* about blog work contact contact-response*/
const adminnavigation = () => {
    // let user = JSON.parse(localStorage.getItem('user-info'))
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bolder" id='Linkk' to="/adminpanel/homeedit">Admin Panel</Link >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active  fw-bold" id='LinkI' aria-current="page" to="/adminpanel/homeedit">Home</Link >
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active fw-bold" id='LinkI' aria-current="page" to="/adminpanel/aboutedit">About</Link >
                            </li>
                            {/* <li className="nav-item">
                            <Link className="nav-link fw-bold" to="/adminpanel/blogedit">Blog</Link >
                        </li> */}
                            <li className="nav-item">
                                <Link className="nav-link fw-bold" id='LinkI' to="/adminpanel/workedit">Work</Link >
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link fw-bold " id='LinkI' to="/adminpanel/contactedit">Contact</Link >
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold" id='LinkI' to="/adminpanel/contactresponse" >Contact Response</Link >
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default adminnavigation
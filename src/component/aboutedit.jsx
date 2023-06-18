import React, { useState, useRef, useEffect } from 'react'
import '../style/aboutedit.css'
import { Form, Formik, useFormik } from 'formik'
import { toast } from 'react-toastify'
import { HomeSchema } from "../component/schemas"
import api from "../component/api_client/api"
const aboutedit = ({ data1 }) => {
    const initialValues = {
        aid: "",
        aboutus: "",
        education: "",
        skills: ""
    }
    const { values, touched, errors, setFieldValue, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: HomeSchema,
        onSubmit: (values, action) => {
            console.log(values)
            toast.success("Sucessfully Submited")
        }
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        const allInputvalue = {
            aid: values.aid,
            aboutus: values.aboutus,
            education: values.education,
            skills: values.skills
        };
        if (errors.aid && touched.aid || errors.aboutus && touched.aboutus || errors.education && touched.education
            || errors.skills && touched.skills
            || values.aid === "" || values.aboutus === "" || values.education === "" || values.skills === "") {
            toast.error("Please fill all required fields")
        }
        else {
            api.post("/api/about/abouttypes2", allInputvalue)
                .then(response => {
                    console.log(response)
                    toast.success("Sucessfully Submitted")
                })
                .catch(error => {
                    toast.error("Unsucessfull to Submit Details")
                    console.log(error)
                })
            clearDefault()
        }
    };

    const updatehandle = async (e) => {
        e.preventDefault();
        const allInputvalue = {
            aboutus: values.aboutus,
            education: values.education,
            skills: values.skills
        };
        if (errors.aboutus && touched.aboutus || errors.education && touched.education
            || errors.skills && touched.skills
            || values.aboutus === "" || values.education === "" || values.skills === "") {
            toast.error("Please fill all required fields for updating data")
        }
        else {
            await api.patch(`/api/about/update/${values.aid}`, allInputvalue)
                .then(response => {
                    console.log(response)
                    toast.success("Sucessfully Updated")
                })
                .catch(error => {
                    toast.error("Unsucessfull to Update")
                    console.log(error)
                })
            clearDefault
        }

    };

    const deletehandle = async (e) => {
        e.preventDefault();
        if (errors.aid && touched.aid
            || values.aid === "") {
            toast.error("Please fill all required fields for deletion")
        }
        else {
            api.delete(`/api/about/delete/${values.aid}`)
                .then(response => {
                    console.log(response)
                    toast.success("Sucessfully Deleted")
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Unsucessfull to Delete")
                })
        }
        clearDefault
    };
    const clearDefault = () => {
        document.getElementById("aid").value = ""
        document.getElementById("aboutus").value = ""
        document.getElementById("education").value = ""
        document.getElementById("skills").value = ""
        setFieldValue("aid", "")
        setFieldValue("skills", "")
        setFieldValue("aboutus", "")
        setFieldValue("education", "")
        setFieldValue("", "")
    };
    const clear = async (e) => {
        e.preventDefault();
        document.getElementById("aid").value = ""
        document.getElementById("aboutus").value = ""
        document.getElementById("education").value = ""
        document.getElementById("skills").value = ""
        setFieldValue("aid", "")
        setFieldValue("skills", "")
        setFieldValue("aboutus", "")
        setFieldValue("education", "")
        setFieldValue("", "")
    };
    if (!data1) {
        return <div>Loading...</div>; // Show a loading state while data is being fetched
    }
    return (
        <div className='maincontainer'>
            <div className='viewcontainer'>
                <div className='datad' >
                    <h1 id='titleview'>About View Panel</h1>
                </div>
                <div className='datad'>
                    <h3>About ID :</h3>
                    <p><b>{data1.aid}</b></p>
                </div>
                <div className='datad'>
                    <h3>About :</h3>
                    <p>{data1.aboutus}</p>
                </div>
                <div className='datad'>
                    <h3>Education :</h3>
                    <p>{data1.education}</p>
                </div>
                <div className='datad'>
                    <h3>Skills :</h3>
                    <p>{data1.skills}</p>
                </div>
            </div>
            <div className='editcontainer'>
                <div className='dataedit' >
                    <h1 id='titleview'>About Edit Panel</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating dataedit1">
                        <input
                            type="text"
                            className={errors.aid && touched.aid ? "form-control inputerror" : "form-control"}
                            id="aid"
                            placeholder="xyz"
                            value={values.aid}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="aid">Identity No</label>
                        {errors.aid && touched.aid ? (
                            <p className="form-error">{errors.aid}</p>
                        ) : null}
                    </div>
                    <div className="form-floating dataedit">
                        <textarea className={errors.aboutus && touched.aboutus ? "form-control inputerror" : "form-control"}
                            placeholder="Leave a comment here"
                            id="aboutus"
                            value={values.aboutus}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></textarea>
                        <label htmlFor="aboutus">About Us</label>
                        {errors.aboutus && touched.aboutus ? (
                            <p className="form-error">{errors.aboutus}</p>
                        ) : null}
                    </div>
                    <div className="form-floating dataedit">
                        <textarea className={errors.education && touched.education ? "form-control inputerror" : "form-control"}
                            placeholder="Leave a comment here"
                            id="education"
                            value={values.education}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></textarea>
                        <label htmlFor="descrp">Education</label>
                        {errors.education && touched.education ? (
                            <p className="form-error">{errors.education}</p>
                        ) : null}
                    </div>
                    <div className="form-floating dataedit">
                        <textarea className={errors.skills && touched.skills ? "form-control inputerror" : "form-control"}
                            placeholder="Leave a comment here"
                            id="skills"
                            value={values.skills}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></textarea>
                        <label htmlFor="skills">Skills</label>
                        {errors.skills && touched.skills ? (
                            <p className="form-error">{errors.skills}</p>
                        ) : null}
                    </div>
                    <div className="buttoncontain">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" onClick={updatehandle} className="btn btn-primary">Update</button>
                        <button type="button" onClick={deletehandle} className="btn btn-primary">Delete</button>
                        <button type="button" onClick={clear} className="btn btn-primary">
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default aboutedit



  // const handleInput1 = (e) => {
    //     const { id, value } = e.target;
    //     setFormvalue1({ ...formvalue1, [id]: value });
    // };
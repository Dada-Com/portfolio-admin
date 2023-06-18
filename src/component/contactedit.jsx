import React, { useState, useRef, useEffect } from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../style/contactedit.css'
import { ContactSchema } from "../component/schemas/contact"
import { toast } from 'react-toastify'
import { Form, Formik, useFormik } from 'formik'
import api from "../component/api_client/api"
const contactedit = ({ data2 }) => {
    const initialValues = {
        contactid: "",
        descrip: "",
        address: "",
        contactno: "",
        email: "",
    }
    const { values, touched, errors, setFieldValue, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: ContactSchema,
        onSubmit: (values, action) => {

        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const allInputvalue = {
            contactid: values.contactid,
            descrip: values.name,
            address: values.address,
            contactno: values.contactno,
            email: values.email,
        };
        if (errors.contactid && touched.contactid || errors.descrip && touched.descrip
            || errors.address && touched.address || errors.contactno && touched.contactno ||
            errors.email && touched.email
            || values.contactid === "" || values.descrip === "" || values.address === ""
            || values.contactno === "" || values.email === "" || values.email === "") {
            toast.error("Please fill all required fields")
        }
        else {
            await api.post("/api/contact/contacttypes", allInputvalue)
                .then(response => {
                    console.log(response)
                    toast.success("Sucessfully Submitted")
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Unsucessfull to Submit Details")
                })
            clearDefault()
        }
    };

    const updatehandle = async (e) => {
        e.preventDefault();
        const allInputvalue = {
            descrip: values.name,
            address: values.address,
            contactno: values.contactno,
            email: values.email,
        };
        if (errors.contactid && touched.contactid || errors.descrip && touched.descrip
            || errors.address && touched.address || errors.contactno && touched.contactno ||
            errors.email && touched.email
            || values.contactid === "" || values.descrip === "" || values.address === ""
            || values.contactno === "" || values.email === "" || values.email === "") {
            toast.error("Please fill all required fields for update operation")
        }
        else {
            api.patch(`/api/contact/update/${values.contactid}`, allInputvalue)
                .then(response => {
                    console.log(response)
                    toast.success("Sucessfully Updated")
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Unsucessfull to Update")
                })
            clearDefault()
        }
    };

    const deletehandle = async (e) => {
        e.preventDefault();
        if (errors.contactid && touched.contactid || values.contactid === "") {
            toast.error("Please fill all required fields for delete opretion")
        }
        else {
            api.delete(`/api/contact/delete/${values.contactid}`)
                .then(response => {
                    console.log(response)
                    toast.success("Sucessfully Deleted")
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Unsucessfull to Delete")
                })
            clearDefault()
        }
    };
    const clearDefault = () => {
        setFieldValue("contactid", "")
        setFieldValue("descrip", "")
        setFieldValue("address", "")
        setFieldValue("contactno", "")
        setFieldValue("email", "")
        setFieldValue("", "")
        document.getElementById("contactid").value = ""
        document.getElementById("descrip").value = ""
        document.getElementById("address").value = ""
        document.getElementById("contactno").value = ""
        document.getElementById("email").value = ""
    };
    const clear = (e) => {
        e.preventDefault();
        setFieldValue("contactid", "")
        setFieldValue("descrip", "")
        setFieldValue("address", "")
        setFieldValue("contactno", "")
        setFieldValue("email", "")
        setFieldValue("", "")
        document.getElementById("contactid").value = ""
        document.getElementById("descrip").value = ""
        document.getElementById("address").value = ""
        document.getElementById("contactno").value = ""
        document.getElementById("email").value = ""
    };

    if (!data2) {
        return <div>Loading...</div>; // Show a loading state while data is being fetched
    }
    return (
        <div className='maincontainer4'>
            <div className='editcontainer4'>
                <div className='dataedit' >
                    <h1 id='titleview'>Contact Edit Panel</h1>
                </div>
                <div className="form-floating dataedit4">
                    <input type="text"
                        className={errors.contactid && touched.contactid ? "form-control inputerror" : "form-control"}
                        id="contactid"
                        placeholder="xyz"
                        value={values.contactid}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    <label htmlFor="floatingInput">Contact Id</label>
                    {errors.contactid && touched.contactid ? (
                        <p className="form-error">{errors.contactid}</p>
                    ) : null}
                </div>
                <div className="form-floating dataedit4">
                    <textarea className={errors.descrip && touched.descrip ? "form-control inputerror" : "form-control"}
                        placeholder="Leave a comment here"
                        id="descrip"
                        value={values.descrip}
                        onChange={handleChange}
                        onBlur={handleBlur}></textarea>
                    <label htmlFor="floatingTextarea2">Description</label>
                    {errors.descrip && touched.descrip ? (
                        <p className="form-error">{errors.descrip}</p>
                    ) : null}
                </div>
                <div className="form-floating dataedit4">
                    <input type="text"
                        className={errors.address && touched.address ? "form-control inputerror" : "form-control"}
                        id="address"
                        placeholder="xyz"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    <label htmlFor="floatingInput">Address</label>
                    {errors.address && touched.address ? (
                        <p className="form-error">{errors.address}</p>
                    ) : null}
                </div>
                <div className="form-floating dataedit4">
                    <input type="text"
                        className={errors.contactno && touched.contactno ? "form-control inputerror" : "form-control"}
                        id="contactno"
                        placeholder="xyz"
                        value={values.contactno}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    <label htmlFor="floatingInput">Contact No</label>
                    {errors.contactno && touched.contactno ? (
                        <p className="form-error">{errors.contactno}</p>
                    ) : null}
                </div>
                <div className="form-floating dataedit4">
                    <input type="text"
                        className={errors.email && touched.email ? "form-control inputerror" : "form-control"}
                        id="email"
                        placeholder="xyz"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    <label htmlFor="floatingInput">Email</label>
                    {errors.email && touched.email ? (
                        <p className="form-error">{errors.email}</p>
                    ) : null}
                </div>
                <div className="buttoncontain4">
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                    <button type="button" onClick={updatehandle} className="btn btn-primary">Update</button>
                    <button type="button" onClick={deletehandle} className="btn btn-primary">Delete</button>
                    <button type="button" onClick={clear} className="btn btn-primary">
                        Clear
                    </button>
                </div>
            </div>
            <div className='d-flex flex-column viewcontainer4'>
                <h1 className="flex-row titlr">Contact Details</h1>
                <p className="flex-row descrp"><b>Contact Id : </b> {data2.contactid}</p>
                <p className="flex-row descrp"><b>Descripition : </b> {data2.descrip}</p>
                <div className="flex-row address">
                    <p><FaMapMarkerAlt size={25} color="black" /> {data2.address}</p>
                </div>
                <p id='phone'><FaPhone size={25} color="black" /> {data2.contactno}</p>
                <p id='email'><FaEnvelope size={25} color="black" /> {data2.email}</p>

            </div>
        </div>
    )
}

export default contactedit
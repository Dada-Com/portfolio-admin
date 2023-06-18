import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Form, Formik, useFormik } from 'formik'
import '../style/homeedit.css'
import { HomeSchema } from "../component/schemas"
import { toast } from 'react-toastify'
import api from "../component/api_client/api"

const homeedit = ({ data }) => {
    const fileInputRef = useRef();
    const initialValues = {
        pid: "",
        name: "",
        descrp: "",
        tlink: "",
        llink: "",
        glink: "",
        imgsrc: "",
        logo: "",
    }
    const { values, touched, errors, setFieldValue, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: HomeSchema,
        onSubmit: (values, action) => {
            // console.log(values)
            toast.success("Sucessfully Submited")
        }
    })
    const [previewUrl, setPreviewUrl] = useState("");
    useEffect(() => {
        if (!values.imgsrc) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(values.imgsrc);
    }, [values.imgsrc]);
    // console.log(errors)
    // console.log(values.imgsrc)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const allInputvalue = {
            pid: values.pid,
            name: values.name,
            descrp: values.descrp,
            tlink: values.tlink,
            llink: values.llink,
            glink: values.glink,
            imgsrc: previewUrl,
            logo: values.logo,
        };
        if (errors.descrp && touched.descrp || errors.glink && touched.glink || errors.imgsrc && touched.imgsrc
            || errors.llink && touched.llink || errors.logo && touched.logo || errors.name && touched.name ||
            errors.pid && touched.pid || errors.tlink && touched.tlink
            || values.descrp === "" || values.glink === "" || values.imgsrc === "" || values.tlink === ""
            || values.llink === "" || values.logo === "" || values.name === "" || values.pid === "") {
            toast.error("Please fill all required fields")
        }
        else {
            await api.post("/api/hometypes2", allInputvalue)
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
    }

    const updatehandle = () => {
        // e.preventDefault();
        const allInputvalue = {
            name: values.name,
            descrp: values.descrp,
            tlink: values.tlink,
            llink: values.llink,
            glink: values.glink,
            imgsrc: previewUrl,
            logo: values.logo,
        };
        if (errors.descrp && touched.descrp || errors.glink && touched.glink || errors.imgsrc && touched.imgsrc
            || errors.llink && touched.llink || errors.logo && touched.logo || errors.name && touched.name ||
            errors.pid && touched.pid || errors.tlink && touched.tlink
            || values.descrp === "" || values.glink === "" || values.imgsrc === "" || values.tlink === ""
            || values.llink === "" || values.logo === "" || values.name === "" || values.pid === "") {
            toast.error("Please fill all required fields for update operation")
        }
        else {
            api.patch(`/api/update/${values.pid}`, allInputvalue)
                .then(response => {
                    console.log(response)
                    toast.success("Sucessfully Updated")
                })
                .catch(error => {
                    toast.error("Unsucessfull to Update")
                    console.log(error)
                })
            clearDefault()
        }
    };

    const deletehandle = () => {
        // e.preventDefault();
        if (errors.pid && touched.pid || values.pid === "") {
            toast.error("Please fill all required fields for delete opretion")
        }
        else {
            api.delete(`/api/delete/${values.pid}`)
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
        document.getElementById("pid").value = ""
        document.getElementById("name").value = ""
        document.getElementById("descrp").value = ""
        document.getElementById("tlink").value = ""
        document.getElementById("llink").value = ""
        document.getElementById("glink").value = ""
        document.getElementById("logo").value = ""
        setPreviewUrl("")
        setFieldValue("pid", "")
        setFieldValue("name", "")
        setFieldValue("descrp", "")
        setFieldValue("tlink", "")
        setFieldValue("llink", "")
        setFieldValue("glink", "")
        setFieldValue("logo", "")
        setFieldValue("imgsrc", "")
    };
    const clear = (e) => {
        e.preventDefault()
        document.getElementById("pid").value = ""
        document.getElementById("name").value = ""
        document.getElementById("descrp").value = ""
        document.getElementById("tlink").value = ""
        document.getElementById("llink").value = ""
        document.getElementById("glink").value = ""
        document.getElementById("logo").value = ""
        setPreviewUrl("")
        setFieldValue("pid", "")
        setFieldValue("name", "")
        setFieldValue("descrp", "")
        setFieldValue("tlink", "")
        setFieldValue("llink", "")
        setFieldValue("glink", "")
        setFieldValue("logo", "")
        setFieldValue("imgsrc", "")
    };
    if (!data) {
        return <div>Loading...</div>; // Show a loading state while data is being fetched
    }
    return (
        <div className='maincontainer1'>
            <div className='viewcontainer1'>
                <div className='datad' >
                    <h1 id='titleview1'>Home View Panel</h1>
                </div>
                <div className='datad1'>
                    <h4>Profile ID :</h4>
                    <p>{data.pid}</p>
                </div>
                <div className='datad1'>
                    <h4>Image :</h4>
                    <img src={data.imgsrc} alt='No Image Found' />
                </div>
                <div className='datad1'>
                    <h4>Name :</h4>
                    <p>{data.name}</p>
                </div>
                <div className='datad1'>
                    <h4>Description :</h4>
                    <p>{data.descrp}</p>
                </div>
                <div className='datad1'>
                    <h4>Twitter link :</h4>
                    <p>{data.tlink}</p>
                </div>
                <div className='datad1'>
                    <h4>LinkedIn Link :</h4>
                    <p>{data.llink}</p>
                </div>
                <div className='datad1'>
                    <h4>Github Link :</h4>
                    <p>{data.glink}</p>
                </div>
                <div className='datad1'>
                    <h4>NavBar Logo Title :</h4>
                    <p>{data.logo}</p>
                </div>
            </div>
            <div className="editcontainer1">
                <div className="dataedit1">
                    <h1 id="titleview2">Home Edit Panel</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating dataedit1">
                        <input
                            type="text"
                            className={errors.pid && touched.pid ? "form-control inputerror" : "form-control"}
                            id="pid"
                            name='pid'
                            autoComplete='off'
                            placeholder="xyz"
                            value={values.pid}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="pid">PID</label>
                        {errors.pid && touched.pid ? (
                            <p className="form-error">{errors.pid}</p>
                        ) : null}
                    </div>
                    <div className="form-floating dataedit1">
                        <input
                            type="text"
                            className={errors.name && touched.name ? "form-control inputerror" : "form-control"}
                            id="name"
                            name='name'
                            autoComplete='off'
                            placeholder="xyz"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="name">Name</label>
                        {errors.name && touched.name ? (
                            <p className="form-error">{errors.name}</p>
                        ) : null}
                    </div>
                    <div className="form-floating dataedit1">
                        <textarea
                            className={errors.descrp && touched.descrp ? "form-control inputerror" : "form-control"}
                            placeholder="Leave a comment here"
                            id="descrp"
                            name='descrp'
                            autoComplete='off'
                            value={values.descrp}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></textarea>
                        <label htmlFor="descrp">Description</label>
                        {errors.descrp && touched.descrp ? (
                            <p className="form-error">{errors.descrp}</p>
                        ) : null}
                    </div>
                    <div className="form-floating dataedit1">
                        <input
                            type="text"
                            className={errors.tlink && touched.tlink ? "form-control inputerror" : "form-control"}
                            id="tlink"
                            name='tlink'
                            autoComplete='off'
                            placeholder="xyz"
                            value={values.tlink}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="tlink">Twitter Link</label>
                        {errors.tlink && touched.tlink ? (
                            <p className="form-error">{errors.tlink}</p>
                        ) : null}
                    </div>
                    <div className="form-floating dataedit1">
                        <input
                            type="text"
                            className={errors.llink && touched.llink ? "form-control inputerror" : "form-control"}
                            id="llink"
                            name='llink'
                            autoComplete='off'
                            placeholder="xyz"
                            value={values.llink}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="llink">Linkedin Link</label>
                        {errors.llink && touched.llink ? (
                            <p className="form-error">{errors.llink}</p>
                        ) : null}
                    </div>
                    <div className="form-floating dataedit1">
                        <input
                            type="text"
                            className={errors.glink && touched.glink ? "form-control inputerror" : "form-control"}
                            id="glink"
                            name='glink'
                            autoComplete='off'
                            placeholder="xyz"
                            value={values.glink}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="glink">GitHub Link</label>
                        {errors.glink && touched.glink ? (
                            <p className="form-error">{errors.glink}</p>
                        ) : null}
                    </div>
                    {/*************************************************************************** */}
                    <div className="flexbutton dataedit1">
                        <button className="btn btn-primary"
                            id='selectedimg'
                            onClick={(e) => {
                                e.preventDefault()
                                fileInputRef.current.click();
                            }}>Select Image</button>
                        <input
                            type="file"
                            id='imgsrc'
                            name='imgsrc'
                            autoComplete='off'
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={async (e) => {
                                e.preventDefault()
                                setFieldValue("imgsrc", e.target.files[0])
                                //let pickfile = e.target.files[0];
                                //setFile(pickfile)
                            }}
                        />
                        {previewUrl && <img src={previewUrl} id='previewimg' alt="Image is not selected" />}
                        {errors.imgsrc && touched.imgsrc ? (
                            <p className="form-error">{errors.imgsrc}</p>
                        ) : null}
                    </div>
                    <div className="form-floating dataedit1">
                        <input
                            type="text"
                            className={errors.logo && touched.logo ? "form-control inputerror" : "form-control"}
                            id="logo"
                            name='logo'
                            autoComplete='off'
                            placeholder="xyz"
                            value={values.logo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="logo">NavBar Logo</label>
                        {errors.logo && touched.logo ? (
                            <p className="form-error">{errors.logo}</p>
                        ) : null}
                    </div>
                    <div className="buttoncontain1">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <button type="button" onClick={() => {
                            if (errors.descrp && touched.descrp || errors.glink && touched.glink || errors.imgsrc && touched.imgsrc
                                || errors.llink && touched.llink || errors.logo && touched.logo || errors.name && touched.name ||
                                errors.pid && touched.pid || errors.tlink && touched.tlink
                                || values.descrp === "" || values.glink === "" || values.imgsrc === ""
                                || values.llink === "" || values.logo === "" || values.name === "") {
                                toast.error("Please fill all required fields")
                            }
                            else {
                                updatehandle()
                            }
                        }}
                            className="btn btn-primary">
                            Update
                        </button>
                        <button type="button" onClick={deletehandle} className="btn btn-primary">
                            Delete
                        </button>
                        <button type="button" onClick={clear} className="btn btn-primary">
                            Clear
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default homeedit
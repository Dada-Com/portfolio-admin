import React, { useEffect, useState, useRef } from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '../style/workedit.css'
import { WorkSchema } from "../component/schemas/work"
import { Form, Formik, useFormik } from 'formik'
import { toast } from 'react-toastify'
import WorkCard from './WorkCard'
import api from "../component/api_client/api"


const workedit = ({ data4 }) => {
    /*************************Work Form*************************************** */
    const fileInputRef = useRef();
    const initialValues = {
        workno: "",
        imgsrc: "",
        tittle: "",
        descrip: "",
        githublink: "",
    }
    const [previewUrl, setPreviewUrl] = useState("");
    const { values, touched, errors, setFieldValue, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: WorkSchema,
        onSubmit: (values, action) => {
            // console.log(values)
            //  toast.success("Sucessfully Submited")
        }
    })
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const allInputvalue = {
            workno: values.workno,
            imgsrc: previewUrl,
            tittle: values.tittle,
            descrip: values.descrip,
            githublink: values.githublink,

        };
        if (errors.workno && touched.workno || errors.imgsrc && touched.imgsrc
            || errors.tittle && touched.tittle || errors.descrip && touched.descrip
            || errors.githublink && touched.githublink ||
            values.workno === "" || values.imgsrc === "" || values.tittle === "" || values.descrip === ""
            || values.githublink === "") {
            toast.error("Please fill all required fields")
        }
        else {
            await api.post("/api/work/worktypes", allInputvalue)
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
            imgsrc: previewUrl,
            tittle: values.tittle,
            descrip: values.descrip,
            githublink: values.githublink,
        };
        console.log(allInputvalue);
        //console.log(previewUrl)
        if (errors.workno && touched.workno || errors.imgsrc && touched.imgsrc
            || errors.tittle && touched.tittle || errors.descrip && touched.descrip
            || errors.githublink && touched.githublink ||
            values.workno === "" || values.imgsrc === "" || values.tittle === "" || values.descrip === ""
            || values.githublink === "") {
            toast.error("Please fill all required fields for update operation")
        }
        else {
            await api.patch(`/api/work/update/${values.workno}`, allInputvalue)
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
        if (errors.pid && touched.pid || values.pid === "") {
            toast.error("Please fill all required fields for delete opretion")
        }
        else {
            api.delete(`/api/work/delete/${values.workno}`)
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
        setFieldValue("workno", "")
        setFieldValue("imgsrc", "")
        setFieldValue("tittle", "")
        setFieldValue("githublink", "")
        setFieldValue("descrip", "")
        setFieldValue("", "")
        setPreviewUrl("")
        document.getElementById("workno").value = ""
        document.getElementById("tittle").value = ""
        document.getElementById("descrip").value = ""
        document.getElementById("githublink").value = ""
    };
    const clear = (e) => {
        e.preventDefault();
        setFieldValue("workno", "")
        setFieldValue("imgsrc", "")
        setFieldValue("tittle", "")
        setFieldValue("githublink", "")
        setFieldValue("descrip", "")
        setFieldValue("", "")
        setPreviewUrl("")
        document.getElementById("workno").value = ""
        document.getElementById("tittle").value = ""
        document.getElementById("descrip").value = ""
        document.getElementById("githublink").value = ""
    };

    return (
        <div className='maincontainer3'>
            <div className='editcontainer3'>
                <div className='dataedit' >
                    <h1 id='titleview'>Work Edit Panel</h1>
                </div>
                <div className="form-floating dataedit">
                    <input type="text"
                        className={errors.workno && touched.workno ? "form-control inputerror" : "form-control"}
                        id="workno"
                        value={values.workno}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="xyz"
                    />
                    <label htmlFor="floatingInput">Work No</label>
                </div>
                <div className="form-floating dataedit">
                    <input type="text"
                        className={errors.tittle && touched.tittle ? "form-control inputerror" : "form-control"}
                        id="tittle"
                        value={values.tittle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="xyz"
                    />
                    <label htmlFor="floatingInput">Title</label>
                </div>
                <div className="form-floating dataedit">
                    <textarea className={errors.descrip && touched.descrip ? "form-control inputerror" : "form-control"}
                        placeholder="Leave a comment here"
                        id="descrip"
                        value={values.descrip}
                        onChange={handleChange}
                        onBlur={handleBlur}></textarea>
                    <label htmlFor="floatingTextarea2">Description</label>
                </div>
                <div className="form-floating dataedit">
                    <input type="text"
                        className={errors.githublink && touched.githublink ? "form-control inputerror" : "form-control"}
                        id="githublink"
                        placeholder="xyz"
                        value={values.githublink}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    <label htmlFor="floatingInput">GitHubLink</label>
                </div>
                <div className="flexbutton dataedit1">
                    <div className="flexcolumn1">
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
                            onChange={(e) => {
                                e.preventDefault()
                                setFieldValue("imgsrc", e.target.files[0])
                            }}
                        />
                        {previewUrl && <img src={previewUrl} id='previewimg' alt="Image is not selected" />}
                        {errors.imgsrc && touched.imgsrc ? (
                            <p className="form-error">{errors.imgsrc}</p>
                        ) : null}
                    </div>
                </div>
                <div className="buttoncontain3">
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                    <button type="button" onClick={updatehandle} className="btn btn-primary">Update</button>
                    <button type="button" onClick={deletehandle} className="btn btn-primary">Delete</button>
                    <button type="button" onClick={clear} className="btn btn-primary">
                        Clear
                    </button>
                </div>
            </div>
            <div className='viewcontainer3'>
                <WorkCard element2={data4} />
            </div>
        </div>
    )
}

export default workedit
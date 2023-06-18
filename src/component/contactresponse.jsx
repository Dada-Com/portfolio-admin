import React, { useState } from 'react'
import Contactresitemcard from './contactitemcard'
import '../style/contactresponse.css'
import { toast } from 'react-toastify'

import api from "../component/api_client/api"
const contactresponse = ({ data3 }) => {
    const [responseID, setResponseID] = useState('');
    const handleInput = (e) => {
        setResponseID(e.target.value);
        // console.log(responseID)
    };
    const deletehandle = async (e) => {
        e.preventDefault();
        api.delete(`/api/contactresponse/delete/${responseID}`)
            .then(response => {
                console.log(response)
                toast.success("Sucessfully Deleted Record")
            })
            .catch(error => {
                console.log(error)
                toast.error("Unsucessfull To Delete Record Or Requied Field is Empty")
            })
    };

    const clear = async (e) => {
        e.preventDefault();
        setResponseID(e.target.value = "");
        document.getElementById("contact").value = ""
    };


    return (
        <div>
            <h2>&#x2022; Delete Contact Response : </h2>
            <div className='editpanel'>

                <div className='inputtext'>
                    <input type="text"
                        id='contact'
                        className="form-control" placeholder="Enter Contact Id To Delete"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        value={responseID}
                        onChange={handleInput}
                    />
                </div>
                <div className='button'>
                    <button type="button"
                        className="btn btn-primary"
                        onClick={deletehandle}
                    >
                        Delete
                    </button>
                </div>
                <div className='button'>
                    <button type="button" onClick={clear} id='' className="btn btn-primary">
                        Clear
                    </button>
                </div>
            </div>
            <h2>&#x2022; Contact Response : </h2>
            <div className='viewcontainerDD'>
                <Contactresitemcard element={data3} />
            </div>

        </div>
    )
}

export default contactresponse
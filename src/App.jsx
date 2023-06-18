import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Loginpage from './component/loginpage'
import Signuppage from './component/signuppage'

import Homeedit from './component/homeedit'
import Aboutedit from './component/aboutedit'
import Contactedit from './component/contactedit'
import Contactresponse from './component/contactresponse'
import Workedit from './component/workedit'
import Adminnavigation from './component/adminnavigation'

import api from "./component/api_client/api"

import { ToastContainer, toast } from 'react-toastify'
import "../node_modules/react-toastify/dist/ReactToastify.css"

// const getdata = async () => {
//   try {
//     const response = await api.get(`/api/${21}`);
//     const singledata = response.data;
//     console.log(singledata);
//     // setProfiledata(singledata); // If you need to update state with the data
//   } catch (error) {
//     console.log(error);
//   }
// };

function App() {
  const [profileData, setProfileData] = useState(null);
  const [aboutdata, setAboutdata] = useState(null);
  const [workdata, setWorkdata] = useState([]);
  const [contactdata, setContactdata] = useState(null);
  const [contactresponsedata, setContactresponsedata] = useState([]);
  const getdata = async () => {
    try {
      const response = await api.get(`/api/${21}`);
      const singleData = response.data;
      setProfileData(singleData);
    } catch (error) {
      console.log(error);
    }
  };

  const getaboutdata = async () => {
    try {
      const response = await api.get(`/api/about/${21}`);
      const singleAbData = response.data;
      setAboutdata(singleAbData);
    } catch (error) {
      console.log(error);
    }
  }

  const getworkdata = async () => {
    try {
      const response = await api.get(`/api/work/all`);
      const allworkdata = response.data;
      setWorkdata(allworkdata);
    } catch (error) {
      console.log(error);
    }
  }
  const getcontactdata = async () => {
    try {
      const response = await api.get(`/api/contact/${21}`);
      const Contactdata = response.data;
      setContactdata(Contactdata);
    } catch (error) {
      console.log(error);
    }
  }

  const getcontactresponsedata = async () => {
    try {
      const response = await api.get(`/api/contactresponse/allmasala`);
      const Contactresponsedata = response.data;
      setContactresponsedata(Contactresponsedata);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getdata();
    getaboutdata()
    getworkdata()
    getcontactdata()
    getcontactresponsedata()
  }, []);
  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <ToastContainer position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" />
          <Routes>
            <Route exact path="/" element={<Loginpage />} />
            <Route exact path="/signup" element={<Signuppage />} />
            <Route exact path="/adminpanel/" element={<Adminnavigation />}>
              <Route exact path="homeedit" element={<Homeedit data={profileData} />} />
              <Route exact path="aboutedit" element={<Aboutedit data1={aboutdata} />} />
              {/* <Route exact path="blogedit" element={<Blogedit />} /> */}
              <Route exact path="workedit" element={<Workedit data4={workdata} />} />
              <Route exact path="contactedit" element={<Contactedit data2={contactdata} />} />
              <Route exact path="contactresponse" element={<Contactresponse data3={contactresponsedata} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

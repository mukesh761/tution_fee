import React, { useContext, useEffect, useState } from 'react'
import Signup from './pages/Signup'
import { ToastContainer, toast } from 'react-toastify';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Createbatch from './pages/Createbatch';
import UserContext from './context/userContext';
import Students from './pages/Students';


const App = () => {
  const [name, setname] = useState("");
  const {islogin,setislogin,user,setuser}=useContext(UserContext)
  useEffect(() => {
  setislogin(localStorage.getItem("islogin"));
  if(islogin){
    const newUser=localStorage.getItem("user");
    setuser(JSON.parse(newUser));
   
  }
    
  }, [])
  
  return (
    <>
    <Router>
      <Routes>
        <Route path='login' element={islogin?<Home/>:<Login/>}/ >
        <Route path='signup' element={islogin?<Home/>:<Signup/>}/ >
        <Route path='/' element={islogin?<Home/>:<Login/>}/ >
        <Route path='students/:id' element={islogin?<Students/>:<Login/>}/ >
      </Routes>
    </Router>
    
  <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        bodyClassName="mukesh"
      />
    </>
  )
}

export default App

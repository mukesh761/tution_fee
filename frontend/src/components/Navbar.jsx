import React, { useContext, useState } from 'react'
import UserContext from '../context/userContext.jsx';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { backend } from '../config.js';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Navbar = () => {
  const user=JSON.parse(localStorage.getItem("user"));
   const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentBatchId, setCurrentBatchId] = useState(null); // State for the current batch ID being clicked
  const navigate=useNavigate()
    const open = Boolean(anchorEl);
    
    // Handle click to open the menu for the specific batch
    const handleClick = (event) => {
      // Set the current batch ID to be used for deletion
      setAnchorEl(event.currentTarget);
    };
  
    // Close the menu
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logout=async ()=>{
      try {
        const responsne=await axios.get( `${backend.apiUrl}/user/logout`,{withCredentials:true});
        console.log(responsne.data);
        localStorage.removeItem("islogin");
        localStorage.removeItem("user");
        // localStorage.setItem("user","");
        toast.success("log out successfull");
        navigate('/signup')
      } catch (error) {
        if(error) throw error;
      }

    }
  
  return (
    <div className='navbar-container w-full bg-[#1c4b70] h-12 flex items-center justify-between p-5 '>
        <h1 className='font-semibold text-[#F6F8D5] text-3xl'>TutTech</h1>
        <div className='h-10 w-10 rounded-full bg-[#F6F8D5]' onClick={(e) => handleClick(e)} ></div>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={logout} >Log Out</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
      </Menu>
    </div>
  )
}

export default Navbar
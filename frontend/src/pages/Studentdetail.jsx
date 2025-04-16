import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { backend } from '../config'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import Deposite from './Deposite.jsx'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CiMenuKebab } from "react-icons/ci";
import { toast } from 'react-toastify';

const Studentdetail = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentBatchId, setCurrentBatchId] = useState(null); // State for the current batch ID being clicked
  
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
  
  
    




    const [showdeposite, setshowdeposite] = useState(false)
    const [student, setstudent] = useState()
    const id = useParams().id;
    console.log(id)
    const fetchstudent = async (id) => {
        try {
            const response = await axios.get(`${backend.apiUrl}/student/fetchonestudents/${id}`, { withCredentials: true });

            console.log("fetching student")
            setstudent(response.data.student);
            console.log(response.data.student);
        } catch (error) {
            if (error) {
                console.log(error.message)
            }
        }

    }

  const deletestudent = async (id,currentBatchId) => {
    try {
      
        const response = await axios.get(`${backend.apiUrl}/student/removestudent/${currentBatchId}/${id}`, { withCredentials: true });
        toast.success("student deleted successfully!");
       navigate(`/students/${currentBatchId}`) 
    } catch (error) {
      toast.error("Error deleting batch.");
    } finally {
      handleClose(); // Close the menu after the action
    }
  };




    useEffect(() => {
        fetchstudent(id);
    }, [id,setshowdeposite])

    return (
        <div className='min-h-screen w-screen bg-[#205781]'>
            <Navbar />
            <div className='relative'>
               {showdeposite? student? <Deposite value={{student,showdeposite,setshowdeposite,fetchstudent}}/>:null:" "}
                
                <h1 className='text-center text-3xl text-white'>Student Details</h1>
                <div className='flex items-center justify-center flex-col mt-10'>
                    <div className='bg-[#4F959D] w-96 h-96 rounded-md flex items-center justify-center flex-col relative'>
                    <CiMenuKebab 
                               className='absolute top-1 right-0 cursor-pointer h-10 w-10'
                               onClick={(e) => handleClick(e)} // Pass the batch's _id when clicking the menu
                             />
                        <h1 className='text-3xl font-bold text-[#F6F8D5]  '>{student?.name}</h1>
                        <h1 className='text-2xl font-semibold text-[#F6F8D5] '>{student?.fname}</h1>
                        <h1 className='text-2xl font-semibold text-[#F6F8D5] '>{student?.classs}</h1>
                        
                        <h1 className='text-2xl font-semibold text-[#F6F8D5] '>{student?.fees}</h1>
                        <h1 className='text-2xl font-semibold text-[#F6F8D5] '>{student?.join.slice(0,10)}</h1>
                        <h1 className='text-2xl font-semibold text-[#F6F8D5] '>{student?.contact}</h1>
                        <button className='h-10 w-32 bg-blue-100 round, item._ided-md mt-2' onClick={()=>{setshowdeposite(true)}}>Deposite</button>
                    </div>
                    <div className='flex items-center justify-center flex-wrap gap-10 mt-10'>
                    {student?.feestructure?.reverse().map((item, index) => {
                        return (
                            
                    <div className='bg-[#4F959D]  rounded-md flex items-center justify-center flex-col ' key={index}>


                        <h1 className='text-2xl font-semibold text-[#F6F8D5] '>amount-{item?.amount}</h1>
                        <h1 className='text-2xl font-semibold text-[#F6F8D5] '>paid upto-{item?.depositetill?.slice(0,10)}</h1>
                        <h1 className='text-2xl font-semibold text-[#F6F8D5] '>paid on-{item?.depositeon?.slice(0,10)}</h1>
                        <h1 className='text-2xl font-semibold text-[#F6F8D5] '>advance-{item?.advance}</h1>
                        <h1 className='text-2xl font-semibold text-[#F6F8D5] '>due-{item?.due}</h1>
                    </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{deletestudent(id,student?.batch)}} >Delete</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
      </Menu>
        </div>
    )
}

export default Studentdetail
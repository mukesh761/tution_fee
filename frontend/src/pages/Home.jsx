import React, { useEffect, useState } from 'react';
import Createbatch from './Createbatch';
import axios from 'axios';
import { backend } from '../config';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CiMenuKebab } from "react-icons/ci";
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';

const Home = () => {
  const token = localStorage.getItem('token');
  const [showcreatebatch, setshowcreatebatch] = useState(false);
  const [batch, setbatch] = useState([]);
  const [id, setid] = useState("");
  const navigate=useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentBatchId, setCurrentBatchId] = useState(null); // State for the current batch ID being clicked

  const open = Boolean(anchorEl);
  
  // Handle click to open the menu for the specific batch
  const handleClick = (event, batchId) => {
    setCurrentBatchId(batchId);  // Set the current batch ID to be used for deletion
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch batches
  const fetchbatch = async () => {
    const response = await axios.get(`${backend.apiUrl}/batch/findbatch`,{withCredentials:true});
   
    setbatch(response.data.batches);
  };

  // Delete a batch by ID
  const deletebatch = async () => {
    try {
      if (currentBatchId) {
        const response = await axios.get(`${backend.apiUrl}/batch/removebatch/${currentBatchId}`,{withCredentials:true});
        toast.success("Batch deleted successfully!");
        fetchbatch(); // Refresh the batch list after deletion
      }
    } catch (error) {
      toast.error("Error deleting batch.");
    } finally {
      handleClose(); // Close the menu after the action
    }
  };

  const openstudents=(id)=>{
    navigate(`students/${id}`)
  }

  useEffect(() => {
    fetchbatch();
  }, [showcreatebatch]);

  return (
    <>
    <Navbar/>
    <div className='flex items-center flex-col bg-[#205781] min-h-screen w-screen'>
      {showcreatebatch ? <Createbatch setshowcreatebatch={setshowcreatebatch} /> : null}
      <div className='flex items-center flex-wrap justify-center gap-4 mt-20 w-full'>
        {batch.length > 0 ? (
          batch.map((item, index) => (
            <div
              key={index}
              className='sm:h-62 sm:w-96 rounded-sm flex items-center justify-center flex-col bg-[#4F959D] relative w-[80%]' onClick={()=>{
                openstudents(item._id)
              }}>
              <CiMenuKebab 
                className='absolute top-2 right-2 cursor-pointer h-10 w-5'
                onClick={(e) => handleClick(e, item._id)} // Pass the batch's _id when clicking the menu
              />
              <h1 className='font-bold text-4xl text-[#F6F8D5]'>{item.name}</h1>
              <h1 className='font-semibold text-xl text-[#F6F8D5]'>{item.time}</h1>
              <h1 className='text-[#F6F8D5]'>{item.students.length} students</h1>
            </div>
          ))
        ) : (
          <div>No batch found</div>
        )}
      </div>
      <button
        className='bg-[#4F959D] sm:w-96 mt-32 h-10 rounded-md w-[80%]'
        onClick={() => setshowcreatebatch(true)}>
        Create a new batch
      </button>

      {/* Menu for deleting or editing the batch */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={deletebatch}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
      </Menu>
    </div>
    </>
  );
};

export default Home;

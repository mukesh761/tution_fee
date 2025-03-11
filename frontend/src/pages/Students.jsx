import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { useParams } from 'react-router';
import axios from 'axios';
import { backend } from '../config';
import Addstudent from './Addstudent';
import Navbar from "../components/Navbar.jsx"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import Deposite from './Deposite.jsx';

const Students = () => {
  const token = localStorage.getItem('token');
  const params = useParams();
  const [students, setstudents] = useState([]);
  const [showaddstudent, setshowaddstudent] = useState(false);
  const [showdeposite, setshowdeposite] = useState(false)

  const [id, setid] = useState(params.id);
  const [studentid, setstudentid] = useState("");

  const fetchstudents = async (id) => {
    const response = await axios.get(`${backend.apiUrl}/student/fetchstudents/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the "Authorization" header
            },
          });

    setstudents(response.data.students)
  }

  useEffect(() => {
    fetchstudents(params.id);
  }, [showaddstudent], [showdeposite], [setshowdeposite])



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
  const deletestudent = async () => {
    try {
      if (currentBatchId) {
        const response = await axios.get(`${backend.apiUrl}/student/removestudent/${id}/${currentBatchId}`, { withCredentials: true });
        toast.success("student deleted successfully!");
        fetchstudents(); // Refresh the batch list after deletion
      }
    } catch (error) {
      toast.error("Error deleting batch.");
    } finally {
      handleClose(); // Close the menu after the action
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center flex-col justify-center gap-10  bg-[#205781] relative min-h-screen'>
        <div className='mt-20 flex items-center justify-center flex-wrap gap-5'>
          <div className={showdeposite ? "block" : "hidden"}>
            <Deposite value={{ setstudentid, studentid, setshowdeposite }} />
          </div>

          {students.length > 0 ? (
            students.map((item, index) => {

              return (
                <>
                  <div className='students  w-96 bg-[#4F959D] rounded-md flex items-center justify-center flex-col hover:scale-105 shadow-2xl relative'>
                    <CiMenuKebab
                      className='absolute top-2 right-2 cursor-pointer h-10 w-5'
                      onClick={(e) => handleClick(e, item._id)} />
                      <h1 className='absolute top-5 left-5'> {index+1}</h1>
                    <h1 className='text-3xl font-bold text-[#F6F8D5]  '>{item.name}</h1>
                    <h1 className='text-2xl font-semibold text-[#F6F8D5] '>{item.fname}</h1>
                    <h1 className='text-2xl font-semibold text-[#F6F8D5] '>class - {item.classs}</h1>
                    <h1 className='text-2xl font-semibold text-[#F6F8D5] '>fee-{item.fees}</h1>
                    <h1 className='text-2xl font-semibold text-[#F6F8D5] '>join-{item.join}</h1>
                    <h1 className='text-2xl font-semibold text-[#F6F8D5] '>last amount-{item.lastdeposite}</h1>
                    <h1 className='text-2xl font-semibold text-[#F6F8D5] '>on-{item.depositeon}</h1>
                    <h1 className='text-2xl font-semibold text-[#F6F8D5] '>up to-{item.depositeupto}</h1>

                    <button className='h-10 w-36 rounded-md mt-5 font-semibold ring-2 ring-blue-200 cursor-pointer hover:text-[#F6F8D5]  mb-2 hover:bg-[#2e4e52]' onClick={() => { setshowdeposite(true); setstudentid(item._id) }}>Deposite</button>
                  </div>
                </>
              )
            })



          ) : <div>no student found</div>}
        </div>
        <div className={showaddstudent ? 'block h-full w-full' : 'hidden h-full w-full'}>
          <Addstudent value={{ setshowaddstudent, id }} />
        </div>
        <button className='bg-[#4F959D] w-40 rounded-md h-10 mb-10 hover:scale-105 cursor-pointer' onClick={() => { setshowaddstudent(true) }}>Add New Student</button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={deletestudent}>Delete</MenuItem>
          <MenuItem onClick={handleClose}>Edit</MenuItem>
        </Menu>
      </div>
    </>
  )
}

export default Students

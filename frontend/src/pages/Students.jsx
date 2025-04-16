import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { backend } from '../config';
import Addstudent from './Addstudent';
import Navbar from "../components/Navbar.jsx"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import Deposite from './Deposite.jsx';

const Students = () => {
  const navigate=useNavigate();
  const token = localStorage.getItem('token');
  const params = useParams();
  const [students, setstudents] = useState([]);
  const [showaddstudent, setshowaddstudent] = useState(false);
  const [showdeposite, setshowdeposite] = useState(false)

  const [id, setid] = useState(params.id);
  const [student, setstudent] = useState("");

  const fetchstudents = async (id) => {
    const response = await axios.get(`${backend.apiUrl}/student/fetchstudents/${id}`,{withCredentials:true});

    setstudents(response.data.students)
  }

  useEffect(() => {
    fetchstudents(params.id);
  }, [showaddstudent], [showdeposite], [setshowdeposite])




  return (
    <>
      <Navbar />
      <div className='flex items-center flex-col justify-center gap-10  bg-[#205781] relative min-h-screen'>
        <div className='mt-20 flex items-center justify-center flex-wrap gap-5'>
          <div className={showdeposite ? "block" : "hidden"}>
            <Deposite value={{ setstudent, student, setshowdeposite,fetchstudents }} />
          </div>

          {students.length > 0 ? (
            students.map((item, index) => {

              return (
                <>
                  <div className='students  w-96 bg-[#4F959D] rounded-md flex items-center justify-center flex-col hover:scale-105 shadow-2xl relative' onClick={()=>{navigate(`/studentdetail/${item._id}`)}}>
                    
                      <h1 className='absolute top-5 left-5'> {index+1}</h1>
                    <h1 className='text-3xl font-bold text-[#F6F8D5]  '>{item.name}</h1>
                    <h1 className='text-2xl font-semibold text-[#F6F8D5] '>{item.fname}</h1>
                    <h1 className='text-2xl font-semibold text-[#F6F8D5] '>class - {item.classs}</h1>
                
                  </div>
                </>
              )
            })



          ) : <div>no student found</div>}
        </div>
        <div className={showaddstudent ? 'block h-full w-full relative' : 'hidden h-full w-full'}>
          <Addstudent value={{ setshowaddstudent, id }} />
        </div>
        <button className='bg-[#4F959D] w-40 rounded-md h-10 mb-10 hover:scale-105 cursor-pointer' onClick={() => { setshowaddstudent(true) }}>Add New Student</button>
       
      </div>
    </>
  )
}

export default Students

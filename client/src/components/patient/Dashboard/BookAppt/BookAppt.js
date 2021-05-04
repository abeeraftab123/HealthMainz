// import React,{useState,useEffect} from 'react'
// const axios=require('axios')
// function BookAppt(){
//     const user = JSON.parse(localStorage.getItem('profile'));
//     const [doctors,getDoctor]=useState([])
//     const [illness,setIllness]=useState("")
//     const [date,setDate]=useState("")
//     const [time,setTime]=useState("")
//     const [doctor,setDoctor]=useState("")
//     useEffect(()=>{
//         axios.get('http://localhost:5000/auth/getDoctors')
//         .then((res)=>{
//             console.log(res.data.result);
//             getDoctor([...res.data.result]);
//         })
//     },[])
//     function bookAppt(){
//         var min = 100;
//         var max = 2000;
//         var rand =  min + Math.floor((Math.random() * (max-min)));
//         let data={
//             Appt_ID:'APP'+rand.toString(),
//             pat_id:user.pat_ID,
//             doc_id:doctor,
//             illness:illness,
//             date:date,
//             time:time,
//             approved:false
//         }

//         axios.post("http://localhost:5000/auth/bookAppt",{data})
//         .then((res)=>{
//             console.log(res)
//         })
//         window.location.reload();
//     }
//     return(
//         <div>
//             <h1>Book your appointment</h1>
//             <br></br>
//             Select illness
//             <select name="illness" onChange={(event)=>{setIllness(event.target.value)}}>
//                 <option value="Respiratory">Respiratory</option>
//                 <option value="Cardiac">Cardiac</option>
//                 <option value="General">General</option>
//                 <option value="Gynec">Gynec</option>
//             </select>
//             <br></br>
//             Date
//             <input type="date" placeholder="select date" onChange={(event)=>{setDate(event.target.value)}}></input>
//             <br></br>
//             Time
//             <input type="time" placeholder="select time" onChange={(event)=>{setTime(event.target.value)}}></input>
//             <br></br>
//             Select doctor
//             <select name="doctor" onChange={(event)=>{setDoctor(event.target.value)}}>
//                 {doctors.map((doctor)=><option value={doctor.Doc_ID}>{doctor.Doc_Name}</option>)}
//             </select>
//             <br></br>
//             <br></br>
//             <button onClick={bookAppt}>Book Appointment</button>
//         </div>
//     )
// }
// export default BookAppt;

import React,{useEffect,useState} from "react"
import "./BookAppt.css"
import NavBar from "../../../NavBar/NavBar"
import DateTimePicker from 'react-datetime-picker';
import { LOGOUT } from "../../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
function Dashboard(){
    const axios=require('axios')
    const dispatch = useDispatch();
    const history = useHistory();
    function logout(){
        dispatch({ type: LOGOUT });
        history.push('/');
    }
    const [illness,setIllness]=useState("")
    const [date,setDate]=useState("")
    const [time,setTime]=useState("")
    const [value, onChange] = useState(new Date());
    
    const user = JSON.parse(localStorage.getItem('profile'));
    return(
        <div className="wrapper">
        <NavBar />
        <div class="main_content">
            <div class="headZap">
                <div class="header">{user?user.Pat_Name:null}
                    <div class="user_id">{user?user.pat_ID:null}</div>                    </div>
                    <div onClick={logout}>
                            <i class="fas fa-sign-out-alt"></i>
                        </div>
                </div>
                <div class="container">
                    <div class="cont c1">
                        <p style = {{marginBottom:"20px"}}><b>Book Your Appointment</b></p>
                        <div class="dropTHEbox">
                            <div class="Illness drop">
                                <span class="purpletext">Type of Illness</span>
                                <select name="illness" id="illdrop" onChange={(event)=>{setIllness(event.target.value)}}>  
                                    <option value="Respiratory">Respiratory</option>
                                    <option value="Cardiac">Cardiac</option>
                                    <option value="General">General</option>
                                    <option value="Gynec">Gynec</option>
                                </select>
                            </div>
                            <div class="DateTime drop">
                                <span class="purpletext">Select Date and Time</span>
                                {/* <DateTimePicker class="DateTimePicker"
                                    onChange={onChange}
                                    value={value}
                                /> */}
                                <input type="date" placeholder="select date" id="illdrop" onChange={(event)=>{setDate(event.target.value)}}></input>
                                <input type="time" placeholder="select time" id="illdrop" onChange={(event)=>{setTime(event.target.value)}}></input> 
                            </div>
                        </div>
                        <div class="symptoms">
                            <span class="purpletext">Symptoms (State if any)</span>
                            <textarea type="text" placeholder="Type your symptoms here." class="symptom-box" rows="5" cols="50"></textarea>
                        </div>
                        <div class="doctor_available">
                            <span class="purpletext">Doctors Available (for the given date and time)</span>
                            <div class="available_card">
                                <div class="av a1"></div>
                                <div class="av a2"></div>
                                <div class="av a3"></div>
                            </div>
                        </div>
                        <p id="notice">*Fill all the fields before proceeding further</p>
                        <div class="book-beauty">
                            <div class="book">Book</div> {/*{YASHI MAA WORK} */}
                        </div>
                    </div>
                    <div class="cont c2">
                        <p><b>Seek Specialist Help, Our Doctors</b></p>
                        <div class = "doc_grid">
                            <div class="doc d1"></div>
                            <div class="doc d2"></div>
                            <div class="doc d3"></div>
                            <div class="doc d4"></div>
                            <div class="doc d5"></div>
                            <div class="doc d6"></div>
                            <div class="doc d7"></div>
                            <div class="doc d8"></div>
                            <div class="doc d9"></div>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
    )
}

export default Dashboard;

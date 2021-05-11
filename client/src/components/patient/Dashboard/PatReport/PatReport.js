import React,{useEffect,useState} from "react"
import "./PatReport.css"
import NavBar from "../../../NavBar/NavBar"
//import DocCard from "./DocCard/DocCard"
import Notification from "../../../Notifications/Notification"
import { LOGOUT } from "../../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
function BookAppt(){
    const axios=require('axios')
    const dispatch = useDispatch();
    const history = useHistory();
    function logout(){
        dispatch({ type: LOGOUT });
        history.push('/');
    }
     const user = JSON.parse(localStorage.getItem('profile'));
    // const [doctors,getDoctor]=useState([])
    // const [illness,setIllness]=useState("Respiratory")
    // const [date,setDate]=useState("")
    // const [time,setTime]=useState("")
    // const [doctor,setDoctor]=useState("")
     const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
    useEffect(()=>{
        axios.get('http://localhost:5000/auth/getDoctors')
        .then((res)=>{
            console.log(res.data.result);
            //getDoctor([...res.data.result]);
        })
    },[])
    // function bookAppt(){
    //     var min = 100;
    //     var max = 2000;
    //     var rand =  min + Math.floor((Math.random() * (max-min)));
    //     let data={
    //         Appt_ID:'APP'+rand.toString(),
    //         pat_id:user.pat_ID,
    //         doc_id:doctor,
    //         illness:illness,
    //         date:date,
    //         time:time,
    //         approved:false
    //     }
    //     console.log(data)
    //     // axios.post("http://localhost:5000/auth/bookAppt",{data})
    //     // .then((res)=>{
    //     // })
    //     setNotify({isOpen:true,message:'Appointment booked',type:'success'})
    // }
    // const callBackFunction = (childData) => {
    //     setDoctor(childData)
    // }
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
                <div class="containerBook">
                    <div class="cont c1">
                    <Notification notif={notif} ></Notification>
                        <p style = {{marginBottom:"20px"}}><b>Book Your Appointment</b></p>
                        <div class="dropTHEbox">
                            <div class="Illness drop">
                                <span class="purpletext">Type of Illness</span>
                                {/* <select name="illness" id="illdrop" onChange={(event)=>{setIllness(event.target.value)}}>  
                                    <option value="Respiratory">Respiratory</option>
                                    <option value="Cardiac">Cardiac</option>
                                    <option value="General">General</option>
                                    <option value="Gynec">Gynec</option>
                                </select> */}
                            </div>
                            <div class="DateTime drop">
                                <span class="purpletext">Select Date and Time</span>
                                {/* <DateTimePicker class="DateTimePicker"
                                    onChange={onChange}
                                    value={value}
                                /> */}
                                {/* <input type="date" placeholder="select date" id="illdrop" onChange={(event)=>{setDate(event.target.value)}}></input>
                                <input type="time" placeholder="select time" id="illdrop" onChange={(event)=>{setTime(event.target.value)}}></input>  */}
                            </div>
                        </div>
                        <div class="symptoms">
                            <span class="purpletext">Symptoms (State if any)</span>
                            <textarea type="text" placeholder="Type your symptoms here." class="symptom-box" rows="5" cols="50"></textarea>
                        </div>
                        <span style={{marginLeft: "15px", marginBottom: "-15px"}} class="purpletext">Doctors Available (for the given date and time)</span>
                        {/* <div class="doctor_available">
                            {doctors.map((doctor,index)=><DocCard id={doctor.Doc_ID} name={doctor.Doc_Name} index={index} callback={callBackFunction}></DocCard>)}
                        </div> */}
                        <p id="notice">*Fill all the fields before proceeding further</p>
                        {/* <div class="book-beauty">
                            <div class="book" onClick={bookAppt}>Book</div> 
                        </div> */}
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

export default BookAppt;

import React,{useEffect,useState} from "react"
import "./BookAppt.css"
import NavBar from "../../../NavBar/NavBar"
import DocCard from "./DocCard/DocCard"
import Notification from "../../../Notifications/Notification"
import { LOGOUT } from "../../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
function BookAppt(){
    const axios=require('axios')
    const dispatch = useDispatch();
    const history = useHistory();
    function logout(){
        dispatch({ type: LOGOUT,user:"patient" });
        history.push('/');
    }
    const user = JSON.parse(localStorage.getItem('patient'));
    const [doctors,getDoctor]=useState([])
    const [illness,setIllness]=useState("Respiratory")
    const [symptom,setSymptom]=useState('')
    const [date,setDate]=useState("")
    const [time,setTime]=useState("")
    const [doctor,setDoctor]=useState("")
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
    useEffect(async()=>{
        let res=await axios.post('http://localhost:5000/auth/getDoctors',{illness:illness,date:date,time:time});
        getDoctor([...res.data.result]);
    },[illness,date,time])
    function bookAppt(){
        var min = 100;
        var max = 2000;
        var rand =  min + Math.floor((Math.random() * (max-min)));
        let data={
            Appt_ID:'APP'+rand.toString(),
            pat_id:user.pat_ID,
            doc_id:doctor,
            illness:illness,
            date:date,
            time:time,
            symptom:symptom,
            approved:false,
            completed:false
        }
        console.log(data)
        axios.post("http://localhost:5000/auth/bookAppt",{data})
        .then((res)=>{
        })
        setNotify({isOpen:true,message:'Appointment booked',type:'success'})
    }
    const callBackFunction = (childData) => {
        setDoctor(childData)
    }
    return(
        <div className="wrapper">
        <NavBar user="patient"/>
        <div class="main_content">
            <div class="headZap">
                <div class="header">{user?user.Pat_Name:null}
                    <div class="user_id">{user?user.pat_ID:null}</div>                    </div>
                    <div onClick={logout}>
                            <i class="fas fa-sign-out-alt"></i>
                        </div>
                </div>
                <div class="containerBook">
                    <div class="cont-book c1">
                    <Notification notif={notif} ></Notification>
                        <p style = {{marginBottom:"20px"}}><b>Book Your Appointment</b></p>
                        <div class="dropTHEbox">
                            <div class="Illness drop">
                                <span class="purpletext">Department</span>
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
                            <textarea type="text" placeholder="Type your symptoms here." class="symptom-box" rows="4" cols="50" onChange={(event)=>{setSymptom(event.target.value)}}></textarea>
                        </div>
                        <span style={{marginLeft: "15px", marginBottom: "-15px"}} class="purpletext">Doctors Available (for the given date and time)</span>
                        <div class="doctor_available_book">
                            {doctors.map((doctor,index)=><DocCard id={doctor.Doc_ID} name={doctor.Doc_Name} index={index} callback={callBackFunction}></DocCard>)}
                        </div>
                        <p id="notice">*Fill all the fields before proceeding further</p>
                        <div class="book-beauty">
                            <div class="book-ap" onClick={bookAppt}>Book</div> 
                        </div>
                    </div>
                    {/* <div class="cont-book c2">
                        <p><b>Seek Specialist Help, Our Doctors</b></p>
                        <div class = "doc_grid_spec">
                            <div class="spec-doc d1"></div>
                            <div class="spec-doc d2"></div>
                            <div class="spec-doc d3"></div>
                            <div class="spec-doc d4"></div>
                            <div class="spec-doc d5"></div>
                            <div class="spec-doc d6"></div>
                            <div class="spec-doc d7"></div>
                            <div class="spec-doc d8"></div>
                            <div class="spec-doc d9"></div>
                        </div>
                    </div> */}
                </div>
                </div>
                
            </div>
    )
}

export default BookAppt;

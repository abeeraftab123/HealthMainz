import React, { useState,useEffect } from 'react'
import NavBar from "../../NavBar/NavBar"
import queryString from 'query-string'
import Notification from "../../Notifications/Notification"
import { useHistory } from 'react-router-dom';
import './Report.css'
function Report({location}){
    const history = useHistory();
    const axios=require('axios')
    const ID=(queryString.parse(location.search).appID)
    const[date,setDate]=useState('')
    const [time,setTime]=useState('')
    const[doctor,setDoctor]=useState('')
    const[patient,setPatient]=useState('')
    const[feedback,setFeedback]=useState('')
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
    console.log(ID)
    useEffect(()=>{
        axios.post("http://localhost:5000/auth/docReport",{id:ID})
        .then((res)=>{
            const result=res.data.result;
            setDate(result.date)
            setTime(result.time)
            setDoctor(result.docName)
            setPatient(result.patName)
        })
    },[])

    function sendReport(){
        let data={
            Appt_ID:ID,
            Doc_Name:doctor,
            Pat_Name:patient,
            Appt_Date:date,
            Appt_Time:time,
            feedback:feedback
        }
        axios.post("http://localhost:5000/auth/createReport",{data:data})
        .then((res)=>{
            setNotify({isOpen:true,message:"Report genearted",type:'success'})
            history.push("/doctor/dashboard")
        })
    }

    return(
        <>
            <NavBar user="doctor"></NavBar>
            <Notification notif={notif} ></Notification>
            <div className="chat_rep_outerContainer">
                <div className="chat_rep_container">
                    <div className="rep_con">
                        <div className="infoBar_rep"><h1>Appointment Report</h1></div>
                            <div className="new_rep">
                                <p><b>Appointment ID:</b> {ID}</p>
                                <p><b>Appointment Time:</b> {time}</p>
                                <p><b>Appointment Date:</b> {date}</p><br></br>
                                <p><b>Patient Name:</b> {patient}</p>
                                <p><b>Doctor Name:</b> {doctor}</p><br></br>
                                <p><b>Enter Feedback</b></p>
                                <textarea rows="7" cols="83" className="rep-box"  placeholder="Enter Feedback" onChange={(event)=>setFeedback(event.target.value)}></textarea>
                                <div className="gen-rep-but-beauty"><div className="gen-rep-but" onClick={sendReport}>Generate Report</div></div>
                                
                                
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report;
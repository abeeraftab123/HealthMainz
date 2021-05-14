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
                                <p><b>Appointment ID: {ID}</b></p>
                                <p><b>Appointment Time: {time}</b></p>
                                <p><b>Appointment Date: {date}</b></p>
                                <p><b>Patient Name: {patient}</b></p>
                                <p><b>Doctor Name: {doctor}</b></p>
                                <textarea style={{height: "50%", width:"90%", border: "3px solid #85599A", borderRadius: "3px"}} placeholder="Enter Feedback" onChange={(event)=>setFeedback(event.target.value)}></textarea>
                                <div style={{cursor:"pointer",backgroundColor:"#85599A",width:"20%"}} onClick={sendReport}>Generate Report</div> 
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report;
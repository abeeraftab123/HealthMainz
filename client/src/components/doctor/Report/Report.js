import React, { useState,useEffect } from 'react'
import NavBar from "../../NavBar/NavBar"
import queryString from 'query-string'
import Notification from "../../Notifications/Notification"
import { useHistory } from 'react-router-dom';
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
            <div style={{marginLeft:"10%"}}>
                <h1>Appointment report</h1>
                <p>Appointment ID: {ID}</p>
                <p>Appointment Time: {time}</p>
                <p>Appointment Date: {date}</p>
                <p>Patient Name: {patient}</p>
                <p>Doctor Name: {doctor}</p>
                <textarea placeholder="Enter Feedback" onChange={(event)=>setFeedback(event.target.value)}></textarea>
                <div style={{cursor:"pointer",backgroundColor:"#85599A",width:"20%"}} onClick={sendReport}>Generate Report</div>
            </div>
            
        </>
    )
}

export default Report;
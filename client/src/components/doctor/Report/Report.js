import React, { useState,useEffect } from 'react'
import NavBar from "../../NavBar/NavBar"
import queryString from 'query-string'
import Notification from "../../Notifications/Notification"
import { useHistory } from 'react-router-dom';
import { saveAs } from 'file-saver';
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
    const[meds,setMeds]=useState([])
    const[medName,setName]=useState('')
    const[dose,setDose]=useState('')
    const[medicines,addMedicines]=useState([])
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
            feedback:feedback,
            meds:medicines
        }
        axios.post("http://localhost:5000/auth/createReport",{data:data})
        .then((res)=>{
            setNotify({isOpen:true,message:"Report genearted",type:'success'})
            history.push("/doctor/dashboard")
        })
    }

    function addMed(){
        addMedicines([...medicines,{name:medName,dose:dose}])
        
    }

    function addRow(){
        setMeds([...medicines,{name:'',dose:''}])
        console.log(medicines)
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
                                <p><b>Medicines:</b></p>
                                <table>
                                    <tr>
                                        <td>Medicines name</td>
                                        <td>Dosage</td>
                                        <td onClick={addRow}>Add Row</td>
                                    </tr>
                                    {meds.map((med)=>
                                    med.name&&med.dose?
                                        <tr>
                                        <td>{med.name}</td>
                                        <td>{med.dose}</td>
                                        </tr>
                                        :
                                        <tr>
                                            <td><input type="text" placeholder="Enter medicine name" onChange={(event)=>{setName(event.target.value)}}></input></td>
                                            <td><input type="text" placeholder="Enter medicine dose" onChange={(event)=>{setDose(event.target.value)}}></input></td>
                                            <td><button onClick={addMed} >Enter</button></td>
                                        </tr>
                                    )}
                                </table>
                                <p><b>Enter Feedback</b></p>
                                <textarea rows="5" cols="70" className="rep-box"  placeholder="Enter Feedback" onChange={(event)=>setFeedback(event.target.value)}></textarea>
                                <div className="gen-rep-but-beauty"><div className="gen-rep-but" onClick={sendReport}>Generate Report</div></div>
                                
                                
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report;
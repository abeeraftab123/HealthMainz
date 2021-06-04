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
                        <div className="infoBar_rep"><h4>Appointment Report</h4></div>
                            <div className="new_rep">
                                <p><b>Appointment ID:</b> {ID}</p>
                                <p><b>Appointment Time:</b> {time}</p>
                                <p><b>Appointment Date:</b> {date}</p>
                                <p><b>Patient Name:</b> {patient}</p>
                                <p><b>Doctor Name:</b> {doctor}</p>
                                <p><b>Medicines:</b></p>
                                
                                <table>
                                    <tr>
                                        <td><b>Medicines name</b></td>
                                        <td><b>Dosage</b></td>
                                        <td style={{backgroundColor:'#5e337a', color:'#FFF', cursor: 'pointer'}} onClick={addRow}>Add Row</td>
                                    </tr>
                                    {meds.map((med)=>
                                    med.name&&med.dose?
                                        <tr>
                                        <td>{med.name}</td>
                                        <td>{med.dose}</td>
                                        </tr>
                                        :
                                        <tr>
                                            <td><input type="text" placeholder="Enter medicine name" style={{border: 'none', textAlign: 'center'}} onChange={(event)=>{setName(event.target.value)}}></input></td>
                                            <td><input type="text" placeholder="Enter medicine dose" style={{border: 'none', textAlign: 'center'}} onChange={(event)=>{setDose(event.target.value)}}></input></td>
                                            <td style={{backgroundColor:'#5e337a', color:'#FFF', cursor: 'pointer'}} onClick={addMed}>
                                                Enter
                                            </td>
                                        </tr>
                                    )}
                                </table><br></br>
                                
                                <textarea rows="5" cols="100" className="rep-box"  placeholder="Enter Feedback" onChange={(event)=>setFeedback(event.target.value)}></textarea>
                                <div className="gen-rep-but-beauty"><div className="gen-rep-but" onClick={sendReport}>Generate Report</div></div>
                                
                                
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report;
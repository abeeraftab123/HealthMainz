import React,{useState} from 'react'
import "./appointment.css";
import Notification from "../../../Notifications/Notification"

export default function AppointmentCard(props) {
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
    const axios=require('axios');
    let appt=props.appt;
    function confirm(){
        axios.post('http://localhost:5000/auth/confirmAppt',{appt})
        .then((res)=>{
            console.log(res);
        })
        setNotify({isOpen:true,message:'Appointment confirmed',type:'success'})
    }
    return(
        <div>
            <Notification notif={notif} ></Notification>
            <div className="appointmentCard">
                <h3>Patient ID :{appt.pat_id}</h3>
                <h3>Illness:{appt.illness}</h3>
                <h3>Date:{appt.date}</h3>
                <h3>Time:{appt.time}</h3>
                <button onClick={confirm}>Approve</button>
            </div>
        </div>
    )
}
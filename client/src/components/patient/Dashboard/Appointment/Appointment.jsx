import "./appointment.css";
import { useHistory } from 'react-router-dom';
import Notification from "../../../Notifications/Notification"
import {useState} from "react"

export default function AppointmentCard(props) {
    const axios=require('axios');
    const history = useHistory();
    let appt=props.appt;
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
    function chat(){
        var today = new Date();
        let currTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let compareDate=new Date(appt.date)
        if(currTime>=appt.time&&today.setHours(0,0,0,0) == compareDate.setHours(0,0,0,0))
            history.push("/join")
        else
            setNotify({isOpen:true,message:"Appointment has not started",type:'error'})
    }
    return(
        <>
        <Notification notif={notif} ></Notification>
        <div className="appointmentCard">
            <h4> ID: {appt.Appt_ID}</h4>
            Patient ID: {appt.doc_id}
            <br></br>
            Illness: {appt.illness}
            <br></br>
            Date: {appt.date}
            <br></br>
            Time: {appt.time}
            <br></br>
            <br></br>
            <div class="button" onClick={chat}>Join</div>
        </div>
        </>
    )
}
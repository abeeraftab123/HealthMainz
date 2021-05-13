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
        let minDiff=parseInt(currTime.slice(3,6))-parseInt(appt.time.slice(3,6));
        let hourDiff=parseInt(currTime.slice(0,2))-parseInt(appt.time.slice(0,2));
        console.log();
        if(today.getTime()<compareDate.getTime())
            setNotify({isOpen:true,message:"Appointment not scheduled today",type:'error'})
        else if(currTime<appt.time)
            setNotify({isOpen:true,message:"Appointment has not started",type:'error'})
        else if(minDiff>15||hourDiff!==0)
            setNotify({isOpen:true,message:"Appointment Missed",type:'error'})
        else
            history.push("/join?appID="+appt.Appt_ID+"&user=patient")
    }
    return(
        <>
        <Notification notif={notif} ></Notification>
        <div className="appointmentCard">
            <h4> ID: {appt.Appt_ID}</h4>
            Doctor ID: {appt.doc_id}
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
import React,{useState} from 'react'
import "./appointment.css";
import Notification from "../../../Notifications/Notification"
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'

export default function AppointmentCard(props) {
    const history = useHistory();
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
    let appt=props.appt;
    function chat(){
        var today = new Date();
        let currTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let compareDate=new Date(appt.date)
        if(currTime>=appt.time&&today.setHours(0,0,0,0) == compareDate.setHours(0,0,0,0))
            history.push("/join?appID="+appt.Appt_ID)
        else
            setNotify({isOpen:true,message:"Appointment has not started",type:'error'})
    }
    return(
        <div>
            <Notification notif={notif} ></Notification>
            <div className="appointmentCard">
                <div className="name">{appt.name}</div>
                <div className="ill">{appt.illness}</div>
                <div className="date_time">
                    {appt.date}
                    <br></br>
                    {appt.time}
                </div>
                <div className="but" onClick={chat}>
                    Join
                </div>
                <div className="apptID" >
                    {appt.Appt_ID}
                </div>
            </div>
        </div>
    )
}
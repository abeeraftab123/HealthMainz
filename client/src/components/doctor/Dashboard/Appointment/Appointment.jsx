import React,{useState} from 'react'
import "./appointment.css";
import Notification from "../../../Notifications/Notification"
import { useHistory } from 'react-router-dom';

export default function AppointmentCard(props) {
    const history = useHistory();
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
    let appt=props.appt;
    function chat(){
        let [hour,min]=appt.time.split(':');
        var today = new Date();
        let compareDate=new Date(appt.date)
        let minDiff=today.getMinutes()-parseInt(min);
        let hourDiff=today.getHours()-parseInt(hour);
        console.log(parseInt(hour))
        if(today.getDate()<compareDate.getDate())
            setNotify({isOpen:true,message:"Appointment not scheduled today",type:'error'})
        else if(today.getHours()<=parseInt(hour)&&today.getMinutes()<parseInt(min))
            setNotify({isOpen:true,message:"Appointment has not started",type:'error'})
        else if(minDiff>15||hourDiff!==0)
            setNotify({isOpen:true,message:"Appointment Missed",type:'error'})
        else
            history.push("/join?appID="+appt.Appt_ID+"&user=doctor")
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
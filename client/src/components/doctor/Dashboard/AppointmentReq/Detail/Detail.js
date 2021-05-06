import React,{useState} from "react"
import "./Detail.css"
import Notification from "../../../../Notifications/Notification"
function Detail(props){
    const axios=require('axios');
    let id=props.detail.id;
    let pid=props.detail.pid;
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
    function confirm(){
        //setNotify({isOpen:true,message:'Appointment confirmed',type:'success'})
        axios.post('http://localhost:5000/auth/confirmAppt',{id:id,pid:pid})
        .then((res)=>{
            setNotify({isOpen:true,message:'Appointment confirmed',type:'success'})
        })
    }
    return(
        <div>
            <Notification notif={notif} ></Notification>
            {props.detail.show?
            <div>
                <div style={{color:"#B390C3"}}><b>Type of illness</b></div>
                <div className="ill">{props.detail.illness}</div>
                <div style={{color:"#B390C3",marginTop:"5%"}}><b>Date</b></div>
                <div className="ill">{props.detail.date}</div>
                <div style={{color:"#B390C3",marginTop:"5%"}}><b>Time</b></div>
                <div className="ill">{props.detail.time}</div>
                <div className="buttons">
                    <div className="approve" onClick={confirm}>Approve</div>
                    <div className="reject">Reject</div>
                </div>
            </div>
            :null}
        </div>
    )
}

export default Detail
import React,{useEffect,useState} from 'react'
import NavBar from "../../../NavBar/NavBar"
import Notification from "../../../Notifications/Notification"
import "./AppointmentReq.css"
import { LOGOUT } from "../../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Card from "./Card/Card"
import Detail from "./Detail/Detail"
function AppointmentReq(){
    const axios=require('axios')
    const dispatch = useDispatch();
    const history = useHistory();
    const[detail,setDetail]=React.useState({show:false,illness:'',date:'',time:'',id:'',pid:''})
    const [appts,getAppt]=useState([]);
    console.log(detail)
    useEffect(()=>{
        axios.get('http://localhost:5000/auth/getAppt',{params:{doc:user.Doc_ID}})
        .then((res)=>{
            console.log(res)
            getAppt([...res.data.result])
        })
    },[])
    function logout(){
        dispatch({ type: LOGOUT });
        history.push('/');
    }
    let callback = (childData) =>{
        setDetail({show:true,illness:childData.illness,time:childData.time,date:childData.date,id:childData.Appt_ID,pid:childData.pat_id})
    }
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <div className="wrapper">
        <NavBar />
        <div class="main_content">
            <div class="headZap">
                <div class="header">{user?user.Doc_Name:null}
                    <div class="user_id">{user?user.Doc_ID:null}</div>                    </div>
                    <div onClick={logout}>
                            <i class="fas fa-sign-out-alt"></i>
                        </div>
                </div>
                <div class="container">
                    <div class="cont c1">
                    <p style = {{marginBottom:"20px"}}><b>Appointment Requests</b></p>
                    <div style={{color:"#B390C3"}}>(Click on the appointment to see details)</div>
                    {appts.map((appt)=><Card appt={appt} callBack={callback}/>)}
                    </div>
                    <div class="cont c2">
                    <p style = {{marginBottom:"20px"}}><b>Details</b></p>
                    <Detail detail={detail}></Detail>
                    </div>
                </div>
                </div>
                
            </div>
    )
}

export default AppointmentReq
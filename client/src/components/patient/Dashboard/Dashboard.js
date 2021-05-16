import React,{useEffect,useState} from "react"
import "./Dashboard.css"
import NavBar from "../../NavBar/NavBar"
import Map from "../../Map/Map"
import AppointmentCard from "./Appointment/Appointment";
import { LOGOUT } from "../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Stats from "../../Stats/Stats"
import Graph from "../../Graph/Graph"
function Dashboard(){
    const axios=require('axios')
    const dispatch = useDispatch();
    const history = useHistory();
    function logout(){
        dispatch({ type: LOGOUT,user:"patient" });
        history.push('/');
    }
    const[appts,getAppt]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/auth/checkAppt')
        .then((res)=>{
            console.log(res);
        })
        axios.get('http://localhost:5000/auth/getAppt',{params:{pat:user.pat_ID}})
        .then((res)=>{
            getAppt([...res.data.result])
        })
    },[])
    const user = JSON.parse(localStorage.getItem('patient'));
    console.log(user)
    return(
        <div className="wrapper">
        <NavBar user="patient"/>
        <div class="main_content">
            <div class="headZap">
            <div class="header">{user?user.Pat_Name:null}
            <div class="user_id">{user?user.pat_ID:null}</div>
            </div>
            <div onClick={logout}>
            <i class="fas fa-sign-out-alt"></i>
            </div>
            </div>
            <div class="grid-container">
                <div class="app">Appointment
                <div className="cardspat">
                {appts.map((appt,index)=><AppointmentCard appt={appt} />)}
                </div>
                </div>
                <Stats />
                <Map/>
                <Graph />
            </div>
        </div>
        </div>
    )
}

export default Dashboard;
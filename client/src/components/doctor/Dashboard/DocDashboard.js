import React,{useState,useEffect} from "react"
import "./Dashboard.css"
import NavBar from "../../NavBar/NavBar"
import Map from "../../Map/Map"
import Stats from "../../Stats/Stats"
import AppointmentCard from "./Appointment/Appointment";
import { LOGOUT } from "../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Graph from "../../Graph/Graph"
const axios=require('axios');
function DocDashboard(){
    const user = JSON.parse(localStorage.getItem('doctor'));
    const [appts,getAppt]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/auth/checkAppt')
        .then((res)=>{
            console.log(res);
        })
        axios.get('http://localhost:5000/auth/cAppt',{params:{doc:user.Doc_ID}})
        .then((res)=>{
            console.log(res)
            getAppt([...res.data.result])
        })
    },[])

    const dispatch = useDispatch();
    const history = useHistory();
    function logout(){
        dispatch({ type: LOGOUT ,user:'doctor'});
        history.push('/');
    }
    return(
        <div className="wrapper">
        <NavBar user="doctor"/>
        <div class="main_content">
            <div class="headZap">
            <div class="header">{user?user.Doc_Name:null}
            <div class="user_id">{user?user.Doc_ID:null}</div>
            </div>
            <div onClick={logout}>
            <i class="fas fa-sign-out-alt"></i>
            </div>
            </div>
            <div class="grid-container-doc">
                <div class="app-doc">Appointments 
                <div className="cards">
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

export default DocDashboard;
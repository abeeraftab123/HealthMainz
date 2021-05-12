import React,{useState} from "react"
import NavBar from "../../NavBar/NavBar"
import { LOGOUT } from "../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Notification from "../../Notifications/Notification"
import "./AdmReport.css"
function AdmReport(){
    
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})

    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const axios=require('axios')


    function logout(){
        dispatch({ type: LOGOUT });
        history.push('/');
    }

    
    return(
        <div className="wrapper">
        <NavBar />
        <div class="main_content">
            <div class="headZap">
                <div class="header">{user?user.Admin_ID:null}</div>
                <br></br>
                <div onClick={logout}>
                <i class="fas fa-sign-out-alt"></i>
                </div>
            </div>
                <div class="containerPatRep">
                    <div class="contc1">
                    <div class="scrollbar">
				        <div class="force-overflow"></div>
			        </div>

                    <p><b>View Appointment Reports</b></p>
                        <div class = "app_grid">
                            <div class="app_view d1"></div>
                            <div class="app_view d2"></div>
                            <div class="app_view d3"></div>
                            <div class="app_view d4"></div>
                            <div class="app_view d5"></div>
                            <div class="app_view d6"></div>
                            <div class="app_view d7"></div>
                            <div class="app_view d8"></div>
                            <div class="app_view d9"></div>
                           
                        </div>
                    </div>
                    <div class="cont c2">
                    <Notification notif={notif} ></Notification>
                        <p style = {{marginBottom:"20px"}}><b>Appointment Report</b></p>
                        <div class="dropTHEbox">
                            <div class="Illness drop">
                                <span class="purpletext">Appointment ID: </span>
                                <span class="purpletext">Appointment Date: </span>
                                <span class="purpletext">Appointment Time: </span>
                                <br></br>
                                <span class="purpletext">Doctor: </span>
                                <span class="purpletext">Patient: </span>
                            </div>
                            
                        </div>
                        <div class="symptoms">
                            <span class="purpletext">Doctor Feedback:</span>
                            <textarea type="text" class="symptom-box" rows="5" cols="50"></textarea>
                        </div>
                       
                    </div>
                </div>
                </div>
                
            </div>
    )
}

export default AdmReport;

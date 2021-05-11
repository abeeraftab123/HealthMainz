import React,{useEffect,useState} from "react"
import "./PatReport.css"
import NavBar from "../../../NavBar/NavBar"
//import DocCard from "./DocCard/DocCard"
import Notification from "../../../Notifications/Notification"
import { LOGOUT } from "../../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
function BookAppt(){
    const axios=require('axios')
    const dispatch = useDispatch();
    const history = useHistory();
    function logout(){
        dispatch({ type: LOGOUT });
        history.push('/');
    }
     const user = JSON.parse(localStorage.getItem('profile'));
    // const [doctors,getDoctor]=useState([])
    // const [illness,setIllness]=useState("Respiratory")
    // const [date,setDate]=useState("")
    // const [time,setTime]=useState("")
    // const [doctor,setDoctor]=useState("")
     const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
    useEffect(()=>{
        axios.get('http://localhost:5000/auth/getDoctors')
        .then((res)=>{
            console.log(res.data.result);
            //getDoctor([...res.data.result]);
        })
    },[])
    // function bookAppt(){
    //     var min = 100;
    //     var max = 2000;
    //     var rand =  min + Math.floor((Math.random() * (max-min)));
    //     let data={
    //         Appt_ID:'APP'+rand.toString(),
    //         pat_id:user.pat_ID,
    //         doc_id:doctor,
    //         illness:illness,
    //         date:date,
    //         time:time,
    //         approved:false
    //     }
    //     console.log(data)
    //     // axios.post("http://localhost:5000/auth/bookAppt",{data})
    //     // .then((res)=>{
    //     // })
    //     setNotify({isOpen:true,message:'Appointment booked',type:'success'})
    // }
    // const callBackFunction = (childData) => {
    //     setDoctor(childData)
    // }
    return(
        <div className="wrapper">
        <NavBar />
        <div class="main_content">
            <div class="headZap">
                <div class="header">{user?user.Pat_Name:null}
                    <div class="user_id">{user?user.pat_ID:null}</div>                    </div>
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

export default BookAppt;

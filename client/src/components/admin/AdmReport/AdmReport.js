import React,{useState,useEffect} from "react"
import NavBar from "../../NavBar/NavBar"
import { LOGOUT } from "../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import ReportCard from "../../patient/Dashboard/PatReport/ReportCard/ReportCard"
import ReportDetails from "../../patient/Dashboard/PatReport/ReportDetails/ReportDetails"
import "./AdmReport.css"
function AdmReport(){
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('admin'));
    const axios=require('axios')

    const [prevAppt,setAppt]=useState([])
    const [details,setDetail]=useState({show:false,details:{}})

     useEffect(()=>{
         axios.get('http://localhost:5000/auth/prevAppt',{params:{admin:user.Admin_ID}})
         .then((res)=>{
             setAppt([...res.data.result])
         })
     },[])

     let callback = (childData) =>{
        setDetail({show:true,details:childData})
    }


    function logout(){
        dispatch({ type: LOGOUT ,user:"admin"});
        history.push('/');
    }

    
    return(
        <div className="wrapper">
        <NavBar user="admin"/>
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

                    <p style={{marginLeft:"20px"}}><b>View Appointment Reports</b></p>
                        <div class = "app_grid">
                        {prevAppt.map(appt=><ReportCard appt={appt} callback={callback} />)}
                           
                        </div>
                    </div>
                    <div class="contpat c2">
                        <p style = {{marginBottom:"20px"}}><b>Appointment Report</b></p>
                        <ReportDetails  details={details}/>
                       
                    </div>
                </div>
                </div>
                
            </div>
    )
}

export default AdmReport;

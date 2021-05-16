import React,{useEffect,useState} from "react"
import "./PatReport.css"
import NavBar from "../../../NavBar/NavBar"
import { LOGOUT } from "../../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import ReportCard from "./ReportCard/ReportCard"
import ReportDetails from "./ReportDetails/ReportDetails"
function PatReport(){
    const user = JSON.parse(localStorage.getItem('patient'));
    const axios=require('axios')
    const dispatch = useDispatch();
    const history = useHistory();
    const [prevAppt,setAppt]=useState([])
    const [details,setDetail]=useState({show:false,details:{}})

     useEffect(()=>{
         axios.get('http://localhost:5000/auth/prevAppt',{params:{pat:user.pat_ID}})
         .then((res)=>{
             setAppt([...res.data.result])
         })
     },[])

     let callback = (childData) =>{
         console.log(childData)
        setDetail({show:true,details:childData})
    }


     function logout(){
        dispatch({ type: LOGOUT ,user:"patient"});
        history.push('/');
    }
    return(
        <div className="wrapper">
        <NavBar user="patient"/>
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

export default PatReport;

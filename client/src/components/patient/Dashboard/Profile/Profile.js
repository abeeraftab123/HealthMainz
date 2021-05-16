import React,{useState,useEffect} from 'react'
import NavBar from "../../../NavBar/NavBar"
import PrevAppt from "./PrevAppt/PrevAppt"
import "./Profile.css"
function PatProfile(){
    const axios=require('axios')
    const user=JSON.parse(localStorage.getItem('patient'));
    const [prevAppt,setAppt]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/auth/prevAppt',{params:{pat:user.pat_ID}})
        .then((res)=>{
            setAppt([...res.data.result])
        })
    },[])
    return(
        <div>
            <NavBar user="patient"/>
                <div class="containerPatProf">
                    <div class="cont_profile">
                        <p style = {{marginBottom:"60px"}}><b>User Profile</b></p>
                        <div className="details" style={{marginLeft:"1.5%", }}>
                            <p><span class="pattext">Patient ID:</span> {user.pat_ID}</p>
                            <p><span class="pattext">Name:</span> {user.Pat_Name}</p>
                            <p><span class="pattext">Date of birth:</span> {user.DOB}</p>
                            <p><span class="pattext">Email:</span> {user.Email_ID}</p>
                            <p><span class="pattext">Phone no:</span> {user.Phone_No}</p>
                            <p><span class="pattext">Address:</span> {user.Address}</p>
                            <p><span class="pattext">Gender:</span> {user.Gender}</p>
                            <p><span class="pattext">Blood Group:</span> {user.Blood_Group}</p>
                            {/* <i class="fas fa-user-edit fa-2x circle-icon" style = {{marginLeft:"80%"}}></i> */}
                        </div>
                    </div>
                    <div class="cont_past_app">
                    

                    <b className="head-prof">Your Appointments</b>
                    <div class="scrollbar">
				        <div class="force-overflow"></div>
			        </div>
                        <div class = "past_app_grid">
                            {prevAppt.map(appt=><PrevAppt appt={appt} />)}
                        </div>
                    </div>
                </div>
                </div>
                
            
      

    )
}
export default PatProfile
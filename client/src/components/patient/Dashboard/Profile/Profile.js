import React,{useState} from 'react'
import NavBar from "../../../NavBar/NavBar"
import "./Profile.css"
function PatProfile(){
    const user=JSON.parse(localStorage.getItem('patient'));
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
                            <i class="fas fa-user-edit fa-2x circle-icon" style = {{marginLeft:"80%"}}></i>
                        </div>
                    </div>
                    <div class="cont_past_app">
                    

                    <p><b>Your Appointments</b></p>
                    <div class="scrollbar">
				        <div class="force-overflow"></div>
			        </div>
                        <div class = "past_app_grid">
                            <div class="past_app_view d1"></div>
                            <div class="past_app_view d2"></div>
                            <div class="past_app_view d3"></div>
                            <div class="past_app_view d4"></div>
                            <div class="past_app_view d5"></div>
                            <div class="past_app_view d6"></div>
                            <div class="past_app_view d7"></div>
                            <div class="past_app_view d8"></div>
                            <div class="past_app_view d9"></div>
                           
                        </div>
                    </div>
                </div>
                </div>
                
            
      

    )
}
export default PatProfile
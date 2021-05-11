import React,{useState} from 'react'
import NavBar from "../../../NavBar/NavBar"
function PatProfile(){
    const user=JSON.parse(localStorage.getItem('patient'));
    return(
        <div >
            <NavBar user="patient"/>
            <div className="details" style={{marginLeft:"10%"}}>
                <p>Patient ID: {user.pat_ID}</p>
                <p>Name: {user.Pat_Name}</p>
                <p>Date of birth: {user.DOB}</p>
                <p>Email: {user.Email_ID}</p>
                <p>Phone no: {user.Phone_No}</p>
                <p>Address: {user.Address}</p>
                <p>Gender: {user.Gender}</p>
                <p>Blood Group: {user.Blood_Group}</p>
            </div>
        </div>
    )
}
export default PatProfile
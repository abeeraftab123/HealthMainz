import React from "react"
import {useHistory} from 'react-router-dom';
import "./NavBar.css"
function NavBar(props){
    const history = useHistory();
   const user=props.user;

    function addAppt(){
        if(user==="patient"){
            history.push("/patient/bookAppt")
        }
        else if(user==="doctor"){
            console.log("doctor signed in")
        }
        else{
            console.log("admin signed in")
        }
    }
    function viewAppts(){
        if(user==="doctor")
        history.push("/doctor/apptsReq")
        else if(user==="patient")
        history.push("/patient/report")
        else if (user==="admin")
        history.push("/admin/report")
    }
    function profile(){
        if(user==="patient"){
            history.push("/patient/profile")
        }
        else if(user==="doctor"){
            history.push("/doctor/profile")
        }
    }
    return(
        <div class="sidebar">
            <ul>
                <li><i class="far fa-user fa-2x" onClick={profile}></i></li>
                <li><i class="fas fa-plus fa-2x" onClick={addAppt}></i></li>
                <li><i class="fas fa-robot fa-2x"></i></li>
                {user==="doctor"?<li><i class="fas fa-notes-medical fa-2x" onClick={viewAppts}></i></li>:null}
                {user==="patient"||user==="admin"?<li><i class="fas fa-tasks fa-2x" onClick={viewAppts}></i></li>:null} 
            </ul>
        </div>
    )
}

export default NavBar;
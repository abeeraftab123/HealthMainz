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
    }
    function dashboard(){
        if(user==="patient")
        history.push("/dashboard")
        if(user==="doctor")
        history.push("/doctor/dashboard")
        if(user==="admin")
        history.push("/admin/dashboard")
    }
    return(
        <div class="sidebar">
            <i class="fas fa-home fa-2x" onClick={dashboard}></i>
            <ul>{user==="patient"?<>
                <li><i class="far fa-user fa-2x" onClick={profile}></i></li>
                <li><i class="fas fa-plus fa-2x" onClick={addAppt}></i></li>
                <li><i class="fas fa-tasks fa-2x" onClick={viewAppts}></i></li></>
            :null}
            {user==="doctor"?<>
                <li><i class="fas fa-notes-medical fa-2x" onClick={viewAppts}></i></li>
               </>
            :null}
            {user==="admin"?<>
                <li><i class="fas fa-tasks fa-2x" onClick={viewAppts}></i></li></>
            :null}
            </ul>
        </div>
    )
}

export default NavBar;
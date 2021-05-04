import React from "react"
import NavBar from "../NavBar/NavBar"
import { LOGOUT } from "../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import "../doctor/Dashboard/Dashboard.css"
function AdminDash(){
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user.Admin_ID);

    function getRequests(){
        history.push("/admin/req")
    }
    function logout(){
        dispatch({ type: LOGOUT });

    history.push('/');
    }
    return(
        <div className="wrapper">
        <NavBar />
        <div class="main_content">
            <div class="headZap">
            <div class="header">{user?user.Admin_ID:null}
            <div className="requests" onClick={getRequests} style={{cursor:"pointer"}}>
                Requests
            </div>
            </div>
            <br></br>
            <div onClick={logout}>
            <i class="fas fa-sign-out-alt"></i>
            </div>
            </div>
        </div>
        </div>
    )
}

export default AdminDash;
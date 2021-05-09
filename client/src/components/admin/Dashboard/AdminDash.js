import React from "react"
import NavBar from "../../NavBar/NavBar"
import { LOGOUT } from "../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import "./AdminDash.css"
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
            {/* <div className="requests" onClick={getRequests} style={{cursor:"pointer"}}>
                Requests
            </div> */}
            </div>
            <br></br>
            <div onClick={logout}>
            <i class="fas fa-sign-out-alt"></i>
            </div>
            </div>
            <div class="grid-container-adm">
                <div class="addDoc"><p style = {{marginLeft: "28px"}}>Add Doctors</p>
                    <div class="docDetail">
                        <div class="it1"><input id="inpBoxDoc" type="text" placeholder="First Name*"></input></div>
                        {/* <br></br> */}
                        <div class="it1"><input id="inpBoxDoc" type="text" placeholder="Last *"></input></div>
                        {/* <br></br> */}
                        <div class="it1"><input id="inpBoxDoc" type="email" placeholder="Email ID*"></input></div>
                        {/* <br></br>  */}
                        {/* <div class="it2"><div id="docPic"></div></div> */}
                        {/* <br></br>  */}
                        <div class="it1"><input id="inpBoxDoc" type="text" placeholder="Phone Number*"></input></div>
                        {/* <br></br> */}
                        <div class="it1"><input id="inpBoxDoc" type="text" placeholder="Qualification*"></input></div>
                        {/* <br></br> */}
                        <div class="it1"><input id="inpBoxDoc" type="password" placeholder="Password"></input></div>
                        {/* <br></br> */}
                        <div class="it1"><input id="inpBoxDoc" type="password" placeholder="Confirm Password*"></input></div>
                        
                    </div>
                    <div className="addDocBut">{/*onClick={log}*/}
                            Add Doctor
                        </div>
                </div> 

                <div class="stats">Statistics</div>
                
                <div class="graph">Graph</div>
            </div>
        </div>
        </div>
    )
}

export default AdminDash;
import React from "react"
import {useHistory} from 'react-router-dom';
function NavBar(){
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    function addAppt(){
        if(user.pat_ID!==undefined){
            history.push("/patient/bookAppt")
        }
        else if(user.Doc_ID!==undefined){
            console.log("doctor signed in")
        }
        else{
            console.log("admin signed in")
        }
    }
    return(
        <div class="sidebar">
            <ul>
                <li><i class="far fa-user fa-2x"></i></li>
                <li><i class="fas fa-plus fa-2x" onClick={addAppt}></i></li>
                <li><i class="fas fa-robot fa-2x"></i></li>
            </ul>
        </div>
    )
}

export default NavBar;
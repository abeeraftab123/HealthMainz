import React from 'react'
import NavBar from "../../../NavBar/NavBar"
function DocProfile(){
    const user=JSON.parse(localStorage.getItem('doctor'));
    return(
        <div >
            <NavBar user="doctor"/>
            <div className="details" style={{marginLeft:"10%"}}>
                <p>Doc ID:{user.Doc_ID}</p>
                <p>Name:{user.Doc_Name}</p>
                <p>Department:{user.Dept_No}</p>
                <p>Email:{user.Doc_email}</p>
                <p>Qualification:{user.Qualification}</p>
            </div>
        </div>
    )
}
export default DocProfile
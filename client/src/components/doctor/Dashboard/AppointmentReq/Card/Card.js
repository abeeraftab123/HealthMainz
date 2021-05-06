import React from 'react'
import "./Card.css"
function Card(props){
    const appt=props.appt
    function sendDetails(){
        props.callBack(appt);
    }
    return(
        <div className="appt" onClick={sendDetails}>
           <span className="text">Appointment ID: {appt.Appt_ID}</span>
        </div>
    )
}

export default Card;
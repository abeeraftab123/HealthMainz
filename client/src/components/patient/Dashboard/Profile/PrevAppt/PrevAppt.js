import React from 'react'

function PrevAppt(props){
    let appt=props.appt;
    console.log(appt)
    return(
        <div class="past_app_view d1">
            <p><b>{appt.Appt_ID}</b></p>
            <p>{appt.Dname}</p>
            <p>{appt.date}</p>
            <p>Time: {appt.time}</p>
            
        </div>
    )
}

export default PrevAppt
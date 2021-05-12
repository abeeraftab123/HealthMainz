import React from 'react'

function PrevAppt(props){
    let appt=props.appt;
    console.log(appt)
    return(
        <div class="past_app_view d1">
            <p>{appt.Dname}</p>
            <p>{appt.date}</p>
            <p>{appt.time}</p>
            <p>{appt.Appt_ID}</p>
        </div>
    )
}

export default PrevAppt
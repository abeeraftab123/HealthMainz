import React from 'react'

function ReportCard(props){
    const axios=require('axios');

   

    function sendDetails(){
        axios.post("http://localhost:5000/auth/getReport",{apptID:appt.Appt_ID})
        .then((res)=>{
            props.callback(res.data.report)
        })
    }
    const appt=props.appt
    return(
        <div class="app_view d1" onClick={sendDetails}>
            <div class="tt">
            <p>{appt.Dname}</p>
            <p>{appt.date}</p>
            <p>{appt.time}</p>
            <p>{appt.Appt_ID}</p> </div>
        </div>
    )
}

export default ReportCard
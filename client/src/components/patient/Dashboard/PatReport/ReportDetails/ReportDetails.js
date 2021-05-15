import React from 'react'

function ReportDetails(props){
    const details=props.details.details;
    return(
        <>{props.details.show?<>
            <div class="dropTHEbox">
                <div class="Illness drop">
                    <span class="purpletext">Appointment ID: {details.Appt_ID}</span>
                    <span class="purpletext">Appointment Date: {details.Appt_Date}</span>
                    <span class="purpletext">Appointment Time: {details.Appt_Time}</span>
                    <br></br>
                    <span class="purpletext">Doctor: {details.Doc_Name}</span>
                    <span class="purpletext">Patient: {details.Pat_Name}</span>
                </div>
                            
            </div>
            <div class="symptoms">
                <span class="purpletext">Doctor Feedback: </span>
                <div type="text" class="symptom-box" rows="5" cols="50" style={{color:"white"}}>
                {details.feedback}
                </div>
            </div>
            </>
        :null}
        </>
    )
}

export default ReportDetails
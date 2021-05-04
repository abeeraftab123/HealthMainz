import "./appointment.css";


export default function AppointmentCard(props) {
    const axios=require('axios');
    let appt=props.appt;
    return(
        <>
        <div className="appointmentCard">
            <h3>Appointment ID :{appt.Appt_ID}</h3>
            <h3>Patient ID :{appt.doc_id}</h3>
            <h3>Illness:{appt.illness}</h3>
            <h3>Date:{appt.date}</h3>
            <h3>Time:{appt.time}</h3>
        </div>
        </>
    )
}
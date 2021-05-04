import "./appointment.css";


export default function AppointmentCard(props) {
    const axios=require('axios');
    let appt=props.appt;
    console.log(appt)
    function confirm(){
        axios.post('http://localhost:5000/auth/confirmAppt',{appt})
        .then((res)=>{
            console.log(res);
        })
        window.location.reload();
    }
    return(
        <>
        <div className="appointmentCard">
            <h3>Patient ID :{appt.pat_id}</h3>
            <h3>Illness:{appt.illness}</h3>
            <h3>Date:{appt.date}</h3>
            <h3>Time:{appt.time}</h3>
            <button onClick={confirm}>Approve</button>
        </div>
        </>
    )
}
const mongoose=require('mongoose');
const appointment=new mongoose.Schema({
    Appt_ID:String,
    pat_id:String,
    doc_id:String,
    illness:String,
    date:String,
    time:String,
    symptom:String,
    approved:Boolean,
    completed:Boolean
});
module.exports=mongoose.model("Appointment",appointment);
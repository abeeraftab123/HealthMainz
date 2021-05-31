const mongoose=require('mongoose');
const report=new mongoose.Schema({
    Report_ID:String,
    Appt_ID:String,
    Doc_Name:String,
    Pat_Name:String,
    Appt_Date:String,
    Appt_Time:String,
    feedback:String,
    meds:Array
});
module.exports=mongoose.model("Report",report);
const mongoose=require('mongoose');
const doctor=new mongoose.Schema({
    Doc_ID:String,
    Doc_Name:String,
    Doc_ph_No:String,
    Doc_email:String,
    Qualification:String,
    Dept_No:String,
    doc_pass:String
});
module.exports=mongoose.model("Doctor",doctor);
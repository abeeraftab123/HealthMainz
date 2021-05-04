const mongoose=require('mongoose');
const patient=new mongoose.Schema({
    pat_ID:String,
    Pat_Name:String,
    DOB:String,
    Phone_No:String,
    Blood_Group:String,
    Email_ID:String,
    Gender:String,
    Address:String,
    password:String,
});
module.exports=mongoose.model("Patient",patient);
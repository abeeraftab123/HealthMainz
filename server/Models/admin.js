const mongoose=require('mongoose');
const admin=new mongoose.Schema({
    Admin_ID:String,
    Ad_pass:String
});
module.exports=mongoose.model("Admin",admin);
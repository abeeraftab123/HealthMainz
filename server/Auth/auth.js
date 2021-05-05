const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const bcrypt=require('bcryptjs');
const expressSession=require('express-session');
const cors=require('cors');
const jwt=require('jsonwebtoken') 
const nodemailer = require('nodemailer');

const Doctor=require("../Models/doctor");
const Patient=require("../Models/patients");
const Admin=require("../Models/admin");
const Appointment=require("../Models/appointment");

const app=express();
require("dotenv").config();
mongoose.connect(process.env.mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},
()=>{
    console.log("Mongoose is connected");
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors());

app.use(expressSession({
    secret: "secretcode",
    resave:true,
    saveUninitialized:true
}));

app.use(cookieParser("secretcode"));


app.post("/patient/login",(req,res)=>{
    console.log(req.body)
    const pid=req.body.username;
    const pass=req.body.password;

    Patient.findOne({pat_ID:pid},(err,pat)=>{
        if(err) console.log(err)

        if(!pat)  res.json({msg:"user is not registered"})

        if(pat){
            bcrypt.compare(pass,pat.password)
            .then(isMatch=>{
                if(!isMatch)  res.json({msg:"password incorrect"});
                console.log("patient signed in");
                jwt.sign(
                    {id:pat._id},
                    process.env.JWT_SECRET,
                    {expiresIn:process.env.JWT_EXPIRESIN},
                    (err,token)=>{
                        if(err) console.log(err)
                        const cookieOptions={
                            expires:new Date(
                                Date.now()+process.env.Cookie_Expire*24*60*60*1000
                            ),
                            httpOnly:true
                        }
                        res.cookie('jwt',token,cookieOptions)
                        res.json({patient:pat})
                    }
                )
            })
        }
    })

});

app.post("/patient/reg",(req,res)=>{
    let pat=req.body;
    Patient.findOne({Phone_No:req.body.Phone_No},(err,patient)=>{
        if(err)
        console.log(err);
        if(patient){
            console.log("Patient already registered");
            res.json({
                data:"true"
            })
        }
        else if(!patient){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    const newPatient=new Patient({
                        pat_ID:pat.pat_ID,
                        Pat_Name:pat.Pat_Name,
                        DOB:pat.DOB,
                        Phone_No:pat.Phone_No,
                        Blood_Group:pat.Blood_Group,
                        Email_ID:pat.Email_ID,
                        Gender:pat.Gender,
                        Address:pat.Address,
                        password:hash
                    });
                    newPatient.save((err,patient)=>{
                        if(err)
                        console.log(err);
                        else{
                            console.log("Patient account created");
                            jwt.sign(
                                {id:patient._id},
                                process.env.JWT_SECRET,
                                {expiresIn:process.env.JWT_EXPIRESIN},
                                (err,token)=>{
                                    if(err) console.log(err)
                                    res.json({
                                        token:token,
                                        patient:{
                                            id:patient._id
                                        }
                                    })
                                }
                            )
                        }
                    })
                });
            });
        }
    })

});

app.post("/doc/reg",(req,res)=>{
    let doc=req.body;
    Doctor.findOne({Doc_ID:doc.Doc_ID},(err,doctor)=>{
        if(doctor) return res.json({msg:"Doctor has already registered"})
        else if(!doctor){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(doc.doc_pass, salt, function(err, hash) {
                    const newDoctor=new Doctor({
                        Doc_ID:doc.Doc_ID,
                        Doc_Name:doc.Doc_Name,
                        Doc_ph_No:doc.Doc_ph_No,
                        Doc_email:doc.Doc_email,
                        Qualification:doc.Qualification,
                        Dept_No:doc.Dept_No,
                        doc_pass:hash,
                        Approved:false
                    });
                    newDoctor.save((err,doctor)=>{
                        if(err)
                        console.log(err);
                        else{
                            console.log("Doctor account created");
                            jwt.sign(
                                {id:doctor._id},
                                process.env.JWT_SECRET,
                                {expiresIn:process.env.JWT_EXPIRESIN},
                                (err,token)=>{
                                    if(err) console.log(err)
                                    res.json({
                                        token:token,
                                        doctor:{
                                            id:doctor._id
                                        }
                                    })
                                }
                            )
                        }
                    })
                });
            });
        }
    })

})

app.post("/doc/login",(req,res)=>{
    const doc=req.body
    console.log(doc)
    Doctor.findOne({Doc_ID:doc.ID},(err,doctor)=>{
        if(doctor===null) return res.json({msg:"doctor has not registered"})
        if(doctor.Approved===false) return res.json({msg:"doctor account not approved by admin"})
        if(doctor.Approved===true){
            bcrypt.compare(doc.pass,doctor.doc_pass)
            .then(isMatch=>{
                if(!isMatch)  return res.json({msg:"password incorrect"});
                jwt.sign(
                    {id:doctor._id},
                    process.env.JWT_SECRET,
                    {expiresIn:process.env.JWT_EXPIRESIN},
                    (err,token)=>{
                        if(err) console.log(err)
                        const cookieOptions={
                            expires:new Date(
                                Date.now()+process.env.Cookie_Expire*24*60*60*1000
                            ),
                            httpOnly:true
                        }
                        res.cookie('jwt',token,cookieOptions)
                        res.json({doctor:doctor})
                    }
                )
            })
        }
    })
})

app.post("/admin/login",(req,res)=>{
    const ad=req.body
    console.log(ad)
    Admin.findOne({Admin_ID:ad.username},(err,admin)=>{
        console.log(admin)
        if(err) console.log(err)

        if(!admin) return res.status(400).json({msg:"admin is not registered"})

        if(admin){
                if(admin.Ad_pass!==ad.password) return res.status(400).json({msg:"password incorrect"});
                console.log("admin signed in");
                jwt.sign(
                    {id:admin._id},
                    process.env.JWT_SECRET,
                    {expiresIn:process.env.JWT_EXPIRESIN},
                    (err,token)=>{
                        if(err) console.log(err)
                        const cookieOptions={
                            expires:new Date(
                                Date.now()+process.env.Cookie_Expire*24*60*60*1000
                            ),
                            httpOnly:true
                        }
                        res.cookie('jwt',token,cookieOptions)
                        res.json({admin:admin})
                    }
                )
        }
    })
})

app.post("/admin/requests",(req,res)=>{
    Doctor.find({},(err,requests)=>{
        console.log(requests)
        if(err) console.log(err)
        if(!requests) return res.json({message:"no requests"})
        res.json({requests:requests})
    })
})

app.post("/admin/approve",(req,res)=>{
    Doctor.updateOne({Doc_ID:req.body.ID},[{$set:{Approved:true}}],(err,result)=>{
        if(err) console.log(err)
      })
        
    

    Doctor.findOne({Doc_ID:req.body.ID},(err,doc)=>{
        let mail=doc.Doc_email
        console.log(mail)
        let transporter = nodemailer.createTransport({
            host:  "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: 'healthmainz@gmail.com', 
                pass: process.env.mail_pass  
            },
            tls:{
              rejectUnauthorized:false
            }
          });
        
          let mailOptions = {
              from: '"HealthMainz" <healthmainz@gmail.com>', 
              to: mail, 
              subject: 'Account Approved', 
              text: 'Hello world?', 
              html: "Greetings "+doc.Doc_Name+" your account has been approved and your ID is:"+doc.Doc_ID 
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);   
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
              return res.status(200).json({message:"email sent"})
          });

    })
})

app.get("/getDoctors",(req,res)=>{
    let ans=[];
    Doctor.find({},(err,results)=>{
        if(err) console.log(err)
        results.forEach(r=>{
            if(r.Approved===true)
            ans.push(r);
        })
        res.json({result:ans});
    })
})

app.post("/bookAppt",(req,res)=>{
    const newAppt=new Appointment(req.body.data);
    newAppt.save((err,appt)=>{
        if(err) console.log(err);
        res.status(200).json({appt:appt})
    })
    
})

app.get("/getAppt",(req,res)=>{
    let result=[]
    if(req.query.doc!==undefined){
        const id=(req.query.doc)
        Appointment.find({doc_id:id},(err,r)=>{
            if(err) console.log(err)
            r.forEach((appt)=>{
                if(appt.approved===false)
                result.push(appt);
            })
            return res.status(200).json({result:result})
        })
    }

    if(req.query.pat!==undefined){
        const id=(req.query.pat)
        Appointment.find({pat_id:id},(err,r)=>{
            if(err) console.log(err)
            r.forEach((appt)=>{
                if(appt.approved===true)
                result.push(appt);
            })
            return res.status(200).json({result:result})
        })
    }

})

app.post('/confirmAppt',(req,res)=>{
    const id=(req.body.appt.Appt_ID);
    Appointment.updateOne({Appt_ID:id},[{$set:{approved:true}}],(err,result)=>{
        if(err) console.log(err)
      })

      Patient.findOne({pat_ID:req.body.appt.pat_id},(err,pat)=>{
        let mail=pat.Email_ID
        let transporter = nodemailer.createTransport({
            host:  "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: 'healthmainz@gmail.com', 
                pass: process.env.mail_pass  
            },
            tls:{
              rejectUnauthorized:false
            }
          });
        
          let mailOptions = {
              from: '"HealthMainz" <healthmainz@gmail.com>', 
              to: mail, 
              subject: 'Appointment Confirmed!', 
              text: 'Hello world?', 
              html: "Greetings "+pat.Pat_Name+" your appointment has been confirmed and your appointment ID is:"+id 
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);   
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
              return res.status(200).json({message:"email sent"})
          });

    })
})



module.exports=app;





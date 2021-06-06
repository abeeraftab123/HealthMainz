const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const bcrypt=require('bcryptjs');
const expressSession=require('express-session');
const cors=require('cors');
const jwt=require('jsonwebtoken') 
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');


const Doctor=require("../Models/doctor");
const Patient=require("../Models/patients");
const Admin=require("../Models/admin");
const Appointment=require("../Models/appointment");
const Report =require("../Models/report");
const { parse } = require('dotenv');
const pdfTemplate = require("../Documents");

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
    const doc=req.body;
    Doctor.findOne({Doc_email:doc.Doc_email},(err,doctor)=>{
        if(doctor) return res.json({msg:"Doctor has already registered"})
        else if(!doctor){
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(doc.doc_pass, salt, function(err, hash) {
                    const newDoctor=new Doctor({
                        Doc_ID:doc.Doc_ID,
                        Doc_Name:doc.Doc_Name,
                        Doc_ph_No:doc.Doc_ph_no,
                        Doc_email:doc.Doc_email,
                        Qualification:doc.Qualification,
                        Dept_No:doc.Dept_No,
                        doc_pass:hash
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
                                  to: doctor.Doc_email, 
                                  subject: 'Account Created', 
                                  text: 'Hello world?', 
                                  html: "Greetings "+doctor.Doc_Name+" your account has been created.<br></br> Your ID is:"+doctor.Doc_ID+" and password:"+doc.doc_pass 
                              };
                            
                              transporter.sendMail(mailOptions, (error, info) => {
                                  if (error) {
                                      return console.log(error);
                                  }
                                  console.log('Message sent: %s', info.messageId);   
                                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                                  return res.status(200).json({message:"email sent"})
                              });
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
        if(doctor===null) return res.json({msg:"Admin has not registered this account"})
        else{
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


app.post("/getDoctors",async (req,res)=>{
    let ans=[];
    console.log(req.body)
    const dept=req.body.illness
    const time=req.body.time
    const date=req.body.date
    if(time!==""&&date!=""){
        // Doctor.find({Dept_No:dept},(err,results)=>{
        //     if(err) console.log(err)
        //     results.forEach(r=>{
        //         ans.push(r);
        //     })
        //     res.json({result:ans});
        // })
        const doctor= await Doctor.find({Dept_No:dept})
        const allAppt= await Appointment.find({completed:false,illness:dept})
        doctor.forEach((doc)=>{
            const appt=allAppt.filter(appt=>appt.doc_id==doc.Doc_ID)
            if(appt.length===0)
            ans.push(doc)
            else{
                const sameDateAppt=appt.filter((appt)=>appt.date==date)
                if(sameDateAppt.length===0)
                ans.push(doc)
                else{
                        let flag=0;
                        sameDateAppt.forEach(appt=>{
                            let [hour,min]=appt.time.split(':');
                            let [checkHour,checkMin]=time.split(':');
                            let minutes1=(hour*60)+min;
                            let minutes2=(checkHour*60)+checkMin;
                            if(Math.abs(minutes1-minutes2)<40){
                                flag=1;
                            }
                        })
                        console.log(flag)
                        if(flag===0)
                        ans.push(doc)
                }
            }
        })
        res.json({result:ans});
    }
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
    var today = new Date();
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
                let compareDate=new Date(appt.date)
                if(appt.approved===true&&appt.completed===false)
                result.push(appt);
            })
            return res.status(200).json({result:result})
        })
    }

})

app.post('/confirmAppt',(req,res)=>{
    const id=(req.body.id);
    Appointment.updateOne({Appt_ID:id},[{$set:{approved:true}}],(err,result)=>{
        if(err) console.log(err)
      })

      Patient.findOne({pat_ID:req.body.pid},(err,pat)=>{
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
              return res.status(200).json({message:"email sent"})
          });

    })
})

app.get("/cAppt",(req,res)=>{
    let names=[]
    if(req.query.doc!==undefined){
        const id=(req.query.doc)
        Appointment.find({doc_id:id},(err,r)=>{
            if(err) console.log(err)
            const cAppt=r.filter(appt=>appt.approved===true&&appt.completed===false);
            let result=[]
            cAppt.forEach(async appt=>{
                try {
                    const name=await Patient.findOne({pat_ID:appt.pat_id})
                    let data={...appt._doc,name:name.Pat_Name}
                    result.push(data)
                } catch (error) {
                    
                }
               if(result.length===cAppt.length)
               return res.status(200).json({result:result})
            })
        })
    }
})

app.get("/checkAppt", (req,res)=>{
    var today = new Date();
    Appointment.find({},(err,appts)=>{
        let doneAppt=[]
        if(err) console.log(err)
        appts.forEach(appt=>{
            let compare=new Date(appt.date);
            if((today>compare&&appt.approved===true)&&compare.getDay()!==today.getDay())
            doneAppt.push(appt)
        })
        doneAppt.forEach(async appt=>{
            Appointment.updateOne({Appt_ID:appt.Appt_ID},[{$set:{completed:true}}],(err,result)=>{
                if(err) console.log(err)
              })
            let doc=await Doctor.findOne({Doc_ID:appt.doc_id});
            let pat=await Patient.findOne({pat_ID:appt.pat_id});
            let id=appt.Appt_ID.slice(3)

            Report.findOne({Report_ID:"R"+id},(err,res)=>{
                if(err) console.log(err)
                if(!res){
                    const newReport=new Report({
                        Report_ID:"R"+id,
                        Appt_ID:appt.Appt_ID,
                        Doc_Name:doc.Doc_Name,
                        Pat_Name:pat.Pat_Name,
                        Appt_Date:appt.date,
                        Appt_Time:appt.time,
                        feedback:"Appointment Missed"
                    })
                    newReport.save();
                }
            })
        })
    })
})

app.get("/prevAppt",(req,res)=>{
    let result=[]
    // if(req.query.doc!==undefined){
    //     const id=(req.query.doc)
    //     Appointment.find({doc_id:id},(err,r)=>{
    //         if(err) console.log(err)
    //         r.forEach((appt)=>{
    //             if(appt.approved===false)
    //             result.push(appt);
    //         })
    //         return res.status(200).json({result:result})
    //     })
    // }

    if(req.query.pat!==undefined){
        const id=(req.query.pat)
        Appointment.find({pat_id:id},(err,r)=>{
            if(err) console.log(err)
            let prevAppt= r.filter(appt=>appt.completed===true);
            prevAppt.forEach(async(appt)=>{
                const doc=await Doctor.findOne({Doc_ID:appt.doc_id});
                let data={...appt._doc,Dname:doc.Doc_Name}
                result.push(data);
                if(result.length===prevAppt.length)
                return res.status(200).json({result:result})
            })
        })
    }

    if(req.query.admin!==undefined){
        Appointment.find({},(err,r)=>{
            if(err) console.log(err)
            let prevAppt= r.filter(appt=>appt.completed===true);
            prevAppt.forEach(async(appt)=>{
                const doc=await Doctor.findOne({Doc_ID:appt.doc_id});
                let data={...appt._doc,Dname:doc.Doc_Name}
                result.push(data);
                if(result.length===prevAppt.length)
                return res.status(200).json({result:result})
            })
        })
    }

})


app.post("/getReport",(req,res)=>{
    const id=req.body.apptID;
    Report.findOne({Appt_ID:id},(err,report)=>{
        if(err) console.log(err)
        res.json({report:report})
    })
})

app.post("/docReport",(req,res)=>{
    const id=req.body.id;
    console.log(req.body)
    Appointment.findOne({Appt_ID:id},async (err,appt)=>{
        if(err) console.log(err)
        const doc=await Doctor.findOne({Doc_ID:appt.doc_id});
        const pat=await Patient.findOne({pat_ID:appt.pat_id});
        let result={
            time:appt.time,
            date:appt.date,
            docName:doc.Doc_Name,
            patName:pat.Pat_Name
        }

        res.json({result})
    })
})

app.post("/createReport",async (req,res)=>{
    let ID=req.body.data.Appt_ID;
    const appt=await Appointment.findOne({Appt_ID:ID});
    const pat=await Patient.findOne({pat_ID:appt.pat_id})
    Appointment.updateOne({Appt_ID:req.body.data.Appt_ID},[{$set:{completed:true}}],(err,result)=>{
        if(err) console.log(err)
      })
    let id=req.body.data.Appt_ID.slice(3)
    let report={Report_ID:"R"+id,...req.body.data}
    
    const newReport=new Report(report)
    newReport.save();

    pdf.create(pdfTemplate(report,appt,pat)).toFile("R"+id+".pdf", async (err) => {
        if(err) {
            return console.log('error');
        }
        else{
                let appt= await Appointment.findOne({Appt_ID:req.body.data.Appt_ID})
                let pat=await Patient.findOne({pat_ID:appt.pat_id})
                let mail=pat.Email_ID;

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
                    subject: 'Appointment Report', 
                    text: 'Hello world?', 
                    html: "Greetings "+pat.Pat_Name+" your appointment report for Appointment ID "+req.body.data.Appt_ID+" is attached below",
                    attachments: [{
                        filename: "R"+id+".pdf",
                        path: "D:\\Dev\\HealthMainz\\server\\"+"R"+id+".pdf",
                        contentType: 'application/pdf'
                    }]
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    res.status(200).json({message:"created"})
                });
        }
      });
   
    
  
    
})

module.exports=app;





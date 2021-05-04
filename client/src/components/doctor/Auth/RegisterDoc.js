import React,{useState} from 'react'
const axios=require("axios");
const RegisterDoc=()=>{
    const [password,setPassword]=useState("");
    const [f_name,setFname]=useState("");
    const [l_name,setLname]=useState("");
    const [phone,setPhone]=useState("");
    const [qual,setQual]=useState("");
    const [email,setEmail]=useState("");
    const [deptNo,setDept]=useState("");
    const Reg = () => {
        var min = 100;
        var max = 2000;
        var rand =  min + Math.floor((Math.random() * (max-min)));
        axios.post('http://localhost:5000/auth/doc/reg',{
                Doc_ID:"DA"+rand.toString(),
                Doc_Name:f_name+" "+l_name,
                Doc_email:email,
                Doc_ph_no:phone,
                Qualification:qual,
                Dept_No:deptNo,
                doc_pass:password,
                Approved:false
        }).then((res)=>{
            console.log(res.data.token)
        })
    };
    return(
        <div>
            <h1>Register</h1>
                <input type="text" placeholder="First Name"  onChange={(event)=>{setFname(event.target.value)}} ></input>
                <br></br>
                <input type="text" placeholder="Last Name" onChange={(event)=>{setLname(event.target.value)}}  ></input>
                <br></br>
                <input type="email" placeholder="Email ID" onChange={(event)=>{setEmail(event.target.value)}} ></input>
                <br></br>
                <input type="text" placeholder="Qualification"  onChange={(event)=>{setQual(event.target.value)}}></input>
                <br></br>
                <input type="date" placeholder="Department Number"  onChange={(event)=>{setDept(event.target.value)}}></input>
                <br></br>
                <input type="text" placeholder="Phone number"  onChange={(event)=>{setPhone(event.target.value)}}></input>
                <br></br>
                <input type="password" placeholder="password" name="pass" onChange={(event)=>{setPassword(event.target.value)}} ></input>
                <button type="submit" onClick={Reg}>Register</button>
        </div>
    )
}

export default RegisterDoc;
import React,{useState} from 'react'
const axios=require("axios");
const Register=()=>{
    const [password,setPassword]=useState("");
    const [f_name,setFname]=useState("");
    const [l_name,setLname]=useState("");
    const [dob,setDOB]=useState("");
    const [phone,setPhone]=useState("");
    const [gender,setGender]=useState("");
    const [email,setEmail]=useState("");
    const [address,setAdd]=useState("");
    const [bg,setBG]=useState("");
    const Reg = () => {
        var min = 100;
        var max = 2000;
        var rand =  min + Math.floor((Math.random() * (max-min)));
        axios.post('http://localhost:5000/auth/patient/reg',{
                pat_ID:"PA"+rand.toString(),
                Pat_Name:f_name+" "+l_name,
                DOB:dob,
                Phone_No:phone,
                Blood_Group:bg,
                Email_ID:email,
                Gender:gender,
                Address:address,
                password:password
        }).then((res)=>{
            console.log(res.data.token)
            if(res.data.token===undefined)
            alert("patient is already registered");
            else
            alert("patient account created");
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
                <input type="text" placeholder="Address"  onChange={(event)=>{setAdd(event.target.value)}}></input>
                <br></br>
                <input type="date" placeholder="Date of birth"  onChange={(event)=>{setDOB(event.target.value)}}></input>
                <br></br>
                <input type="text" placeholder="Gender" onChange={(event)=>{setGender(event.target.value)}} ></input>
                <br></br>
                <input type="text" placeholder="Blood Group" onChange={(event)=>{setBG(event.target.value)}} ></input>
                <br></br>
                <input type="text" placeholder="Phone number"  onChange={(event)=>{setPhone(event.target.value)}}></input>
                <br></br>
                <input type="password" placeholder="password" name="pass" onChange={(event)=>{setPassword(event.target.value)}} ></input>
                <button type="submit" onClick={Reg}>Register</button>
        </div>
    )
}

export default Register;
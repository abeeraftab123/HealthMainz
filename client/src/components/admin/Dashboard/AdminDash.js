import React,{useState} from "react"
import NavBar from "../../NavBar/NavBar"
import { LOGOUT } from "../../../constants/actionTypes";
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Notification from "../../Notifications/Notification"
import Stats from "../../Stats/Stats"
import Graph from "../../Graph/Graph"
import "./AdminDash.css"
function AdminDash(){
    const [password,setPassword]=useState("");
    const [f_name,setFname]=useState("");
    const [l_name,setLname]=useState("");
    const [phone,setPhone]=useState("");
    const [qual,setQual]=useState("");
    const [email,setEmail]=useState("");
    const [deptNo,setDept]=useState("Respiratory");
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})

    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('admin'));
    const axios=require('axios')


    function logout(){
        dispatch({ type: LOGOUT ,user:"admin"});
        history.push('/');
    }

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
                doc_pass:password
        }).then((res)=>{
                if(res.data.msg){
                    setNotify({isOpen:true,message:'Doctor already registered',type:'error'})
                }
                else
                setNotify({isOpen:true,message:'Doctor registered',type:'success'})
        })

    };

    console.log(deptNo)

    return(
        <div className="wrapper">
        <NavBar user="admin"/>
        <div class="main_content">
            <div class="headZap">
                <div class="header">{user?user.Admin_ID:null}</div>
                <br></br>
                <div onClick={logout}>
                <i class="fas fa-sign-out-alt"></i>
                </div>
            </div>
            <div class="grid-container-adm">
                <div class="addDoc"><p style = {{marginLeft: "28px"}}>Add Doctors</p>
                <Notification notif={notif} ></Notification>
                    <div class="docDetail">
                        <div class="it1"><input id="inpBoxDoc" type="text" placeholder="First Name*" onChange={(event)=>{setFname(event.target.value)}}></input></div>
                        {/* <br></br> */}
                        <div class="it1"><input id="inpBoxDoc" type="text" placeholder="Last Name*" onChange={(event)=>{setLname(event.target.value)}}></input></div>
                        {/* <br></br> */}
                        <div class="it1"><input id="inpBoxDoc" type="email" placeholder="Email ID*" onChange={(event)=>{setEmail(event.target.value)}}></input></div>
                        {/* <br></br>  */}
                        {/* <div class="it2"><div id="docPic"></div></div> */}
                        {/* <br></br>  */}
                        <div class="it1"><input id="inpBoxDoc" type="text" placeholder="Phone Number*" onChange={(event)=>{setPhone(event.target.value)}}></input></div>
                        {/* <br></br> */}
                        <div class="it1"><input id="inpBoxDoc" type="text" placeholder="Qualification*" onChange={(event)=>{setQual(event.target.value)}}></input></div>
                        {/* <br></br> */}
                        <div class="it1">
                                <select id="inpBoxDoc" onChange={(event)=>{setDept(event.target.value)}}>  
                                    <option value="Respiratory">Respiratory</option>
                                    <option value="Cardiac">Cardiac</option>
                                    <option value="General">General</option>
                                    <option value="Gynec">Gynec</option>
                                </select>
                        </div>
                        {/* <br></br> */}
                        <div class="it1"><input id="inpBoxDoc" type="password" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}></input></div>
                        <br></br>
                        <div className="addDocBut" onClick={Reg}>
                            Add Doctor
                        </div>
                        
                    </div>
                    
                </div> 

                <Stats />
                
                <Graph />
            </div>
        </div>
        </div>
    )
}

export default AdminDash;
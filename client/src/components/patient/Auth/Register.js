import React,{useState} from 'react'
import Notification from "../../Notifications/Notification"
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import "./Register.css";
import logo from "./Auth-public/title.png";
import {Modal, Button} from 'react-bootstrap'

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#76418E', alignItems: 'center',}} id="contained-modal-title-vcenter">
            <h2 style={{color: '#76418E', textAlign: 'center',}}><b>Account Successfully Created</b></h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{color: '#76418E', textAlign: 'center',}}>
            Your UserID is 193423
          </h4>
        </Modal.Body>
        <Modal.Footer style={{alignItems: 'center'}}>
          <Button style={{background: '#76418E', color: '#FFF', border: 'none',}} onClick={props.onHide}>Okay</Button>
        </Modal.Footer>
      </Modal>
    );
}

const axios=require("axios");
const Register=()=>{

    const [modalShow, setModalShow] = React.useState(false);

    const [password,setPassword]=useState("");
    const [f_name,setFname]=useState("");
    const [l_name,setLname]=useState("");
    const [dob,setDOB]=useState("");
    const [phone,setPhone]=useState("");
    const [gender,setGender]=useState("");
    const [email,setEmail]=useState("");
    const [address,setAdd]=useState("");
    const [bg,setBG]=useState("");
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
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
            if(res.data.token===undefined)
            setNotify({isOpen:true,message:'Patient already registered',type:'info'})
            else
            setNotify({isOpen:true,message:'Patient registered',type:'success'})
        })
    };
    return(
        <div>
            <div className="contain">
            
            <Notification notif={notif} ></Notification>
                <div className="join">
                    <div className="log">
                        <img id="logo-t" src={logo}></img>
                        <div className="formz">
                            <div id="act-inact"><span id="log-inact">Login</span><span id="log-act">Sign Up</span></div>
                            <input id="inpBox" type="text" name="user" placeholder="Patient ID"></input> {/*onChange={(event)=>{setUserName(event.target.value)}}*/}
                            <input id="inpBox" type="password" name="pass" placeholder="Password"></input> {/*onChange={(event)=>{setPassword(event.target.value)}}*/}
                            <div className="formBut" >{/*onClick={log}*/}
                                Login
                            </div>
                        </div>
                    <a href="#">Doctor?<br />Click Here </a>
                    </div>
                </div>
                <div className="features">
                    <div className="feat">
                        <h1 className="signHead"><b>Sign Up</b></h1>
                        <input id="inpBoxfirstname" type="text" placeholder="First Name*"  onChange={(event)=>{setFname(event.target.value)}} ></input>
                        {/* <br></br> */}
                        <input id="inpBoxfirstname" type="text" placeholder="Last *" onChange={(event)=>{setLname(event.target.value)}}  ></input>
                        <br></br>
                        <input id="inpBoxfirstname" type="email" placeholder="Email ID*" onChange={(event)=>{setEmail(event.target.value)}} ></input>
                        {/* <br></br> */}
                        <input id="inpBoxfirstname" type="text" placeholder="Address*"  onChange={(event)=>{setAdd(event.target.value)}}></input>
                        <br></br>
                        <input id="inpBoxfirstname" type="password" placeholder="Password*" name="pass" onChange={(event)=>{setPassword(event.target.value)}} ></input>
                        {/* <br></br> */}
                        <input id="inpBoxfirstname" type="date" placeholder="Date of birth*"  onChange={(event)=>{setDOB(event.target.value)}}></input>
                        <br></br>
                        <input id="inpBoxfirstname" type="password" placeholder="Confirm Password*" name="pass" onChange={(event)=>{setPassword(event.target.value)}} ></input>
                        <input id="inpBoxgender" type="text" placeholder="Gender*" onChange={(event)=>{setGender(event.target.value)}} ></input>
                        {/* <br></br> */}
                        <input id="inpBoxgender" type="text" placeholder="Blood Group*" onChange={(event)=>{setBG(event.target.value)}} ></input>
                        <br></br>
                        <input id="inpBoxfirstname" type="text" placeholder="Phone number*"  onChange={(event)=>{setPhone(event.target.value)}}></input>
                        {/* <br></br> */}
                        <div class="mark">*Marked fields are mandatory</div>
                        <div className="signBut" onClick={Reg} onClick={() => setModalShow(true)}>Sign Up</div>
                        {/* <button type="submit" onClick={Reg}>Register</button> */}
                       
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                        
                    </div>
                </div>
        </div>
        </div>
    )
}

export default Register;
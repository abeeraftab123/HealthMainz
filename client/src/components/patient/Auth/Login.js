import React,{useState} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Notification from "../../Notifications/Notification"
import { AUTH } from '../../../constants/actionTypes';
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import "./Login.css";
import logo from "./Auth-public/title.png";
import user_booking from "./Auth-public/User booking.png";
import user_dashboard from "./Auth-public/User Dashboard.png";
import user_report from "./Auth-public/User View Report.png";

const Login=()=>{
    const dispatch=useDispatch();
    const history = useHistory();
    const axios=require("axios");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [notif,setNotify]=useState({isOpen:false,message:'',type:''})
    const log = () => {
        axios.post("http://localhost:5000/auth/patient/login",{
            username:userName,
            password:password
        }).then((res)=>{
            if(res.data.msg){
                setNotify({isOpen:true,message:res.data.msg,type:'error'})
            }
            else{
                dispatch({ type: AUTH, data:res.data.patient ,user:'patient'});
                history.push("/dashboard")
            }
        })
    };
    const login=()=>{
        history.push("/patient/login")
    }
    const register=()=>{
        history.push("/patient/register")
    }
    return(
        <>
            <div className="contain">
            <Notification notif={notif} ></Notification>
                <div className="join">
                    <div className="log">
                        <img id="logo-t" src={logo}></img>
                        <div className="formz">
                            <div id="act-inact"><span id="log-act" onClick={login}>Login</span><span id="log-inact" onClick={register}>Sign Up</span></div>
                            <input id="inpBox" type="text" name="user" placeholder="Patient ID" onChange={(event)=>{setUserName(event.target.value)}} ></input>
                            <input id="inpBox" type="password" name="pass" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}></input>
                            <div className="formBut" onClick={log}>
                                Login
                            </div>

                        </div>
                    <a href="/doctor/login">Doctor?<br />Click Here </a>
                    </div>
                    
                </div>
                <div className="features">
                    <div className="feati">
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={user_booking}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>Easy Bookings</h3>
                            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={user_report}
                            alt="Second slide"
                            />

                            <Carousel.Caption>
                            <h3>Report Generation</h3>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={user_dashboard}
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Interactive Dashboard</h3>
                            {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                            </Carousel.Caption>
                        </Carousel.Item>
                        </Carousel>
                        </div>
                    
                </div>

            </div>
        </>
    )
}

export default Login


        // <div>
        //     <h1>Login</h1>
        //         <input type="text" name="user" placeholder="username" onChange={(event)=>{setUserName(event.target.value)}} ></input>
        //         <input type="password" name="pass" placeholder="password" onChange={(event)=>{setPassword(event.target.value)}}></input>
        //         <button type="submit" onClick={log}>Login</button>
        // </div>
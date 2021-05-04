import React,{useState} from 'react'
import Carousel from 'react-bootstrap/Carousel';
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
    //const [password,setPassword]=useState("");
    const log = () => {
        axios.post("http://localhost:5000/auth/patient/login",{
            username:userName,
            password:password
        }).then((res)=>{
            console.log(res.data.patient);
            dispatch({ type: AUTH, data:res.data.patient });
            history.push("/dashboard")
        })
    };
    return(
        <>
            <div className="contain">
                <div className="join">
                    <div className="log">
                        <img id="logo-t" src={logo}></img>
                        <div className="formz">
                        
                            <div id="act-inact"><span id="log-act">Login</span><span id="log-inact">Sign Up</span></div>
                            <input id="inpBox" type="text" name="user" placeholder="Patient ID" onChange={(event)=>{setUserName(event.target.value)}} ></input>
                            <input id="inpBox" type="password" name="pass" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}></input>
                            <div className="formBut">
                                Login
                            </div>

                        </div>
                    <a href="#">Doctor?<br />Click Here </a>
                    </div>
                    
                </div>
                <div className="features">
                    <div className="feat">
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
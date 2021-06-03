import React,{useState} from 'react'
import { AUTH } from '../../../constants/actionTypes';
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import "./AdminLogin.css";
import logo from "./Auth-public/logo.png";
import admlogo from "./Auth-public/admlogo.png";
import Carousel from 'react-bootstrap/Carousel';
import user_booking from "./Auth-public/User booking.png";
import user_dashboard from "./Auth-public/User Dashboard.png";
import user_report from "./Auth-public/User View Report.png";



const AdminLogin=()=>{
    const dispatch=useDispatch();
    const history = useHistory();
    const axios=require("axios");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const log = () => {
        axios.post("http://localhost:5000/auth/admin/login",{
            username:userName,
            password:password
        }).then((res)=>{
            console.log(res.data.admin);
            dispatch({ type: AUTH, data:res.data.admin,user:"admin" });
            history.push("/admin/dashboard")
        })
    };
    return(
        <>
        <div className="contain">
            <div className="join">
                <div className="log">
                    <img id="logo-t" src={logo}></img>
                    <img id="logo-d" src={admlogo}></img>
                    
                    <div className="formz">
                        <div id="act-inact"><span id="log-act">Login</span>
                        </div>
                        <input id="inpBox" type="text" name="user" placeholder="Admin ID" onChange={(event)=>{setUserName(event.target.value)}} ></input>
                        <input id="inpBox" type="password" name="pass" placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}></input>
                        <div className="formBut" onClick={log}>
                            Login
                        </div>

                    </div>
               
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

export default AdminLogin;
import React,{useState} from 'react'
import { AUTH } from '../../../constants/actionTypes';
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';


const LoginDoc=()=>{
    const dispatch=useDispatch();
    const history = useHistory();
    const axios=require("axios");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const log = () => {
        axios.post("http://localhost:5000/auth/doc/login",{
            ID:userName,
            pass:password
        }).then((res)=>{
            dispatch({ type: AUTH, data:res.data.doctor });
            history.push("/doctor/dashboard")
        })
    };
    return(
        <div>
            <h1>Login</h1>
                <input type="text" name="user" placeholder="username" onChange={(event)=>{setUserName(event.target.value)}} ></input>
                <input type="password" name="pass" placeholder="password" onChange={(event)=>{setPassword(event.target.value)}}></input>
                <button type="submit" onClick={log}>Login</button>
        </div>
    )
}

export default LoginDoc;
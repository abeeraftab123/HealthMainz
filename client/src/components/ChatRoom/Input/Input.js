import React from 'react';
import {Link} from 'react-router-dom'
import "./Input.css"

const Input =({message,setMessage,sendMessage})=>{
    return (
        <form className="form">
            <input className="input" type="text" placeholder="Type a message" value={message} onChange={(event)=>setMessage(event.target.value)} onKeyPress={(event)=>event.key==='Enter'?sendMessage(event):null} />
            <button className="sendButton" onClick={(event)=>sendMessage(event)}>Send</button>
            <Link  to={`/video`}>
                    <button style={{backgroundColor: "#553066", color: "#FFF", padding:"8px"}} >VIDEO CALL</button>
                </Link>
        </form>
    )
    

}

export default Input;
import React from 'react';
import {Link} from 'react-router-dom'
import "./Input.css"

const Input =({message,setMessage,sendMessage})=>{
    function openVideo(event){
        event.preventDefault()
        window.open("http://localhost:3000/video", '_blank');
    }
    return (
        <form className="form">
            <input className="input" type="text" placeholder="Type a message" value={message} onChange={(event)=>setMessage(event.target.value)} onKeyPress={(event)=>event.key==='Enter'?sendMessage(event):null} />
            <button className="sendButton" onClick={(event)=>sendMessage(event)}>Send</button>
            {/* <Link  to={`/video`}>
                    <button style={{backgroundColor: "#553066", color: "#FFF", padding:"8px"}} >VIDEO CALL</button>
                </Link> */}
                <button style={{backgroundColor: "#553066", color: "#FFF", padding:"8px"}} onClick={openVideo} >VIDEO CALL</button>
        </form>
    )
    

}

export default Input;
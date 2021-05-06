import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import './Join.css'
const Join =()=>{
    const[name,setName]=useState('')
    const [room,setRoom]=useState('');
    console.log(localStorage.getItem('profile'))
    const user = JSON.parse(localStorage.getItem('profile'));

    if (!user) {
        return (
              <h1>Please Sign In chat.</h1>
        );
      }
    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)} /></div>
                <Link onClick={event=>(!name||!room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign in</button>
                </Link>
            </div>
        </div>

    )
    
}

export default Join;
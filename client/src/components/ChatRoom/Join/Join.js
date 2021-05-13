import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import './Join.css'
const Join =({location})=>{
    const[name,setName]=useState('')
    const [room,setRoom]=useState('');
    const user1 = JSON.parse(localStorage.getItem('patient'));
    const user2 = JSON.parse(localStorage.getItem('doctor'));
    const ID=(queryString.parse(location.search).appID)
    const currentUser=(queryString.parse(location.search).user)
    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" value={ID} /></div>
                <Link onClick={event=>(!name||!ID||!user1||!user2)?event.preventDefault():null} to={`/chat?name=${name}&room=${ID}&user=${currentUser}`}>
                    <button className="button mt-20" type="submit">Join in</button>
                </Link>
            </div>
        </div>

    )
    
}

export default Join;
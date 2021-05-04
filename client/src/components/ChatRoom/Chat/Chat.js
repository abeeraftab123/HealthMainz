import React,{useState,useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from "../InfoBar/InfoBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"
let socket;
const Chat =({location})=>{
    const[name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    useEffect(()=>{
        const {name,room}=queryString.parse(location.search);

        socket=io('http://localhost:5000', { transports : ['websocket'] });


        setName(name);
        setRoom(room);

            socket.emit('join',{name,room},()=>{
            
            });
        return ()=>{
            socket.emit('disconnect');

            socket.off();
        }

        
    },['http://localhost:5000',location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages])

    //function for sending messages
    const sendMessage=(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }

    console.log(message,messages);


    return(
        <div className="outerContainer">
            <div className="container">
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>  
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                {/* <input value={message} onChange={(event)=>setMessage(event.target.value)} onKeyPress={(event)=>event.key==='Enter'?sendMessage(event):null} /> */}  
            </div>
        </div>
    )
    
}

export default Chat;
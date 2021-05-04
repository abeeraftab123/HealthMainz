import React,{useState} from 'react'
import Request from "./Request/Request"

function Requests(){
    const user = JSON.parse(localStorage.getItem('profile'));
    const axios=require('axios')

    const [req,setReq]=useState([])
    

    function loadReq(){
        axios.post("http://localhost:5000/auth/admin/requests",{
            userID:user.Admin_ID,
        }).then((res)=>{
            const filterReq=res.data.requests.filter(valid=>valid.Approved===false)
            setReq([...filterReq])
        })
    }
    
    return(
        <div style={{color:"white"}}>
        <div onClick={loadReq} style={{cursor:"pointer"}}>Load Requests</div>
        {req.map(function(doc,index){
           return( <Request docID={doc.Doc_ID} docName={doc.Doc_Name} id={index} />);
         })}
        </div>
    )
}

export default Requests
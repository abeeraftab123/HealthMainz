import React from 'react'

const axios=require('axios')
function Request(props){
    function approve(){
        console.log(props.docID)
        axios.post("http://localhost:5000/auth/admin/approve",{
            ID:props.docID,
        }).then((res)=>{
        })
    }
    const doc=`${props.docID}     ${props.docName}`
    return(
        <div>
            {doc} <button onClick={approve}>Approve</button>
        </div>
    )
}
export default Request
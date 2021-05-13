import React from 'react'
import './InfoBar.css'
import closeIcon from "../../../icons/closeIcon.png"
import onlineIcon from "../../../icons/onlineIcon.png"
import { useHistory } from 'react-router-dom';
const InfoBar=({room,user})=>{
    const history = useHistory();
    function close(){
        if(user==="patient")
        history.push("/dashboard")
        else if(user==="doctor")
        history.push("/doctor/generateReport?appID="+room)
    }
    return(
        <div className="infoBar">
        <div className="leftInnerConatiner">
                
                <h4 className="heading1">
                <img className="onlineIcon" src={onlineIcon} alt="online image"></img>
                {room}
                </h4>
        </div>
        <div style={{marginBottom: "1%"}} className="rightInnerConatiner">
            {/* <a href="/join"><img className="closeIcon" src={closeIcon} alt="close image"></img></a> */}
            <img className="closeIcon" src={closeIcon} alt="close image" onClick={close}></img>
        </div>
    </div>
    )
    
}
export default InfoBar;
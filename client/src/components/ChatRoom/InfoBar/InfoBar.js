import React from 'react'
import './InfoBar.css'
import closeIcon from "../../../icons/closeIcon.png"
import onlineIcon from "../../../icons/onlineIcon.png"
const InfoBar=({room})=>{
    return(
        <div className="infoBar">
        <div className="leftInnerConatiner">
                
                <h4 className="heading1">
                <img className="onlineIcon" src={onlineIcon} alt="online image"></img>
                {room}
                </h4>
        </div>
        <div className="rightInnerConatiner">
            <a href="/join"><img className="closeIcon" src={closeIcon} alt="close image"></img></a>
        </div>
    </div>
    )
    
}
export default InfoBar;
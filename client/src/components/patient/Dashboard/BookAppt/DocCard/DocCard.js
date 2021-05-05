import React from 'react'
import "./DocCard.css"
function DocCard(props){
    let className=`av ${props.index+1}`
    function callback(event){
        event.preventDefault();
        props.callback(props.id);
    }
    return(
        <div class="available_card">
            <div class={className}>
                {props.id}
                <br></br>
                {props.name}
                <br></br>
                <button className="book" onClick={callback}>Select</button>
            </div>
        </div>
    )
}

export default DocCard;
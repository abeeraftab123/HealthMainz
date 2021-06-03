import React from 'react'
import "./DocCard.css"
function DocCard(props){
    let className=`bav ${props.index+1}`
    function callback(event){
        event.preventDefault();
        props.callback(props.id);
    }
    return(
        <div class="available_card_book">
            <div class={className}>
                <p style={{padding: "0", marginTop: "15px"}}>{props.id}</p>
                
                <p style={{padding: "0"}}>{props.name}</p>
                
                <div className="book-ap2" onClick={callback}>Select</div>
            </div>
        </div>
    )
}

export default DocCard;
import React from 'react'
import "./Cell.css"
function Cell(props){
    return(
        <tr>
            <td colspan="2">{props.name}</td>
            <td>{props.active}</td>
            <td>{props.deaths}</td>
            <td>{props.recovered}</td>
        </tr>
    )
}

export default Cell;
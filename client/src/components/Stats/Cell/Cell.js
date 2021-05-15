import React from 'react'

function Cell(props){
    return(
        <tr>
            <td>{props.name}</td>
            <td>{props.active}</td>
        </tr>
    )
}

export default Cell;
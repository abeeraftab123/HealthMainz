module.exports=(meds)=>{
    return(
        `<tr>
            <td>${meds.name}</td>
            <td>${meds.dose}</td>
        </tr>`
    )
}
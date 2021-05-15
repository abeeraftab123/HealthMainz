import React,{useEffect,useState} from 'react'
import Cell from "./Cell/Cell"
import "./Stats.css"
function Stats(){
    const url='https://api.covid19india.org/data.json';
    const axios=require('axios')
    const [stats,setStats]=useState([])

    useEffect(async ()=>{
        const result=await axios.get(url)
        const{cases,statewise,tested}=result.data
        setStats([...statewise])
    },[])
    return(
        <div className="stats">
            <div className="scrollbar">
				<div className="force-overflow"></div>
			</div>
            <table>
                <tr>
                    <td>State name</td>
                    <td>Active Cases</td>
                </tr>
                {stats.map(data=><Cell name={data.state} active={data.active}/>)}
            </table>
            
        </div>
    )
}

export default Stats;
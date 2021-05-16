import React,{useState,useEffect} from 'react'
import {Line} from 'react-chartjs-2';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/esm/CarouselItem';
function Graph(){
    const url='https://api.covid19india.org/data.json';
    const axios=require('axios')
    const [state,setState]=useState({})
    const [state1,setState1]=useState({})
    const [state2,setState2]=useState({})
    useEffect(async ()=>{
        let labels=[]
        let data=[]
        const result=await axios.get(url)
        const{cases,statewise,tested}=result.data
        statewise.map(info=>{
            if(info.state!=="Total"){
                labels.push(info.statecode)
                data.push(parseInt(info.active))
            }      
        })
        const state = {
        labels: labels,
        datasets: [
          {
            label: 'Active Cases',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#FF9B06',
            borderColor: '#85599A',
            borderWidth: 2,
            data: data
          }
        ]
      }
      setState(state)
      labels=[]
      data=[]
      statewise.map(info=>{
        if(info.state!=="Total"){
            labels.push(info.statecode)
            data.push(parseInt(info.deaths))
        }      
    })

    setState1({
        labels: labels,
        datasets: [
          {
            label: 'Deaths',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'red',
            borderColor: '#85599A',
            borderWidth: 2,
            data: data
          }
        ]
      })

      labels=[]
      data=[]
      statewise.map(info=>{
        if(info.state!=="Total"){
            labels.push(info.statecode)
            data.push(parseInt(info.recovered))
        }      
    })

    setState2({
        labels: labels,
        datasets: [
          {
            label: 'Recovered Cases',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'green',
            borderColor: '#85599A',
            borderWidth: 2,
            data: data
          }
        ]
      })
        
    },[])


    
    return(
        <div class="graph">
        <Carousel>
            <CarouselItem>
                    <Line
                    data={state}
                options={{
                    title:{
                    display:true,
                    text:'Active cases per state',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
                style={{width:"100%",height:"70%"}}
                />
            </CarouselItem>
            <CarouselItem>
                    <Line
                    data={state1}
                options={{
                    title:{
                    display:true,
                    text:'Deaths per state',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
                style={{width:"100%",height:"70%"}}
                />
            </CarouselItem>
            <CarouselItem>
                    <Line
                    data={state2}
                options={{
                    title:{
                    display:true,
                    text:'Recovered cases per state',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
                style={{width:"500px"}}
                />
            </CarouselItem>
        </Carousel>
            
        </div>
    )
}

export default Graph
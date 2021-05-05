import React,{useState,useEffect} from 'react'
import axios from 'axios'
import MapPic from "mapmyindia-react";
import "./Map.css"
function Map(){
    const[stores,addStores]=useState([]);
    const [address,setAddress]=useState("");
    const [coord,setCoords]=useState([]);
    let m=[];
    function map(){   
        const headers = {
            'Authorization': 'bearer 98f64eaf-f471-4ca7-ab2c-e276eaf7317a'
        };
        const url1=`https://cors-anywhere.herokuapp.com/https://atlas.mapmyindia.com/api/places/geocode?address=${address}&itemCount=1`;
        axios.get(url1,{headers})
          .then(res => {
              console.log(res.data.copResults);
            setCoords([res.data.copResults.latitude,res.data.copResults.longitude]);
          });
        // const url2=`https://cors-anywhere.herokuapp.com/https://atlas.mapmyindia.com/api/places/nearby/json?keywords=pharmacy&refLocation=${coord[0]}%2C${coord[1]}&page=1&region=IND&radius=10000`;
        // axios.get(url2,{headers})
        //   .then(res => {
        //     addStores([...res.data.suggestedLocations]);
        //   });
    }
    useEffect(()=>{
        stores.forEach(store => {
            const marker={
                position:[store.latitude,store.longitude],
                draggable:true,
                title:store.placeName
            }
            m.push(marker);
        });
        console.log(m);
        
    },[m]);  
    useEffect(()=>{
        console.log(coord)
        const headers = {
            'Authorization': 'bearer 98f64eaf-f471-4ca7-ab2c-e276eaf7317a'
        };
        const url2=`https://cors-anywhere.herokuapp.com/https://atlas.mapmyindia.com/api/places/nearby/json?keywords=pharmacy&refLocation=${coord[0]}%2C${coord[1]}&page=1&region=IND&radius=10000`;
        axios.get(url2,{headers})
          .then(res => {
            addStores([...res.data.suggestedLocations]);
          });
    },[coord])
    return(
        <div className="map">
          <div id="addSearch"> 
        <input id="searchBox" placeholder="Enter address" onChange={(event)=>{setAddress(event.target.value)}}></input>
        <div class="seachIcon" onClick={map}><i class="fas fa-search"></i></div>
        </div>
        <div className="mapBox">
                <MapPic
        markers={m} 
      />
      </div>
        </div>
        
    );
}

export default Map;
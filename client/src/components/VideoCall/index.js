import React from 'react';

import VideoCall from "./VideoCall";
import { ContextProvider } from './Context';


function Video(){
    return(
        <ContextProvider>
        <VideoCall />
      </ContextProvider>
    )
}

export default Video
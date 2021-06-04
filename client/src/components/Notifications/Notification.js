import React,{useState,useEffect} from 'react'
import {Snackbar,IconButton } from '@material-ui/core'
import { Alert,AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
  
function Notification(props){
    const notif=props.notif;
    const[open,setOpen]=useState(false)

    useEffect(()=>{
        setOpen(notif.isOpen)
    },[notif]);  
    return(
          <Snackbar
         open={open}
         autoHideDuration={30} 
         anchorOrigin={{vertical:'top',horizontal:'centre'}}  >
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  window.location.reload();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }

            severity={notif.type}
          >
             <AlertTitle>{notif.type}</AlertTitle>
                 {notif.message}
          </Alert>
        </Snackbar>
    )
}

export default Notification
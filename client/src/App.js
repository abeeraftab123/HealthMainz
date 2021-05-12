import React from 'react'
import{BrowserRouter as Router,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Join from "./components/ChatRoom/Join/Join";
import Chat from "./components/ChatRoom/Chat/Chat";
import Register from "./components/patient/Auth/Register"
import Login from "./components/patient/Auth/Login"
import Dashboard from "./components/patient/Dashboard/Dashboard"
import LoginDoc from "./components/doctor/Auth/LoginDoc"
import AdminLogin from "./components/admin/Auth/AdminLogin"
import AdminDash from "./components/admin/Dashboard/AdminDash"
import Requests from "./components/admin/Requests/Requests"
import AdmReport from "./components/admin/AdmReport/AdmReport"
import DocDashboard from "./components/doctor/Dashboard/DocDashboard"
import BookAppt from "./components/patient/Dashboard/BookAppt/BookAppt"
import AppointmentReq from "./components/doctor/Dashboard/AppointmentReq/AppointmentReq"
import PatProfile from "./components/patient/Dashboard/Profile/Profile"
import DocProfile from "./components/doctor/Dashboard/Profile/Profile"
// import Landing from "./components/Landing/Landing"
import PatReport from "./components/patient/Dashboard/PatReport/PatReport"

const App = () =>{
    return(
        <Router>
            {/* <Route path="/" component={Landing} /> */}

            <Route path="/join" exact component={Join} />
            <Route path="/chat" component={Chat} />

            <Route path="/patient/register" component={Register} />
            <Route path="/patient/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/patient/bookAppt" component={BookAppt} />
            <Route path="/patient/profile" component={PatProfile} />
            <Route path="/patient/report" component={PatReport} />


            <Route path="/doctor/login" component={LoginDoc} />
            <Route path="/doctor/dashboard" component={DocDashboard} />
            <Route path="/doctor/apptsReq" component={AppointmentReq} />
            <Route path="/doctor/profile" component={DocProfile} />


            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/dashboard" component={AdminDash} />
            <Route path="/admin/req" component={Requests} />
            <Route path="/admin/report" component={AdmReport} />
        </Router>
    )
}

export default App;
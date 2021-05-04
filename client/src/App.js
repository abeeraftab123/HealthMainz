import React from 'react'
import{BrowserRouter as Router,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Join from "./components/ChatRoom/Join/Join";
import Chat from "./components/ChatRoom/Chat/Chat";
import Register from "./components/patient/Auth/Register"
import Login from "./components/patient/Auth/Login"
import Dashboard from "./components/patient/Dashboard/Dashboard"
import RegisterDoc from "./components/doctor/Auth/RegisterDoc"
import LoginDoc from "./components/doctor/Auth/LoginDoc"
import AdminLogin from "./components/admin/AdminLogin"
import AdminDash from "./components/admin/AdminDash"
import Requests from "./components/admin/Requests/Requests"
import DocDashboard from "./components/doctor/Dashboard/DocDashboard"
import BookAppt from "./components/patient/Dashboard/BookAppt/BookAppt"
const App = () =>{
    return(
        <Router>
            <Route path="/join" exact component={Join} />
            <Route path="/chat" component={Chat} />
            <Route path="/patient/register" component={Register} />
            <Route path="/patient/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/patient/bookAppt" component={BookAppt} />


            <Route path="/doctor/register" component={RegisterDoc} />
            <Route path="/doctor/login" component={LoginDoc} />
            <Route path="/doctor/dashboard" component={DocDashboard} />


            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/dashboard" component={AdminDash} />
            <Route path="/admin/req" component={Requests} />
        </Router>
    )
}

export default App;
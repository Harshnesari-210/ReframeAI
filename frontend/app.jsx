import React from 'react'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Genarate from "./components/generate.jsx"
import Profile from './components/profile.jsx'
import Login from './components/login.jsx'
import History from './components/History.jsx'
import RegistrationPage from './components/registration.jsx'
const App = () => {
  return <>
      
    <Router>
      <Routes>
      <Route path="/registration" element={<RegistrationPage/>}/>
        <Route path="/generate" element={<Genarate/>}/>
         {/* <Route path='*' element={<NotFound/>} /> */}
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/' element={<Login/>}/>
         <Route path='/history' element={<History/>}/>
      </Routes>

    </Router>

    </>
  
}

export default App

import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Principal from './pages/all/Principal'
import Register from './pages/all/Register'
import Login from './pages/all/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
/*import './App.css'


import Principal from './pages/all/Principal'
import { Container } from '@mui/material'
import Register from './pages/all/Register'
import Layout from './components/Layout'

function App() {

  return (
    //<Register/>
    
    <Principal></Principal>

    //<Layout></Layout>

    
  )
}

export default App*/

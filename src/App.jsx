import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Registration from './pages/Registration'
 import Login from './pages/Login'
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<Registration/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path='/recipe/:id' element={<RecipeDetails/>}/>
      
    </Routes>
  </BrowserRouter>
  )
}

export default App

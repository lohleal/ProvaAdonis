import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from './pages/Inicio/inicio.js';
import Login from './pages/Logins/login';
import HomeLider from './pages/Homes/homeLider.js';
import HomeFuncionario from './pages/Homes/homeFuncionario.js';
import AldoNews from "./pages/AldoNews/news.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path='/login' element={<Login />} />
          <Route path='/homeLider' element={<HomeLider />} />
          <Route path='/homeFuncionario' element={<HomeFuncionario />} />
          <Route path='/news' element={<AldoNews />} />
          <Route path="/" element={<Inicio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
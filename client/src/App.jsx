import { useState } from 'react';
import { Routes, Route } from "react-router-dom"

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import CatList from "./components/cat-list/CatList"
import CatCreate from "./components/cat-create/CatCreate"
import CatDetails from "./components/cat-details/CatDetails"
import { AuthContext } from './context/AuthContext';


function App() {
  const [authState, setAuthState] = useState({});

  const changeAuthState = (state) => {
    setAuthState(state);
  }

  const contextData = {
    userId: authState._id,
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    changeAuthState,
  };
  return (
    <AuthContext.Provider value={contextData}>
      <div id="box">
        <Header />


        <main id="main-content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cats' element={<CatList />} />
            <Route path='/cats/:catId/details' element={<CatDetails />} />
            <Route path='/cats/create' element={<CatCreate />} />

          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  )
}

export default App

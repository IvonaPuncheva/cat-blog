import { Routes, Route } from "react-router-dom"

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import CatList from "./components/cat-list/CatList"
import CatCreate from "./components/cat-create/CatCreate"

function App() {

  return (
    <div id="box">
<Header />


<main id="main-content">
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/cats' element={<CatList />} />
    <Route path='/cats/create' element={<CatCreate />} />

  </Routes>
</main>
    </div>
  )
}

export default App

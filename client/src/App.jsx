import { Routes, Route } from "react-router-dom"

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import CatList from "./components/cat-list/CatList"
import CatCreate from "./components/cat-create/CatCreate"
import CatDetails from "./components/cat-details/CatDetails"
import { AuthContextProvider } from './context/AuthContext';
import CatEdit from './components/cat-edit/CatEdit';


function App() {
  return (
    <AuthContextProvider >
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
            <Route path="/cats/:catId/edit" element={<CatEdit />} />        
          </Routes>
        </main>
      </div>
    </AuthContextProvider>
  )
}

export default App




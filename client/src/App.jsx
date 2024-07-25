import { useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Router,
  Route,
  Link,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Single from './pages/Single';
import Write from './pages/Write';
import Footer from './components/Footer';
import "./style.scss";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/cat' element={<Single />} />
        <Route path='/write' element={<Write />} />
      </Route>

      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

    </>
  )
);

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  )
}



export default App

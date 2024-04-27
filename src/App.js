import Home from './container/HomeContainer';
import Cart from './container/CartContainer';
import Nav from './container/NavbarContainer'
import NotFound from './container/NotFoundContainer';
import {BrowserRouter, Routes, Route,  Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
 


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
      <Nav/>
 
     <Routes>
      <Route path = "/Cart" Component={Cart}/>
      <Route path='*' Component={NotFound}/>
      <Route path='/'   Component={Home}/>
      <Route path='/not-found' element ={<Navigate to= '/' replace = {true}/>}/>
      
     </Routes>
      </BrowserRouter>
  
   
    </div>
  );
}

export default App;

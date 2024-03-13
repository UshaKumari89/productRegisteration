import './index.css';
import Home from './Components/Home';
import NavBar from './Components/Navbar';
import UserRegister from './Components/UserRegister';
import SignUp from "./Components/SignIn";
import Login from './Components/Login.jsx'; 
import Confirmation from  './Components/Confirmation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Login" element={<Login/>} /> 
       <Route path="/Confirmation" element={<Confirmation/>} /> 
      </Routes>
    </Router>
  );
}

export default App;

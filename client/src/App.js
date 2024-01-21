// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import About from './Components/About';
import Register from './Components/Register';
import Contact from './Components/Contact';
import Home from './Components/Home';
import Signup from './Components/Signup';
import ErrorPage from './Components/ErrorPage';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/About' element={<About/>}/> 
          <Route path='/Register' element={<Register/>}/> 
          <Route path='/Contact' element={<Contact/>}/> 
          <Route path='/Signup' element={<Signup/>}/> 
          <Route path='/ErrorPage' element={<ErrorPage/>}/> 
      </Routes>
    </Router>
  );
}

export default App;

import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './components/About.js';
import Home from './components/Home.js';
import NavBar from './components/NavBar.js';
import NoteState from './context/Notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthState from './context/AuthCheck/AuthState';

function App() {
  
  return (
    <>    
    <AuthState>

    <NoteState>
      <Router>
        <NavBar navType='dark' bgColor="#358297"  textColor="white" />
         <div className="container my-3">
          <Routes>

              <Route exact path='/' element={<Home/>}></Route> 
              <Route exact path='/about' element={< About/>}></Route> 
              <Route exact path='/login' element={< Login />}></Route> 
              <Route exact path='/signup' element={< Signup />}></Route> 
          </Routes>
         </div>
      </Router>
    </NoteState>
    </AuthState>

    </>
  );
}

export default App;

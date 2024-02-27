import React from 'react';
import './Landing.css';
import {Routes, Route} from 'react-router-dom'
import { Link } from 'react-router-dom'
import Signup from './Signup'

function App() {
  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <h1>Slasher Villains</h1>
          <div className="buttons">
            <button className="login">Log In</button>
            <Link to = "./Signup" className="signup">Sign Up</Link>
          </div>
        </nav>
        <p>Behind every great scream lies an even greater villain</p>
      </header>
      <Routes>
        <Route path='/Signup' element={<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;

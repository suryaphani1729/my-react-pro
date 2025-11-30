import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './Home.jsx';
import About from './About.jsx';
import NavBar from './Navbar.jsx';

function App() {

  return (
    <div className='App'>
      <header>
        
        <NavBar />


      </header>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />

          <Route path='*' element={<h1>404 page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;

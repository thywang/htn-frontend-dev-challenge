import './App.css';
import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Events from './components/Events.js';
import Login from './components/Login.js';

function App() {
  // login state is shared
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path='/' element={<Events isAuthed={isAuthed} />} />
        <Route exact path='/login' element={<Login isAuthed={isAuthed} setIsAuthed={setIsAuthed} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

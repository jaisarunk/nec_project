import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Protected from './Protected';

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path='/home' element={<Protected Cmp={Home} />}>              
            </Route>
          </Routes>
      </Router>
  );
}
export default App;
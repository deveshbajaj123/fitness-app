import Form from './pages/Form.jsx'; 
import {Routes, Route} from 'react-router-dom'; 
import Calculator from './pages/Calculator.jsx'; 
import React from 'react'; 
import Display from './pages/Display.jsx';

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/login" element={<Calculator/>} />  
        <Route path="/display" element={<Display />} />      
      </Routes>

       
    </div>
  );
}

export default App;

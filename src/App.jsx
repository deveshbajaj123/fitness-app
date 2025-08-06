import Form from './pages/Form.jsx'; 
import {Routes, Route} from 'react-router-dom'; 
import Calculator from './pages/Calculator.jsx'; 
import React from 'react'; 

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/login" element={<Calculator/>} />        
      </Routes>

       
    </div>
  );
}

export default App;

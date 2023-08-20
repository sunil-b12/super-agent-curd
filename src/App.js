import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuperAgent from './Component/Super Agent/SuperAgent';
function App() {
  return (
    <>
      <ToastContainer />
      <div className="App">
        <SuperAgent />
      </div>
    </>

  );
}

export default App;
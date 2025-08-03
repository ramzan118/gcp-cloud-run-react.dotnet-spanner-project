import React  from 'react';
import './App.css';
import Navbar from './components/Navbar';
import './App.css';
import TextForm from './components/TextForm';
//let name ="Muhammad Ramzan for test 1";
function App() {
  return (
    <>
   
       {/* <Navbar title="TextUtils" aboutText="About TextUtils" /> */}
        {/* <Navbar/> */}
        <Navbar title="TextUtils" />
        <div className="container my -3"> 
        <TextForm heading="Enter the Text to Analyze Below"/>
        </div>
    </>
  );
}

export default App;

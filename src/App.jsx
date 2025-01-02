
// import './App.css'
// import Footer from './components/landing-page/Footer'
// import Header from './components/landing-page/header'
// import Signup from './pages/Signup/Signup'

// function App() {


//   return (
//     <>
//     {/* <div className='h-svh w-full overflow-scroll hidescroll'> */}

//    <Header/>
//    <Signup/>
//    <Footer/>
//     {/* </div> */}
//     </>
//   )
// }

// export default App
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AllRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;

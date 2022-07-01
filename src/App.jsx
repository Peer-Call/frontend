import { useState } from "react";
// import logo from './logo.svg'
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Oncall from "./Oncall";
import PeerCall from "./PeerCall.jsx";


function App() {
  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      <PeerCall/>
    </div>
  );
}

export default App;

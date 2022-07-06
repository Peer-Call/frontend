import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Oncall from "./Oncall";
import PeerCall from "./PeerCall";

function App() {
  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      <Routes>
        <Route path="/" element={<PeerCall />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Login />} />
        <Route path="videocall" element={<Oncall />} />
      </Routes>
    </div>
  );
}

export default App;

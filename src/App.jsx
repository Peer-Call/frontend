import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Oncall from "./pages/Oncall";
import PeerCall from "./pages/PeerCall";

function App() {
  return (
    <div className="h-screen flex flex-col justify-center items-center overflow-hidden">
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

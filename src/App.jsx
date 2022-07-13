import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Oncall from "./Oncall";
import PeerCall from "./PeerCall";
import NotFound from "./NotFound";
import { useEffect } from "react";
import { user } from "./GunInstance";
import { useLocation } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

function App() {
  let location = useLocation();

  const { setUsername, setGunUserId } = useStoreActions(
    (actions) => actions.user
  );

  useEffect(() => {
    console.log("[Root useEffect]:", "location :", location);
    console.log("[Root useEffect] :", "user.is value:", user.is?.pub);
    setGunUserId(user?.is?.pub || "");
    user.get("alias").once((username) => {
      console.log(
        "[Root useEffect getAlias once] :",
        "username from gun :",
        username
      );
      setUsername(username)
    });
  }, [user.is]);

  return (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      <Routes>
        <Route path="/" element={<PeerCall />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Login />} />
        <Route path="videocall/:videoCallId" element={<Oncall />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Oncall from "./Oncall";
import PeerCall from "./PeerCall";
import NotFound from "./NotFound";
import { useEffect } from "react";
import { user } from "./GunInstance";
import { useStoreActions } from "easy-peasy";

import { Toaster } from "react-hot-toast";

function App() {
  const { setUsername, setGunUserId } = useStoreActions(
    (actions) => actions.user
  );

  useEffect(() => {
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
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<PeerCall />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Login />} />
        <Route path="videocall/:videoCallId" element={<Oncall />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div >
  );
}

export default App;

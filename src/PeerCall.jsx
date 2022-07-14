import Button from "./component/Button.jsx";
import { Link } from "react-router-dom";
import Avatar from "./component/Avatar";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { gun, user } from "./GunInstance.js";
import { useStoreState, useStoreRehydrated, useStoreActions } from "easy-peasy";

function PeerCall() {
  const { username, gunUserId, isLoggedIn } = useStoreState(
    (state) => state.user
  );
  const logout = useStoreActions((actions) => actions.user.logout);
  const isRehydrated = true; //useStoreRehydrated(); HACK: not using rehydration for now..fix the sign in first for different tabs and all

  let navigate = useNavigate();

  // TODO: list all the users in the gun database to see if database works,
  // useEffect(()=>{},[])

  // useEffect(() => {
  //   console.log(s_user);
  //   if (!isLoggedIn) {
  //     user.auth(s_user.username, s_user.password, (e) => {
  //       if (e.err) console.log(e.err);
  //       else {
  //         console.log(e);
  //         setIsLoggedIn(true);
  //         gun.get("~@nice").once(console.log);
  //         gun.get("key").put({
  //           property: "value",
  //           object: {
  //             nested: true,
  //           },
  //         });
  //         gun.get("key").once(console.log);
  //       }
  //     });
  //   }
  // }, []);

  const startCall = () => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    const videoCallId = nanoid();
    console.log("[startCall] :", "videoCallId :", videoCallId);
    console.log(
      "[startCall] :",
      "gunUserId :",
      gunUserId,
      "videoCallId :",
      videoCallId
    );
    // creates a new meeting in gun db and store it with users id too.
    let videocall = gun.get(videoCallId).put({
      hostId: gunUserId,
      hostUsername: username,

    });
    gun.get("videocalls").set(videocall);

    navigate(`/videocall/${videoCallId}`);
  };

  return (
    <section>
      {isRehydrated && (
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
          <div className="flex w-full mx-auto text-left">
            <div className="relative inline-flex items-center mx-auto align-middle">
              <div className="text-center">
                <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
                  Free and Open source <br />
                  Decentralised Video Calling app <br />
                </h1>
                <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">
                  We made PeerCall video calling privacy friendly and
                  decentralised so that you can communicate freely.
                </p>
                <div className="flex justify-center w-full max-w-2xl mx-auto mt-6">
                  <div className="mt-3 rounded-lg mr-12 sm:mt-0">
                    <Button text="Start Call" onClick={startCall} />
                  </div>
                  <Link to="/signup">
                    <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                      <Button
                        text="Sign up"
                        className="bg-white mr-4 text-blue-600 hover:text-white"
                      />
                    </div>
                  </Link>
                  <div className="absolute top-5 right-7">
                    <div className="fixed w-min right-4 top-4 flex">
                      <Avatar username={username} isLoggedIn={isLoggedIn} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PeerCall;

import Button from "../component/Button.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { db, user } from "../GunInstance.js";

import { useStoreState, useStoreRehydrated, useStoreActions } from "easy-peasy";

import Avatar from "../component/Avatar";

import { dropdown } from "preline";

function PeerCall() {
  const s_user = useStoreState((state) => state.user);
  const updateUser = useStoreActions((actions) => actions.updateUser);
  const isRehydrated = useStoreRehydrated();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    console.log(s_user);
    if (!IsLoggedIn) {
      user.auth(s_user.username, s_user.password, (e) => {
        if (e.err) console.log(e.err);
        else {
          // console.log(e);
          setIsLoggedIn(true);
          // db.get("~@nice@nice.com").once(console.log);
          // db.get("key").put({
          //   property: "value",
          //   object: {
          //     nested: true,
          //   },
          // });
          // db.get("key").once(console.log);
        }
      });
    }
  }, []);

  return (
    <section>
      {isRehydrated && (
        <>
          <div className="absolute top-5 right-7">
            {
              <Avatar IsLoggedIn={false} setIsLoggedIn={setIsLoggedIn} updateUser={updateUser} username={s_user.username} />
            }
          </div>
          < div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
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
                      <Button
                        text="Start Call"
                        onClick={() => {
                          if (IsLoggedIn) {
                            navigate("/videocall");
                          } else {
                            navigate("/signin");
                          }
                        }}
                      />
                    </div>
                    <Link to="/signup">
                      <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                        <Button
                          text="Sign up"
                          color="bg-white"
                          marg="mr-4"
                          textcolor="text-blue-600"
                          hovertext="white"
                        // onClick={() => {
                        //   console.log("sign in button clicked");
                        //   navigate("/signin");
                        // }}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
      }
    </section >
  );
}

export default PeerCall;

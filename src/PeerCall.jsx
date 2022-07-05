import Button from "./component/Button.jsx";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

import GUN from "gun/gun";
import "gun/sea";
import { useEffect, useState } from "react";

import { useStoreState, useStoreRehydrated } from 'easy-peasy';


function PeerCall() {
  const s_user = useStoreState((state) => state.username);
  const isRehydrated = useStoreRehydrated();

  const db = GUN({ peers: ['http://peercall-gun.herokuapp.com/gun'], localStorage: false, retry: Infinity });
  const user = db.user()

  let navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <section>
      {isRehydrated ?
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
          <div className="flex w-full mx-auto text-left">
            <div className="relative inline-flex items-center mx-auto align-middle">
              <div className="text-center">
                <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
                  Free and Open source <br />
                  Decentralised Video Calling app <br />
                  {s_user}
                </h1>
                <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">
                  We made PeerCall video calling privacy friendly and
                  decentralised so that you can communicate freely.
                </p>
                <div className="flex justify-center w-full max-w-2xl mt-12 mx-auto mt-6">
                  <div className="mt-3 rounded-lg mr-12 sm:mt-0">
                    <Button text="Start Call" onClick={() => {
                      if (s_user != "") {
                        navigate("/videocall");
                      }
                      else {
                        navigate("/signin");
                      }
                    }} />
                  </div>
                  <Link to="/signin">
                    <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                      <Button
                        text="Sign in"
                        color="white"
                        marg="4"
                        textcolor="blue-600"
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
        : <p>onnula</p>}
    </section>
  );
}

export default PeerCall;

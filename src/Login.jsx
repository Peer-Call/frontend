import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./component/Button.jsx";

import { useStoreState, useStoreActions } from "easy-peasy";

import { gun, user } from "./GunInstance";

import { FiEye, FiEyeOff } from "react-icons/fi";
import PasswordField from "./component/PasswordField";

function Login() {
  const [localUsername, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const { username } = useStoreState((state) => state.user);
  const { setUsername, setGunUserId } = useStoreActions(
    (actions) => actions.user
  );

  let navigate = useNavigate();

  useEffect(() => {
    // setLocalUsername("sadbutterfly507");
    // setPassword("9gh[hc/=7-mt/3'z,'exic2``txvohbm`c9-5;]]");
    // gun.on("auth", (ack) => {
    //   console.log("Authentication was successful: ", ack, localUsername);
    //   // const videoCallId = nanoid();
    //   // console.log("[On auth] :", "videoCallId :", videoCallId);
    //   // console.log(
    //   //   "[On auth] :",
    //   //   "gunUserId :",
    //   //   gunUserId,
    //   //   "videoCallId :",
    //   //   videoCallId
    //   // );
    //   // // TODO: create a new meeting in gun db and store it with users id too.
    //   // let videocall = gun.get(videoCallId).put({
    //   //   videoCallId: videoCallId,
    //   //   hostId: gunUserId,
    //   // });
    //   // gun.get("videocalls").set(videocall);
    //   // navigate(`/videocall/${videoCallId}`);
    // });
  }, []);

  const logIn = () => {
    user.auth(localUsername, password, (ack) => {
      if (ack.err) {
        setStatus("Error :", ack.err);
        console.log("[logIn()] :", "Error :", ack);
        return;
      }
      setStatus("logged In");
      console.log("[logIn()] :", ack);

      const gunUserId = ack?.soul;
      console.log("[logIn()] :", "username", localUsername);
      console.log("[logIn()] :", "gunUserId", gunUserId);
      setUsername(localUsername);
      setGunUserId(gunUserId);

      // save to session storage
      // user.recall({ sessionStorage: true }, () => {
      //   console.log("[user.recall()]","hope it is stored in session")
      // });

      navigate("/");
    });
  };

  return (
    <section>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-xl lg:w-96">
          <div>
            <a href="/" className="text-medium text-blue-600">
              Peercall
            </a>
            <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">
              Sign in
            </h2>
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  logIn();
                }}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-neutral-600"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      required=""
                      placeholder="Your Username"
                      className="block w-full transform rounded-lg border border-transparent bg-gray-50 px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      value={localUsername}
                      onChange={(event) => {
                        setLocalUsername((u) => {
                          console.log(event.target.value);
                          return event.target.value;
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-neutral-600"
                  >
                    Password
                  </label>

                  <PasswordField/>
                  
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      placeholder="Your password"
                      className="h-4 w-4 rounded border-gray-200 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-neutral-600"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <Button type="submit" text="Sign In" />
              </form>
            </div>
          </div>
        </div>
        {status}
        <br />
        {username.alias}
      </div>
    </section>
  );
}

export default Login;

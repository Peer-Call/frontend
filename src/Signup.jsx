import Button from "./component/Button.jsx";
import { useEffect, useState } from "react";

import { user } from "./GunInstance";
import { useNavigate } from "react-router-dom";
import PasswordField from "./component/PasswordField.jsx";

function Signup() {
  const [status, setStatus] = useState("");
  const [isDuplicateUsername, setIsDuplicateUsername] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    // const username = "sadbutterfly507";
    // const password = "9gh[hc/=7-mt/3'z,'exic2``txvohbm`c9-5;]]";
    // setUsername(username);
    // setPassword(password);
    // setConfirmPassword(password);
  }, []);

  const signUp = () => {
    // TODO: this check should be shifted to onFocusOut in confirm password input field
    // field

    if (password !== confirmPassword) {
      setStatus("Passwords should match");
      return;
    }

    user.get(`~@${username}`).once(() => {
      setIsDuplicateUsername(true);
      setStatus("User with username already exists");
    });

    if (!isDuplicateUsername) {
      user.create(username, password, (ack) => {
        if (ack.err) {
          console.log("[signUp()] :", "error :", ack);
          setStatus(ack.err);
          return;
        }
        // TODO: show notification that user is created
        console.log(
          "[signUp()] :",
          `username : ${username}, password : ${password} created`
        );
        console.log("[signUp()] :", "ack :", ack);
        navigate("/");

        // if (e.err) {
        //   setStatus(e.err);
        // } else {
        //   // FIXME: this is not logging into gun, just saving the username in
        //   // the userStore
        //   setStatus("logged In");
        //   updateUser({ username: username, password: password });
        //   navigate("/");
        // }
      });
    }
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
              Sign Up.
            </h2>
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  signUp();
                }}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-neutral-600"
                  >
                    {" "}
                    Username{" "}
                  </label>
                  <div className="mt-1 ">
                    <input
                      id="username"
                      name="username"
                      required=""
                      placeholder="Your Username"
                      className="block w-full transform rounded-lg hover:shadow-md border border-transparent bg-gray-50 px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      value={username}
                      onChange={(event) => {
                        setUsername((u) => {
                          // console.log(event.target.value);
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
                  <PasswordField setPassword={setPassword} />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-neutral-600"
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                  <PasswordField setPassword={setConfirmPassword} />
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
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    ></a>
                  </div>
                </div>
                <Button type="submit" text="Sign Up" />
              </form>
            </div>
            {status}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;

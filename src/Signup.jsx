import Button from "./component/Button.jsx";
import { useEffect, useState } from "react";

import { db, user } from "./GunInstance";
import { useNavigate } from "react-router-dom";
import { useStoreActions } from 'easy-peasy';

function Signup() {
  const [status, setStatus] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  let navigate = useNavigate();
  const updateUser = useStoreActions((actions) => actions.updateUser);

  useEffect(() => {
    setUsername("nice");
    setPassword1("nice@nice.co");
    setPassword2("nice@nice.co");
  }, []);

  const signUp = () => {

    if (password1 != password2) {
      setStatus("Passwords should match")
      return
    }

    user.get("~@" + username).once(() => {
      setUsernameExists(true); setStatus("User with username already exists")
    });

    if (usernameExists == false) {
      user.create(username, password1, (e) => {
        if (e.err) {
          setStatus(e.err);
        }
        else {
          setStatus("logged In");
          updateUser({ username: username, password: password1 });
          navigate("/");
        }
      })
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp();
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
              <form onSubmit={handleSubmit} >
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
                    {" "}
                    Password{" "}
                  </label>
                  <div className="mt-1 ">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required=""
                      placeholder="Your Password"
                      className="block w-full transform  hover:shadow-md rounded-lg border border-transparent bg-gray-50 px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      value={password1}
                      onChange={(event) => {
                        setPassword1((u) => {
                          // console.log(event.target.value);
                          return event.target.value;
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-neutral-600"
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                  <div className="mt-1 ">
                    <input
                      id="confirm-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required=""
                      placeholder="Your Password"
                      className="block w-full transform  hover:shadow-md rounded-lg border border-transparent bg-gray-50 px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      value={password2}
                      onChange={(event) => {
                        setPassword2((u) => {
                          // console.log(event.target.value);
                          return event.target.value;
                        });
                      }}
                    />
                  </div>
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

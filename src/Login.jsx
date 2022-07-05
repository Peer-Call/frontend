import { useEffect, useState } from "react";
import Button from "./component/Button.jsx";
import useGunContext from './useGunContext';

// const APP_PUBLIC_KEY = process.env.APP_PUBLIC_KEY;

function Login() {
  const { getGun, getUser, setCertificate } = useGunContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState();

  const logIn = () => {
    getUser().auth(username, password, ({ err }) => {
      if (err) {
        setAuthError(err);
      }
    });
  };

  const onCreateSuccess = ({ pub }) => {
    // get certificate and store in app memory
    fetch('http://localhost:8765/api/certificates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        pub,
      }),
    })
      .then((resp) => resp.json())
      .then(({ certificate }) => {
        setCertificate(certificate);

        // add user to user/profile list
        getGun()
          .get(`~${APP_PUBLIC_KEY}`)
          .get('profiles')
          .get(pub)
          .put({ username }, null, {
            opt: { cert: certificate },
          });

        // log in
        logIn();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setAuthError();
    logIn();
  };

  const handleSignUp = () => {
    setAuthError();

    // check if user with username already exists
    getGun()
      .get(`~@${username}`)
      .once((user) => {
        if (user) {
          setAuthError('Username already taken');
        } else {
          getUser().create(username, password, ({ err, pub }) => {
            if (err) {
              setAuthError(err);
            } else {
              onCreateSuccess({ pub });
            }
          });
        }
      });
  };

  useEffect(() => {

    setUsername("ahis@gmail.com");
    setPassword("ahis@gmail.com");
  }, []);
  return (
    <section>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-xl lg:w-96">
          <div>
            <a href="./index.html" className="text-medium text-blue-600">
              Peercall
            </a>
            <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">
              Sign in.
            </h2>
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-600"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-1 ">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required=""
                      placeholder="Your Email"
                      className="block w-full transform rounded-lg border border-transparent bg-gray-50 px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      value={username}
                      onChange={(event) => {
                        setUsername((u) => {
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
                      className="block w-full transform rounded-lg border border-transparent bg-gray-50 px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                      value={password}
                      onChange={(event) => {
                        setPassword((u) => {
                          console.log(event.target.value);
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
                    >
                      {" "}
                      Forgot your password?{" "}
                    </a>
                  </div>
                </div>
                <Button text="Sign In" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

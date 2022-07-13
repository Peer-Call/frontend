import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
function PasswordField(props) {
  const [IsHidden, setIsHidden] = useState(true);

  return (
    <div className="block w-full transform rounded-lg  text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
      <input
        placeholder="Your Password"
        type={IsHidden ? "password" : "text"}
        onChange={(event) => {
          props.setPassword(event.target.value);
        }
        }
        className="block w-full transform rounded-lg border border-transparent bg-gray-50 px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
      ></input>
      {
        IsHidden ? (
          <FiEyeOff
            onClick={() => {
              console.log("asdas");

              setIsHidden(false);

            }}
            className="absolute right-2 top-5"
          />
        ) : (
          <FiEye
            onClick={() => {
              setIsHidden(true);

            }}
            className="absolute right-2 top-5"
          />
        )
      }
    </div >
  );
}
export default PasswordField;

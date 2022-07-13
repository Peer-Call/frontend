import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreRehydrated, useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";

function Avatar(props) {

  const [AvatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setAvatarUrl("https://avatars.dicebear.com/api/identicon/" + props.username + ".svg");
  }, []);

  let navigate = useNavigate();
  const logout = useStoreActions((actions) => actions.user.logout);

  return (
    <>
      {props.isLoggedIn ?

        <div className="hs-dropdown relative inline-flex">
          <button id="hs-dropdown-custom-trigger" type="button" className="hs-dropdown-toggle py-2 px-4 inline-flex justify-center items-center gap-2 rounded-xl border-2 font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm" >
            <img className="w-8 h-auto rounded-xl" src={AvatarUrl} alt="name"></img>
            <span className="text-gray-600 font-medium ">{props.username}</span>
            <svg className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 " aria-labelledby="hs-dropdown-custom-trigger">
            <button className="flex w-full items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500" onClick={() => {
              logout();
            }}>
              Logout
            </button>
          </div>
        </div>
        :
        <div className="relative inline-flex">
          <Link to="/signup">
            <button type="button" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-xl border-2 font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none border-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm" >
              <span className="text-gray-600 font-medium truncate">Sign Up</span>
            </button>
          </Link>
        </div>
      }
    </>
  )
}

export default Avatar;

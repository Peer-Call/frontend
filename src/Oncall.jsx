import CircleButton from "./component/CircleButton";
import { FiPhone, FiVideo, FiMic } from "react-icons/fi";

function Oncall() {
  return (
    <section>
      <div className=" h-screen space-y-1  bg-black rounded-xl  grid grid-rows-3 grid-cols-4 ">
        <div className=" relative mt-2 w-full p-4 rounded-3xl col-span-3 row-span-3">
          <img
            className=" rounded-3xl h-full w-full mb-2"
            // src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
            alt="image"
          ></img>
          <div className=" flex space-x-4 left-1/2 bottom-0 mb-8 -translate-x-1/2 absolute ">
            <CircleButton blur={true}>
              <FiMic color="white" />
            </CircleButton>
            <CircleButton color="red-700">
              <FiPhone color="white" />
            </CircleButton>
            <CircleButton blur={true}>
              <FiVideo color="white" />
            </CircleButton>
          </div>
        </div>
        <div className="w-full p-4 rounded-3xl">
          <img
            className=" rounded-3xl"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            alt="image"
          />
        </div>
        <div className=" w-full p-4 rounded-3xl">
          <img
            className=" rounded-3xl"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            alt="image"
          />
        </div>
        <div className="w-full p-4 rounded-3xl ">
          <img
            className=" rounded-3xl"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            alt="image"
          />
        </div>
      </div>
    </section>
  );
}

export default Oncall;

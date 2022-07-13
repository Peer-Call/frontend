import CircleButton from "./component/CircleButton";
import Modal from "./component/Modal";
import { FiPhone, FiVideo, FiVideoOff, FiMic, FiMicOff } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { gun } from "./GunInstance";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import { Peer } from "peerjs";

let peer;
function Oncall() {
  const { videoCallId } = useParams();
  const videoElement = useRef();
  const { username, userId, isLoggedIn } = useStoreState((state) => state.user);
  const { setId, setHostId, setHostUsername, addParticipant } = useStoreActions(
    (actions) => actions.videoCall
  );

  let navigate = useNavigate();

  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isMicOff, setIsMicOff] = useState(true);

  const [localStream, setLocalStream] = useState(
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  );

  useEffect(() => {
    // 1. Checking if user is signed in otherwise send to sign in page
    // 2. Create new Peer object using userId from store
    // 3. Get the video call id from the url bar and get the meeting data from
    // the gun database and store it in the local store
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    // initialise peerjs object
    peer = new Peer(userId);

    console.log("[Video Call useEffect] :", videoCallId);

    gun
      .get("videocalls")
      .get(videoCallId)
      .on((data, id) => {
        setId(id);
        console.log("===GUN DATA===");
        Object.entries(data).forEach((entry) => {
          const [key, value] = entry;
          switch (key) {
            case "_":
              return;
            case "hostId":
              setHostId(value);
              break;
            case "hostUsername":
              setHostUsername(value);
              break;
            default:
              addParticipant({ id: value, username: key });
              break;
          }
        });
        console.log("===GUN DATA END===");
      });
  }, []);

  useEffect(() => {
    console.log("localStream :", localStream);
    if (localStream === null) {
      return;
    }
    try {
      (async function() {
        videoElement.current.srcObject = await localStream;
        toggleMic(); // NOTE: remove this line later
      })();
      // TODO: close the previous stream here and in setState
      // TODO: close this stream when it goes to different page and destroy the previous page
      return;
    } catch (err) {
      console.error("Failed to get stream", err);
    }
  }, [localStream]);

  const toggleVideo = () => {
    videoElement.current.srcObject.getTracks().map((t) => {
      if (t.kind === "video") {
        const enabled = !t.enabled;
        t.enabled = enabled;
        setIsVideoOff(!enabled);
      }
    });
    // TODO: even if the webcam is turned off with the button it still sends black frames of video
  };

  const toggleMic = () =>
    videoElement.current.srcObject.getTracks().map((t) => {
      if (t.kind === "audio") {
        const enabled = !t.enabled;
        t.enabled = enabled;
        setIsMicOff(!enabled);
      }
    });



  return (
    <section>
      <Modal />
      <div className=" h-screen space-y-1  bg-black rounded-xl  grid grid-rows-3 grid-cols-4 ">
        <div className=" relative mt-2 w-full p-4 rounded-3xl col-span-3 row-span-3">
          <video autoPlay className="h-full scale-x-[-1]" ref={videoElement}></video>
          {/*<img
            className=" rounded-3xl h-full w-full mb-2"
            // src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
            alt="image"
          ></img>*/}
          <div className=" flex space-x-4 left-1/2 bottom-0 mb-8 -translate-x-1/2 absolute ">
            <CircleButton
              blur={true}
              onClick={() => {
                console.log('stop("audio")');
                toggleMic();
              }}
            >
              {isMicOff ? <FiMicOff color="white" /> : <FiMic color="white" />}
            </CircleButton>
            <CircleButton color="bg-red-700">
              <FiPhone color="white" />
            </CircleButton>
            <CircleButton
              blur={true}
              onClick={() => {
                console.log('stop("video")');
                toggleVideo();
              }}
            >
              {isVideoOff ? (
                <FiVideoOff color="white" />
              ) : (
                <FiVideo color="white" />
              )}
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
    </section >
  );
}

export default Oncall;

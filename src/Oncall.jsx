import CircleButton from "./component/CircleButton";
import { FiPhone, FiVideo, FiVideoOff, FiMic, FiMicOff } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { gun } from "./GunInstance";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import { Peer } from "peerjs";

function Oncall() {
  const { videoCallId } = useParams();
  const localVideoElement = useRef();
  const remoteVideoElement = useRef();
  const [call, setCall] = useState(null);
  const { username, gunUserId, isLoggedIn } = useStoreState(
    (state) => state.user
  );
  const {
    setId,
    setHostId,
    setHostUsername,
    addParticipant,
    otherParticipantsCount,
    isHost,
  } = useStoreActions((actions) => actions.videoCall);

  let navigate = useNavigate();

  const peerRef = useRef(new Peer(gunUserId));

  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isMicOff, setIsMicOff] = useState(true);

  // const [peer, setPeer] = useState(null);

  const [localStream, setLocalStream] = useState(
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  );
  const [remoteStreams, setRemoteStreams] = useState([]);

  useEffect(() => {
    // 1. Checking if user is signed in otherwise send to sign in page
    // 2. Create new Peer object using userId from store
    // 3. Get the video call id from the url bar and get the meeting data from
    // the gun database and store it in the local store
    setId(videoCallId);

    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    // TODO: check if the participant is already in the call and skip the database user addition code
    // NOTE: I think it doesn't need the above todo because it merges the same entry
    gun
      .get("videocalls")
      .get(videoCallId)
      .put({
        [username]: gunUserId,
      });

    console.log("[Peer]", peerRef.current);

    console.log("[Video Call useEffect] :", videoCallId);

    gun
      .get("videocalls")
      .get(videoCallId)
      .on((data, id) => {
        console.log("===GUN DATA===");
        console.log(data);
        console.log("===GUN DATA END===");
        setId(id);
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
      });
  }, []);

  useEffect(() => {
    if (!(otherParticipantsCount > 0)) return;
    try {
      peerRef.current.on("call", (call) => {
        if (confirm(`Accept call from ${call.peer}`)) {
          let stream;
          (async function () {
            stream = await localStream;
          })();
          call.answer(stream);
          // TODO: save this call object to close the call
          setCall(call);

          call.on("stream", (remoteStream) => {
            setRemoteStreams((s) => [...s, remoteStream]);
          });
        } else {
          call.close();
        }
      });
    } catch (error) {
      console.error("[Accepting call] :", error);
    }

    if (!isHost) {
      try {
        const call = peerRef.current.call(otherParticipants[0].id, localStream);
        call.on("stream", (remoteStream) => {
          console.log("streaming call");
          setRemoteStreams((s) => [...s, remoteStream]);
        });
        call.on("data", (remoteStream) => {
          setRemoteStreams((s) => [...s, remoteStream]);
        });
        call.on("error", (err) => {
          console.error(err);
        });
        call.on("close", () => {
          console.log("Call is closed");
          endCall();
        });
        setCall(call);
      } catch (error) {
        console.error("[peer calling] :", error);
      }
    }
  }, [otherParticipantsCount]);

  useEffect(() => {
    const remoteStream = remoteStreams?.[0];
    console.log("remoteStream :", remoteStream);
    if (remoteStream) {
      return;
    }
    try {
      (async function () {
        remoteVideoElement.current.srcObject = await remoteStream;
        // remoteVideoElement.current.play()
      })();
      // TODO: close the previous stream here and in setState
      // TODO: close this stream when it goes to different page and destroy the previous page
      return;
    } catch (err) {
      console.error("Failed to get remote stream", err);
    }
  }, [remoteStreams]);

  useEffect(() => {
    console.log("localStream :", localStream);
    if (localStream === null) {
      return;
    }
    try {
      (async function () {
        localVideoElement.current.srcObject = await localStream;
        localVideoElement.current.play();
        toggleMic(); // NOTE: remove this line later
        toggleVideo(); // NOTE: remove this line later
      })();
      // TODO: close the previous stream here and in setState
      // TODO: close this stream when it goes to different page and destroy the previous page
      return;
    } catch (err) {
      console.error("Failed to get stream", err);
    }
  }, [localStream]);

  const toggleVideo = () => {
    localVideoElement.current.srcObject.getTracks().map((t) => {
      if (t.kind === "video") {
        const enabled = !t.enabled;
        t.enabled = enabled;
        setIsVideoOff(!enabled);
      }
    });
    // TODO: even if the webcam is turned off with the button it still sends black frames of video
  };

  const toggleMic = () =>
    localVideoElement.current.srcObject.getTracks().map((t) => {
      if (t.kind === "audio") {
        const enabled = !t.enabled;
        t.enabled = enabled;
        setIsMicOff(!enabled);
      }
    });

  const endCall = () => {
    call?.close();
  };

  return (
    <section>
      <div className=" h-screen space-y-1  bg-black rounded-xl  grid grid-rows-3 grid-cols-4 ">
        <div className=" relative mt-2 w-full p-4 rounded-3xl col-span-3 row-span-3">
          <video
            autoPlay
            className="scale-x-[-1] object-cover"
            ref={remoteVideoElement}
          ></video>
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
            <CircleButton
              color="red-700"
              onClick={() => {
                console.log("ENDCALL");
                endCall();
              }}
            >
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
        <div className="w-full p-4 rounded-3xl overflow-hidden">
          <video
            autoPlay
            className="scale-x-[-1] object-cover"
            ref={localVideoElement}
          ></video>
          {/*<img
            className=" rounded-3xl"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            alt="image"
          />*/}
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

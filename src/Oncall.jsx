import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

import CircleButton from "./component/CircleButton";
import { FiPhone, FiVideo, FiMic } from "react-icons/fi";
import Modal from "./component/Modal";

const config = {
  mode: "rtc", codec: "vp8",
};

const appId = "e6090e6cf34f4d5aba95d6d17b45bf17"; //ENTER APP ID HERE
const token = "007eJxTYHhzabVJfKr3c7m++xZOpxj0O7J/ZM7aycBjxdQ72ebg6eMKDKlmBpYGqWbJacYmaSYppolJiZamKWYphuZJJqZJaYbmL5h1ktNDdZNbL8uwMjJAIIjPzpBakZhbkJPKwAAAqbYhFw==";

const Oncall = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  return (
    <div >
      <Modal />
      <VideoCall setInCall channelName='example' />
    </div>

  );
};

// the create methods in the wrapper return a hook
// the create method should be called outside the parent component
// this hook can be used the get the client/stream in any component
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = (props) => {
  const { setInCall, channelName } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  // using the hook to get access to the client object
  const client = useClient();
  // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    // function to initialise the SDK
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);

    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }

  }, [channelName, client, ready, tracks]);


  return (
    <>
      {start && tracks && <Videos users={users} tracks={tracks} />}
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
    </>
  );
};

const Videos = (props) => {
  const { users, tracks } = props;

  return (
    <div className="w-screen h-screen grid grid-cols-4 grid-rows-3 space-y-1 rounded-xl bg-gray-100">
      <div className="flex space-x-4 left-1/2 bottom-0 mb-8 -translate-x-1/2 absolute ">
      </div>

      {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
      <div className="col-span-3 row-span-3 mt-2 w-full rounded-3xl p-4">
        <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className="rounded-md h-full w-full mb-2" videoTrack={tracks[1]} />
      </div>
      {
        users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <div className="w-full p-4 rounded-3xl">
                <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className="rounded-md" videoTrack={user.videoTrack} key={user.uid} />
              </div>
            );

          } else return null;
        })
      }
    </div >
  );
};

export const Controls = (props) => {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="flex space-x-4 left-1/2 bottom-0 mb-8 -translate-x-1/2 absolute">
      <CircleButton color="bg-black" blur={true} onClick={() => mute("audio")}>
        <FiMic color="white" />
      </CircleButton>

      <CircleButton color="bg-black" blur={true} onClick={() => mute("video")}>
        <FiVideo color="white" />
      </CircleButton>

      <CircleButton color="bg-red-700" onClick={() => leaveChannel()}>
        <FiPhone color="white" />
      </CircleButton>
    </div >
  );
};

const ChannelForm = (props) => {
  const { setInCall, setChannelName } = props;

  return (
    <form className="join">
      {appId === '' && <p style={{ color: 'red' }}>Please enter your Agora App ID in App.tsx and refresh the page</p>}
      <input type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button onClick={(e) => {
        e.preventDefault();
        setInCall(true);
      }}>
        Join
      </button>
    </form>
  );
};

export default Oncall;

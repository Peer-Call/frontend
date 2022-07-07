import { useEffect, useState } from "react";

function Avatar(props) {

  const [AvatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setAvatarUrl("https://avatars.dicebear.com/api/identicon/" + props.username + ".svg");
  }, []);

  return (
    <>

      <img width="30" height="30" src={AvatarUrl}>
      </img>
    </>
  )
}

export default Avatar;

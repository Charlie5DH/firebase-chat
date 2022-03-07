import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../Firebase/Firebase";
import axios from "axios";

import { useAuth } from "../Contexs/AuthContext";

const Chats = () => {
  const didMountRef = useRef(false);
  const history = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log(user);

  async function handleLogout() {
    await auth.signOut();
    history("/");
  }

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history("/");
        return;
      }

      //get already exixting user
      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })
        .then(() => setLoading(false))
        .catch(() => {
          //if no user, create one
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);

          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY },
              })
              .then(() => setLoading(false))
              .catch((error) => console.log(error));
          });
        });
    }
  }, [user, history]);

  if (!user || loading) return "...Loading";

  return (
    <div className="chat-page">
      <div className="nav-bar">
        <div className="logo-tab">FireChat</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;

import React from "react";
import loginImgae from "../../images/chat-person.svg";
import firebase from "firebase/compat/app";

import { auth } from "../Firebase/Firebase";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>
          Welcome to the Firebase Chat
          <span className="chat-icon">
            <i className="bi bi-chat-quote-fill"></i>
          </span>
        </h2>
        <button
          className="login-button google"
          onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
        >
          <i className="bi bi-google"></i> Sign in with Google
        </button>
        <br />
        <br />

        <button
          className="login-button facebook"
          onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
        >
          <i className="bi bi-facebook"></i> Sign in with Facebook
        </button>
      </div>
      <img className="login-bottom-image" src={loginImgae} alt="" />
    </div>
  );
};

export default Login;

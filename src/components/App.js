import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Chats from "./Chats/Chats";

import { AuthProvider } from "./Contexs/AuthContext";
import Login from "./Login/Login";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

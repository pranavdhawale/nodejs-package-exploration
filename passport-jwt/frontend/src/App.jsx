import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import { Token } from "./globalContext";

export default function App() {
  const [token, setToken] = useState('')
  return(
    <>
    <Token.Provider value={[token, setToken]}>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </Token.Provider>
    </>
  )
}
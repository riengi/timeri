import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Time from "./Time.jsx"
import Birthdays from "./Birthdays"
import { useEffect } from "react";

function App() {

  return (
    <div className="container">
      <h1> Timeri</h1>

      <Time />
      <Birthdays />
      
    </div>
  );
}

export default App;

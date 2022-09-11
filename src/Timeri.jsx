import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
import Time from "./Time.jsx";
import Birthdays from "./Birthdays";
import SystemInfo from "./SystemInfo";
import Activities from './Activities.jsx'

function App() {
  return (
    <div className="flex-container">

        <Time />

        <SystemInfo />

        <Birthdays />

        <Activities />

    </div>
  );
}

export default App;

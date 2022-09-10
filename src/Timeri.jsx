import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import Time from "./Time.jsx";
import Birthdays from "./Birthdays";
import SystemInfo from "./SystemInfo";
import { useEffect } from "react";

function App() {
  return (
    <div className="flex-container">

        <Time />

        <SystemInfo />

        <Birthdays />

    </div>
  );
}

export default App;

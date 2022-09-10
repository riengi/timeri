import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Time from "./Time.jsx";
import Birthdays from "./Birthdays";
import { useEffect } from "react";

function App() {
  return (
    <div className="flx-container">

      <div className="flex-item-1">
        <Time />
        </div>

        <div className="flex-item-2">
      <Birthdays />
      </div>

    </div>
  );
}

export default App;

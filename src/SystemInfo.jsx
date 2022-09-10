import { useState, useEffect } from "react"
import { invoke } from "@tauri-apps/api/tauri";
import "./SystemInfo.css";

export default function SystemInfo() {

    const [local_ip, setLocalIp] = useState("");
    const [public_ip, setPublicIp] = useState("");

    useEffect(() => {
        async function fetchMyAPI() {
          const received = await invoke("ip");
          setLocalIp(received);
        }

        // Get local IP (from Rust backend)
        fetchMyAPI();

        // Get public IP (from ipify)
        const url = "https://api.ipify.org/?format=json"
        fetch(url)
        .then(response => response.json())
        .then(data => setPublicIp(data.ip));
    }
    );

    return (
        <div className="system-info">
            <div>🌐 IP: {local_ip}</div>
            <div>🏠 IP: {public_ip}</div>
        </div>
    )

}
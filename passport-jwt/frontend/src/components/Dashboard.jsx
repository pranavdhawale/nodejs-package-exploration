import React, { useContext, useState } from "react";
import { Token } from "../globalContext";

export default function Dashboard() {
    const token = useContext(Token)
    const [content, setContent] = useState(JSON.parse(localStorage.getItem('info')))
    return(
        <>
            <p>Dashboard</p>
            <div>
                <p>_id: {content.id}</p>
                <p>Username: {content.username}</p>
            </div>
        </>
    )
}
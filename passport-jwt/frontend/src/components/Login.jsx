import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Token } from "../globalContext";

export default function Login() {
    const [inputs, setInputs] = useState({})
    const [token, setToken] = useContext(Token)

    const navigate = useNavigate()

    const handleChanges = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs(values => ({ ...values, [name]:value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .post("http://localhost:8000/login", inputs)
        .then((res) => {
            setToken(res.data.token)
            localStorage.setItem('info', JSON.stringify(res.data.data))
            alert(res.data.message)
            navigate('/dashboard')
            console.log(token);
        })
        .catch((err) => {
            alert(err.response.data.message)
        })
    }
    console.log(inputs);
    return(
        <>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" onChange={handleChanges}/>
        </div>
        <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" onChange={handleChanges}/>
        </div>
            <input type="submit" value="Login" />
        </form>
        </>
    )
}
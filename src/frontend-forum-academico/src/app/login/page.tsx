'use client'

import { useAuth } from "@/context/AuthContext";
import "./login_style.css";
import { useState } from "react";

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(email);
        console.log(password);
        login(email, password);
    }

    return (
        <>
            <div id="logo-div">
                <img src="/logo.svg" alt="logo" />
            </div>
            <div id="login-div">
                <h1>Compartilhe Conhecimento</h1>
                <form id="login-info" onSubmit={submitLogin}>
                    <div className="form-div">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-div">
                        <label htmlFor="pass">Password</label>
                        <input type="password" id="pass" name="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <input className="botao" type="submit" value="Entrar" />
                </form>
            </div>

            <div id="cad-div">
                <button id="cadastrar" className="botao" type="button" onClick={() => console.log("Cadastrar")}>Cadastrar</button>
            </div>
        </>
    );
}

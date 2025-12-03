import React, { useState } from "react";
import { useLoginMutation } from "../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../style.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isLoading }] = useLoginMutation();

    const submit = async () => {
        if (!email || !password) {
            toast.error("Please fill in all fields", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            const res = await login({ email, password }).unwrap();
            localStorage.setItem("token", res?.token);
            dispatch(setToken(res?.token));
            toast.success("Login successful!", {
                position: "top-right",
                autoClose: 3000,
            });
            navigate('/products');
        } catch (err) {
            toast.error(err?.data?.message || "Login failed!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={submit} disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </button>
            <p>Don’t have an account? <Link to="/signup">Signup</Link></p>

            <ToastContainer />
        </div>
    );
}

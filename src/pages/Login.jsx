import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import AppButton from "../components/AppButton";
import { useAuth } from "../contexts/MockAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            console.log("Email and password are required");
            return;
        }
        // console.log("Email:", email);
        // console.log("Password:", password);
        login(email, password);
    }

    useEffect(
        function () {
            if (isAuthenticated) {
                navigate("/app", { replace: true });
                console.log("User is authenticated");
            }
        },
        [isAuthenticated, navigate]
    );

    return (
        <main className={styles.login}>
            <PageNav />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    {/* <button>Login</button> */}
                    <AppButton type="primary">Login</AppButton>
                </div>
            </form>
        </main>
    );
}

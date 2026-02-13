import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

export const LoginPage = () => {
    const { login } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };
    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />

                <button type="submit" style={styles.button}>
                    Entrar
                </button>
            </form>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "24px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "300px",
    },
    input: {
        padding: "10px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
    },
};
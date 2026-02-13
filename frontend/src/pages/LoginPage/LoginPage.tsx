import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import type { User } from '../../entities/Users';
import { getUsers } from '../../services';

export const LoginPage = () => {
    const { login } = useUser();

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedUser) {
            login(selectedUser);
        }
    };

    const handleSelectUser = (id: number) => {
        const user = users.find(user => user.id === id) || null;
        setSelectedUser(user);
    }

    useEffect(() => {
        getUsers().then((data: User[]) => setUsers(data)).catch(err => console.error(err))
    }, [])

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <select
                    value={selectedUser?.id || ""}
                    onChange={(e) => handleSelectUser(Number(e.target.value))}
                    style={styles.input}
                >
                    <option value="">Select user</option>
                    {users.map(user => (
                        <option key={user.email} value={user.id}>
                            {user.email}
                        </option>
                    ))}
                </select>
                <button type="submit" style={{ ...styles.button, backgroundColor: selectedUser ? "#007bff" : "#ccc", cursor: selectedUser ? "pointer" : "not-allowed" }} disabled={!selectedUser}>
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
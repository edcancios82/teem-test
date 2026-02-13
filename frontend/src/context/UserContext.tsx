import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
    id: number;
    email: string;
};

type UserContextType = {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (email: string, _password: string) => {
        setUser({
            id: 1,
            email,
        });
        localStorage.setItem("user", JSON.stringify({
            id: 1,
            email,
        }));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
};

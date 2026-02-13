import React from 'react';
interface CardProps {
    header: React.ReactNode;
    children: React.ReactNode;
}

export const Card = ({ children, header }: CardProps) => {
    return (
        <div style={styles.section}>
            <div style={{ cursor: "pointer", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {header}
            </div>
            {children}
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    section: {
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "600px",
        margin: 10
    },
};


import React, { useState } from 'react';
import type { SectionEntity } from '../../entities';
import { Card } from '../Card';

interface SectionAccordionProps {
    section: SectionEntity;
    currentUser: string;
    onSave: (id: string, data: any) => void;
    onUpdateOwners: (id: string, userId: string) => void;
}

export const SectionAccordion: React.FC<SectionAccordionProps> = ({ section, currentUser, onSave, onUpdateOwners }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(section.formData || { field1: "", field2: "" });

    const isOwner = section?.owners?.includes(currentUser);
    const isCompleted = formData.field1 && formData.field2

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(section.id, formData);
    };

    return (
        <Card header={
            <>
                <h2 style={{ margin: 10 }}>
                    {section.title} {isOwner ? "" : "(No access)"}
                </h2>
                <button style={{ ...styles.button, backgroundColor: !isOwner ? "#007bff" : "#cccccc" }} disabled={isOwner} onClick={() => onUpdateOwners(section.id, currentUser)}>
                    Get ownership
                </button>
            </>
        }>
            {isOwner && (
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        margin: 20,
                        padding: "10px",
                        cursor: "pointer",
                        backgroundColor: isCompleted ? "lightGreen" : "#f5f5f5"
                    }}
                >
                    <span style={{ fontWeight: 500 }}>
                        {!isCompleted ? "Section must be completed" : "Completed"}
                    </span>

                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        style={{
                            marginLeft: "auto",
                            transition: "transform 0.2s ease",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                    >
                        <path
                            d="M6 9l6 6 6-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>)
            }

            {isOwner && isOpen && (
                <div >
                    <div style={{ margin: 20, gap: 5, display: "flex", flexDirection: "column" }}>
                        <input
                            name="field1"
                            placeholder={section.formData.field1Description}
                            value={formData.field1}
                            onChange={handleChange}
                            style={{ display: "block", marginBottom: 5 }}
                        />
                        <input
                            name="field2"
                            placeholder={section.formData.field2Description}
                            value={formData.field2}
                            onChange={handleChange}
                            style={{ display: "block", marginBottom: 5 }}
                        />
                        <button style={{ ...styles.button, maxWidth: '75px', alignSelf: 'flex-end' }} onClick={handleSave}>Save</button>
                    </div>
                </div>
            )}
            {!isOwner && <p style={{ margin: 10 }}>You don't have access to edit this section.</p>}
        </Card>

    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "24px",
    },
    section: {
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
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
    logout: {
        marginTop: "20px",
    },
};

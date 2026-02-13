import React, { useState } from 'react';
import type { SectionEntity } from '../../entities';

interface SectionAccordionProps {
    section: SectionEntity;
    currentUser: string;
    onSave: (id: string, data: any) => void;
}

export const SectionAccordion: React.FC<SectionAccordionProps> = ({ section, currentUser, onSave }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(section.formData || { field1: "", field2: "" });

    const isOwner = section?.owners?.includes(currentUser);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(section.id, formData);
    };

    return (
        <div style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
            <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer", fontWeight: "bold" }}>
                {section.title} {isOwner ? "(You are owner)" : "(No access)"}
            </div>
            {isOpen && isOwner && (
                <div style={{ marginTop: 10 }}>
                    <input
                        name="field1"
                        placeholder="Field 1"
                        value={formData.field1}
                        onChange={handleChange}
                        style={{ display: "block", marginBottom: 5 }}
                    />
                    <input
                        name="field2"
                        placeholder="Field 2"
                        value={formData.field2}
                        onChange={handleChange}
                        style={{ display: "block", marginBottom: 5 }}
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
            {isOpen && !isOwner && <p>You don't have access to edit this section.</p>}
        </div>
    );
};

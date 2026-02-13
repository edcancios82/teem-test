import { useEffect, useState } from 'react';
import { SectionAccordion } from '../../components';
import { useUser } from '../../context/UserContext';
import type { SectionEntity } from '../../entities';
import { getSections, updateSection } from '../../services';

export const OnboardingPage = () => {
    const { logout, user } = useUser();
    const [sections, setSections] = useState<SectionEntity[]>([]);

    const handleSave = async (id: string, data: any) => {
        await updateSection(id, data);
        const updatedSections = sections.map(sec => (sec.id === id ? { ...sec, formData: data } : sec));
        setSections(updatedSections);
    };

    useEffect(() => {
        getSections().then(setSections);
    }, []);

    return (
        <div style={styles.container}>
            <button style={{ ...styles.button, ...styles.logout }} onClick={logout}>Logout</button>
            <div style={styles.list}>
                {sections.map(section => (
                    <SectionAccordion
                        key={section.id}
                        section={section}
                        currentUser={user?.email || ""}
                        onSave={handleSave}
                    />
                ))}
            </div>
        </div>
    )
}

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

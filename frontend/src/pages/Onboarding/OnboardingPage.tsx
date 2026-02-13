import { Card, OnboardingList } from '../../components';
import { useSections } from '../../context/SectionsContext';
import { useUser } from '../../context/UserContext';

export const OnboardingPage = () => {
    const { logout, user } = useUser();
    const { sections, handleUpdateOwners, handleSave, clear } = useSections();

    return (

        <div style={styles.container}>
            <div style={styles.buttonsContainer}>
                <button style={{ ...styles.button, ...styles.logout }} onClick={clear}>Clear Data</button>
                <button style={{ ...styles.button, ...styles.logout, backgroundColor: '#f00000' }} onClick={logout}>Change user</button>
            </div>
            <Card header={
                <h2 style={{ margin: "0 10px" }}>
                    Getting Started
                </h2>
            }>
                <p style={{ padding: "5px 10px" }}>
                    Complete the onboarding information below so we can get everything up and running for your practice and future Teem Member.
                </p>
            </Card>
            <OnboardingList
                sections={sections}
                currentUserId={user?.id || ""}
                onUpdateOwners={handleUpdateOwners}
                onSave={handleSave}
            />
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
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
    buttonsContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
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

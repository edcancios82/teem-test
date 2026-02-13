import { SectionAccordion } from '../../components';
import type { SectionEntity } from '../../entities';

interface OnboardingListProps {
    sections: SectionEntity[];
    currentUserId: string;
    onUpdateOwners: (sectionId: string, userId: string) => void;
    onSave: (sectionId: string, data: Partial<SectionEntity>) => void;
}

export const OnboardingList = ({ sections, currentUserId, onUpdateOwners, onSave, }: OnboardingListProps) => {
    return (
        <div style={styles.list}>
            {sections.map(section => (
                <SectionAccordion
                    key={section.id}
                    section={section}
                    currentUser={currentUserId}
                    onSave={onSave}
                    onUpdateOwners={onUpdateOwners}
                />
            ))}
        </div>

    )
}

const styles: Record<string, React.CSSProperties> = {
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "24px",
        minWidth: "600px",
    },
};

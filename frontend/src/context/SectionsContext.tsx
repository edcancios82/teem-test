import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { SectionEntity } from "../entities";
import { clearSectionOwners, getSections, updateSection, updateSectionOwners } from "../services";

type SectionsContextType = {
    sections: SectionEntity[];
    handleUpdateOwners: (sectionId: string, userId: string) => void;
    handleSave: (id: string, data: any) => Promise<void>;
    clear: () => Promise<void>;
};

const SectionsContext = createContext<SectionsContextType | undefined>(undefined);

export const SectionsProvider = ({ children }: { children: ReactNode }) => {
    const [sections, setSections] = useState<SectionEntity[]>([]);

    const requestSections = async () => {
        const data = await getSections();
        setSections(data || []);
    }

    const handleUpdateOwners = async (sectionId: string, userId: string) => {
        await updateSectionOwners(sectionId, userId);
        requestSections();
    };

    const handleSave = async (id: string, data: any) => {
        await updateSection(id, data);
        requestSections();
    };

    const clear = async () => {
        await clearSectionOwners()
        requestSections();
    }

    useEffect(() => {
        requestSections();
    }, []);

    return (
        <SectionsContext.Provider value={{ sections, handleUpdateOwners, handleSave, clear }}>
            {children}
        </SectionsContext.Provider>
    );
};


export const useSections = () => {
    const context = useContext(SectionsContext);
    if (!context) {
        throw new Error("useSections must be used within SectionsProvider");
    }
    return context;
};

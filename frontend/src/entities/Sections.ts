interface FormData {
    field1Description: string;
    field2Description: string;
    field1?: string;
    field2?: string;
}

export interface SectionEntity {
    id: string;
    title: string;
    owners: string[];
    description: string;
    formData: FormData;
    isComplete?: boolean;
}
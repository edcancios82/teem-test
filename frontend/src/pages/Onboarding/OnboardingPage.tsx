import { useEffect, useState } from 'react';
import { getSections } from '../../services';
import type { SectionEntity } from '../../entities';

export const OnboardingPage = () => {
    const [sections, setSections] = useState<SectionEntity[]>([]);

    useEffect(() => {
        getSections().then(setSections);
    }, []);

    return (
        <div>{sections.map(section => (
            <div key={section.id}>
                {section.title}
            </div>
        ))}
        </div>
    )
}

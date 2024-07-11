import { useState, useEffect } from 'react';
import { Roadmap } from "@/data/roadmap";

export const useFetchRoadmaps = () => {
    const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap[]>([]);
    const [votingRoadmap, setVotingRoadmap] = useState<Roadmap[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRoadmaps = async () => {
        const response = await fetch('/api/roadmap');
        const data: Roadmap[] = await response.json();
        setSelectedRoadmap(data
            .filter(roadmap => roadmap.selected)
            .sort((a, b) => b.upvotes - a.upvotes));
        setVotingRoadmap(data
            .filter(roadmap => !roadmap.selected)
            .sort((a, b) => b.upvotes - a.upvotes));
        setIsLoading(false);
    };

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    return { selectedRoadmap, votingRoadmap, isLoading, fetchRoadmaps };
};

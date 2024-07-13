import { useState, useEffect } from 'react';
import { Roadmap } from "@/app/(locale)/roadmap/data/roadmap";
import axios from "axios";

export const useFetchRoadmaps = () => {
    const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap[]>([]);
    const [votingRoadmap, setVotingRoadmap] = useState<Roadmap[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRoadmaps = async () => {
        const response = await axios.get('/api/roadmap');
        const data: Roadmap[] = await response.data;
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

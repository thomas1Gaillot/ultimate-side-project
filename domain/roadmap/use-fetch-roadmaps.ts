import { useState, useEffect } from 'react';
import axios from "axios";
import {Roadmap, roadmapSchema} from "@/domain/roadmap/Roadmap";
import {Article, articleSchema} from "@/domain/article/Article";

export const useFetchRoadmaps = () => {
    const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap[]>([]);
    const [votingRoadmap, setVotingRoadmap] = useState<Roadmap[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRoadmaps = async () => {
        const response = await axios.get('/api/roadmap');
        const validatedData: Roadmap[] = await response.data.map((roadmap:any) => roadmapSchema.parse(roadmap));

        setSelectedRoadmap(validatedData
            .filter(roadmap => roadmap.selected)
            .sort((a, b) => b.upvotes - a.upvotes));
        setVotingRoadmap(validatedData
            .filter(roadmap => !roadmap.selected)
            .sort((a, b) => b.upvotes - a.upvotes));
        setIsLoading(false);
    };

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    return { selectedRoadmap, votingRoadmap, isLoading, fetchRoadmaps };
};

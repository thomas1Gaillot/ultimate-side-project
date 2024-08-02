'use client'
import {useEffect, useState} from "react";
import {Roadmap, roadmapSchema} from "@/domain/roadmap/Roadmap";
import axios from "axios";

export default function useFetchLastSelectedRoadmap() {
    const [lastSelectedRoadmap, setLastSelectedRoadmap] = useState<Roadmap | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLastSelectedRoadmap = async () => {
            const response = await axios.get('/api/roadmap/last-selected');
            const validatedData: Roadmap = await roadmapSchema.parse(response.data);
            setLastSelectedRoadmap(validatedData);
            setIsLoading(false);
        };

        fetchLastSelectedRoadmap();
    }, []);
    return {isLoading, lastSelectedRoadmap}
}
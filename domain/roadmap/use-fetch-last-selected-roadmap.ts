'use client'
import {Roadmap, roadmapSchema} from "@/domain/roadmap/Roadmap";
import axios from "axios";

const fetchLastSelectedRoadmap = async (): Promise<Roadmap> => {
    const response = await axios.get("/api/roadmap/last-selected");
    const validatedData: Roadmap = roadmapSchema.parse(response.data);
    return validatedData;
};

export {fetchLastSelectedRoadmap};
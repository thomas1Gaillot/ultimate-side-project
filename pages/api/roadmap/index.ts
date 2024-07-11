import {NextApiRequest, NextApiResponse} from "next";
import {z} from "zod";
import {roadmapSchema} from "@/domain/roadmap/Roadmap";
import prisma from "@/prisma/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const roadmaps = await prisma.roadmap.findMany();
            res.status(200).json(roadmaps);
        } catch (error) {
            res.status(500).json({error: 'Error fetching roadmaps'});
        }
    } else if (req.method === 'POST') {
        try {
            // Valider les données de la requête
            const {title, type, description} = roadmapSchema.parse(req.body);

            // Créer une nouvelle ligne dans la table roadmap
            const newRoadmap = await prisma.roadmap.create({
                data: {
                    title: title,
                    description: description,
                    upvotes: 0,
                    badge: type,
                    selected: false
                },
            });
            res.status(201).json(newRoadmap);
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Retourner les erreurs de validation
                res.status(400).json({error: error.errors});
            } else {
                res.status(500).json({error: 'Error creating roadmap'});
            }
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
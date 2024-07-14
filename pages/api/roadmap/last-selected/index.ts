import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '@/prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const lastSelectedRoadmap = await prisma.roadmap.findFirst({
                where: {
                    selected: true
                },
            });
            if (lastSelectedRoadmap) {
                res.status(200).json(lastSelectedRoadmap);
            } else {
                res.status(404).json({error: 'No selected roadmap found'});
            }
        } catch (error) {
            res.status(500).json({error: 'Error fetching last selected roadmap'});
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

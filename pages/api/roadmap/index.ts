import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '@/prisma/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const roadmaps = await prisma.roadmap.findMany();
            res.status(200).json(roadmaps);
        } catch (error) {
            res.status(500).json({error: 'Error fetching roadmaps'});
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

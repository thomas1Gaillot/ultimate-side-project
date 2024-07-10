import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('REQUEST ----------------------------- ', req.method, req.url)
    if (req.method === 'GET') {
        try {
            const roadmaps = await prisma.roadmap.findMany();
            res.status(200).json(roadmaps);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching roadmaps' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

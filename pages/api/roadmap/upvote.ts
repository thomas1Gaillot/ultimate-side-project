import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.body;

    if (method === 'POST') {
        const roadmap = await prisma.roadmap.update({
            where: { id },
            data: { upvotes: { increment: 1 } }
        });
        res.status(200).json(roadmap);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'PUT') {
        const { name, md } = req.body;
        const { id } = req.query;

        if (!name || !md) {
            return res.status(400).json({ error: 'Title and MD content are required' });
        }

        try {
            const updatedArticle = await prisma.article.update({
                where: {
                    id: id as string,
                },
                data: {
                    name: name,
                    md: md,
                    href: name.toLowerCase().replace(/\s+/g, '-'), // Optionnel : générer un href basé sur le titre
                },
            });
            res.status(200).json(updatedArticle);
        } catch (error) {
            res.status(500).json({ error: 'Error updating article' });
        }
    } else{
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

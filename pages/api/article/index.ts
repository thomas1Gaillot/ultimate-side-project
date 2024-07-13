import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const articles = await prisma.article.findMany();
            res.status(200).json(articles);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching articles' });
        }
    } else if (req.method === 'POST') {
        const { name, md } = req.body;

        if (!name || !md) {
            return res.status(400).json({ error: 'Title and MD content are required' });
        }

        try {
            const newArticle = await prisma.article.create({
                data: {
                    name: name,
                    md: md,
                    href: name.toLowerCase().replace(/\s+/g, '-'), // Optionnel : générer un href basé sur le titre
                },
            });
            res.status(201).json(newArticle);
        } catch (error) {
            res.status(500).json({ error: 'Error creating article' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

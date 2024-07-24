import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    const form = new IncomingForm({
        uploadDir,
        keepExtensions: true,
        filename: (name, ext) => `${Date.now()}-${name}${ext}`,
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error parsing files', error: err });
        }

        const file = files.file[0]; // assuming single file upload
        const fileUrl = `/uploads/${path.basename(file.filepath)}`;

        return res.status(200).json({ url: fileUrl });
    });
};

export default handler;

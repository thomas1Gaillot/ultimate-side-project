import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import {supabase} from "@/lib/utils/supabaseClient";

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error parsing files', error: err });
        }

        const file = files.file[0]; // assuming single file upload
        const filePath = file.filepath;
        const fileName = `${Date.now()}-${file.originalFilename}`;

        // Lire le fichier depuis le système de fichiers local
        fs.readFile(filePath, async (readErr, data) => {
            if (readErr) {
                return res.status(500).json({ message: 'Error reading file', error: readErr });
            }

            // Uploader le fichier sur Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('article-images')
                .upload(fileName, data);

            if (uploadError) {
                return res.status(500).json({ message: 'Error uploading file', error: uploadError });
            }

            const supabaseData = supabase.storage
                .from('article-images')
                .getPublicUrl(fileName);

            return res.status(200).json({ url: supabaseData.data.publicUrl });
        });
    });
};

export default handler;

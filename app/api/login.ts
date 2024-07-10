import type { NextApiRequest, NextApiResponse } from 'next';

const login = (req: NextApiRequest, res: NextApiResponse) => {
    const scope = 'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing';
    const client_id = process.env.SPOTIFY_CLIENT_ID; // Votre Client ID
    const redirect_uri = 'http://localhost:3000/callback'; // Votre URI de redirection

    res.redirect(
        `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`
    );
};

export default login;

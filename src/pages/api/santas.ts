import type { NextApiRequest, NextApiResponse } from 'next';

import { PlayerByPlayerResult, SantaController } from '#controllers/santas';
import { PlayersFormState } from '#pages/Home';

export type SantasResponse = {
    message?: string;
    result?: PlayerByPlayerResult;
};

type RequestBody = {
    players: PlayersFormState;
    crossPresents: boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SantasResponse>
) {
    if (req.method !== 'POST') {
        res.status(400).json({
            message: 'Invalid request type, only POST is supported'
        });

        return;
    }

    const { players, crossPresents }: RequestBody = JSON.parse(req.body);
    const santaController = new SantaController(players, crossPresents);

    try {
        const result = await santaController.getPlayerByPlayer();
        res.status(200).json({ result });
    } catch (err) {
        res.status(500).json({
            message: `Unexpected error: ${err}`
        });
    }
}

import type { NextApiRequest, NextApiResponse } from 'next';

import { PlayerByPlayerResult, SantaController } from '#controllers/santas';
import { PlayersFormState } from '#pages/Home';

export interface ISantaResponse {
    message?: string;
    result?: PlayerByPlayerResult;
}

interface IRequestBody {
    players: PlayersFormState;
    crossPresents: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ISantaResponse>) {
    if (req.method !== 'POST') {
        res.status(400).json({
            message: 'Invalid request type, only POST is supported',
        });

        return;
    }

    const body: string = req.body as string;
    const { players, crossPresents }: IRequestBody = JSON.parse(body) as IRequestBody;
    const santaController = new SantaController(players, crossPresents);

    try {
        const result = await santaController.getPlayerByPlayer();
        res.status(200).json({ result });
    } catch (err: unknown) {
        res.status(500).json({
            message: `Unexpected error: ${err ? JSON.stringify(err) : 'Unknown error'}`,
        });
    }
}

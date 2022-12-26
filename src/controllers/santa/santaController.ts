import { RANDOM_ORG_URL } from '#constants/requests';
import { Player, PlayersFormState } from '#pages/Home';

interface RandomlySortedPlayer extends Player {
    sortCoefficient: number;
}

export type PlayerByPlayerResult = {
    [key in number]: number;
};

export interface ISantaController {
    getPlayerByPlayer: () => Promise<PlayerByPlayerResult>;
}

export class SantaController implements ISantaController {
    private _players: PlayersFormState;
    private _randomlySortedPlayers: RandomlySortedPlayer[];
    private readonly _crossPresents: boolean;

    constructor(players: PlayersFormState, crossPresents: boolean) {
        this._players = players;
        this._randomlySortedPlayers = [];
        this._crossPresents = crossPresents;
    }

    async getPlayerByPlayer(): Promise<PlayerByPlayerResult> {
        const players = this._sortPlayersByExcluded();
        await this._getRandomlySortedPlayers();

        return players.reduce<PlayerByPlayerResult>(
            (resultAcc: PlayerByPlayerResult, currentPlayer: Player, index: number) => {
                const santa: Player = index === 0 ? currentPlayer : this._sortPlayersByExcluded()[0];

                const playerId: number | undefined = this._randomlySortedPlayers.find(
                    (player: RandomlySortedPlayer) => !santa.exclude.includes(player.id) && santa.id !== player.id
                )?.id;

                if (playerId === undefined) {
                    this.throwError('Players does not fit each other!');
                    return { [santa.id]: 0 };
                }

                this._updateClassFields(santa, playerId);

                return {
                    ...resultAcc,
                    [santa.id]: playerId,
                };
            },
            {}
        );
    }

    private _updateClassFields(santa: Player, playerId: number | undefined): void {
        if (!this._crossPresents) {
            this._players = this._players.map((player: Player) =>
                player.id !== playerId
                    ? player
                    : {
                        ...player,
                        exclude: [...player.exclude, santa.id],
                    }
            );
        }

        this._players = this._players.reduce<PlayersFormState>((acc: PlayersFormState, player: Player) => {
            return player.id === santa.id ? acc : [...acc, player];
        }, []);

        this._randomlySortedPlayers = this._randomlySortedPlayers.filter(
            (player: RandomlySortedPlayer) => player.id !== playerId
        );
    }

    private async _getRandomlySortedPlayers(): Promise<void> {
        const randomNumbers = await this._getRandomOrgArray(this._players.length);

        this._randomlySortedPlayers = this._players
            .map(
                (player: Player, index: number): RandomlySortedPlayer => ({
                    ...player,
                    sortCoefficient: randomNumbers[index],
                })
            )
            .sort(
                (playerA: RandomlySortedPlayer, playerB: RandomlySortedPlayer) =>
                    playerB.sortCoefficient - playerA.sortCoefficient
            );
    }

    private _sortPlayersByExcluded(): PlayersFormState {
        return this._players.sort((a: Player, b: Player) => b.exclude.length - a.exclude.length);
    }

    private async _getRandomOrgArray(num: number): Promise<number[]> {
        const url = `${RANDOM_ORG_URL}&num=${num}`;

        return await fetch(url)
            .then(async (res: Response) => {
                const parsed = await res.text();
                return parsed
                    .split('\n')
                    .reduce<number[]>(
                        (acc: number[], number: string) => (number === '' ? acc : [...acc, Number(number)]),
                        []
                    );
            })
            .catch((error: string) => {
                this.throwError(error);
                return [];
            });
    }

    throwError(error: string): void {
        console.log('ERROR ' + error);
        throw new Error(error);
    }
}

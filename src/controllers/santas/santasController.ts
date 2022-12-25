import { randomOrgUrl } from '#constants/requests'
import { Player, PlayersFormState } from '#pages/Home'

interface RandomlySortedPlayer extends Player {
    sortCoefficient: number
}

export type PlayerByPlayerResult = {
    [key in number]: number
}

export interface SantaControllerClass {
    getPlayerByPlayer: () => Promise<PlayerByPlayerResult>
}

export class SantaController implements SantaControllerClass {
    private players: PlayersFormState
    private randomlySortedPlayers: RandomlySortedPlayer[]
    private readonly crossPresents: boolean

    constructor(players: PlayersFormState, crossPresents: boolean) {
        this.players = players
        this.randomlySortedPlayers = []
        this.crossPresents = crossPresents
    }

    async getPlayerByPlayer(): Promise<PlayerByPlayerResult> {
        const players = this.sortPlayersByExcluded()
        await this.getRandomlySortedPlayers()

        return players.reduce<PlayerByPlayerResult>(
            (resultAcc, currentPlayer, index) => {
                const santa =
                    index === 0
                        ? currentPlayer
                        : this.sortPlayersByExcluded()[0]

                const playerId: number | undefined =
                    this.randomlySortedPlayers.find(
                        (player) =>
                            !santa.exclude.includes(player.id) &&
                            santa.id !== player.id
                    )?.id

                if (playerId === undefined) {
                    this.throwError('Players does not fit each other!')
                    return { [santa.id]: 0 }
                }

                if (!this.crossPresents) {
                    this.players = this.players.map((player) =>
                        player.id !== playerId
                            ? player
                            : {
                                  ...player,
                                  exclude: [...player.exclude, santa.id]
                              }
                    )
                }

                this.players = this.players.reduce<PlayersFormState>(
                    (acc, player) => {
                        switch (player.id) {
                            case santa.id:
                                return acc
                            default:
                                return [...acc, player]
                        }
                    },
                    []
                )

                this.randomlySortedPlayers = this.randomlySortedPlayers.filter(
                    (player) => player.id !== playerId
                )

                return {
                    ...resultAcc,
                    [santa.id]: playerId
                }
            },
            {}
        )
    }

    private async getRandomlySortedPlayers(): Promise<void> {
        const randomNumbers = await this.getRandomOrgArray(this.players.length)

        this.randomlySortedPlayers = this.players
            .map(
                (player: Player, index: number): RandomlySortedPlayer => ({
                    ...player,
                    sortCoefficient: randomNumbers[index]
                })
            )
            .sort(
                (playerA, playerB) =>
                    playerB.sortCoefficient - playerA.sortCoefficient
            )
    }

    private sortPlayersByExcluded(): PlayersFormState {
        return this.players.sort((a, b) => b.exclude.length - a.exclude.length)
    }

    private async getRandomOrgArray(num: number): Promise<number[]> {
        const url = `${randomOrgUrl}&num=${num}`

        return await fetch(url)
            .then(async (res: Response) => {
                const parsed = await res.text()
                return parsed
                    .split('\n')
                    .reduce<number[]>(
                        (acc, number) =>
                            number === '' ? acc : [...acc, Number(number)],
                        []
                    )
            })
            .catch((error: string) => {
                this.throwError(error)
                return []
            })
    }

    throwError(error: string): void {
        console.log('ERROR ' + error)
        throw new Error(error)
    }
}

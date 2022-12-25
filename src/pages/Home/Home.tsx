import { useState } from 'react'

import { FormFields } from '#components/FormFields'
import { Button, Flex, Typography } from '#components/UILibrary'
import { PlayerByPlayerResult } from '#controllers/santas'

export interface Player {
    id: number
    name: string
    exclude: number[]
}

export type PlayersFormState = Player[]

const initialFormState: PlayersFormState = []

const Home = () => {
    const [formState, setFormState] =
        useState<PlayersFormState>(initialFormState)
    const [allowCrossPresents, setAllowCrossPresents] = useState<boolean>(true)
    const [results, setResults] = useState<PlayerByPlayerResult | null>(null)
    const [requestInProcess, setRequestInProcess] = useState<boolean>(false)

    const handleFormUpdate = (newState: PlayersFormState) => {
        setFormState(newState)
    }

    const onSubmit = () => {
        setRequestInProcess(true)

        const pseudoRandomizedPlayers = [...formState].sort(
            () => Math.random() - Math.random()
        )

        fetch('/api/santas', {
            method: 'POST',
            body: JSON.stringify({
                players: pseudoRandomizedPlayers,
                crossPresents: allowCrossPresents
            })
        })
            .then(async (res: Response) => {
                if (!res.ok) {
                    const parsed: { message: string } = await res.json() as { message: string }
                    throw new Error(parsed.message)
                }

                const parsed: { result: PlayerByPlayerResult } = await res.json() as { result: PlayerByPlayerResult }
                setResults(parsed.result)
                setRequestInProcess(false)
            })
            .catch((err) => {
                setRequestInProcess(false)
                alert(err)
            })
    }

    const toggleCrossPresentsState = () => {
        setAllowCrossPresents((prevState) => !prevState)
    }

    return (
        <>
            <Flex
                alignItems="flex-start"
                justifyContent="flex-start"
                direction="column"
                padding="lg"
            >
                <Typography weight="bold" size="lg" color="regular">
                    Add Players
                </Typography>

                <FormFields
                    onUpdate={handleFormUpdate}
                    currentPlayers={formState}
                />

                <Flex alignItems="center" justifyContent="flex-start">
                    <Button
                        marginRight="md"
                        onClick={onSubmit}
                        disabled={requestInProcess}
                    >
                        Generate
                    </Button>
                </Flex>
                <Flex
                    alignItems="center"
                    justifyContent="flex-start"
                    marginTop="md"
                    marginBottom="lg"
                >
                    <Typography weight="light">
                        Allow players to be Santa for their own Santa.
                    </Typography>
                    <input
                        type="checkbox"
                        onChange={toggleCrossPresentsState}
                        checked={allowCrossPresents}
                    />
                </Flex>

                {results && (
                    <Flex direction="column">
                        <Typography>Results:</Typography>
                        <ul>
                            {Object.entries(results).map(([key, value]) => (
                                <li key={key}>
                                    {
                                        formState.find(
                                            ({ id }) => id === Number(key)
                                        )?.name
                                    }
                                    :
                                    {` ${
                                        formState.find(({ id }) => id === value)
                                            ?.name ?? 'No match'}`}
                                </li>
                            ))}
                        </ul>
                    </Flex>
                )}
            </Flex>
        </>
    )
}

export default Home;

import { memo, useCallback, useRef, useState } from 'react'

import { Button, Flex, InputText, Typography } from '#components/UILibrary'
import { Select } from '#components/UILibrary/Select/Select'
import { PlayersFormState } from '#pages/Home'

import { SPlayerRow } from './styled'

interface FormFieldsProps {
    onUpdate: (newState: PlayersFormState) => void
    currentPlayers: PlayersFormState
}

export const FormFields = memo(
    ({ onUpdate, currentPlayers }: FormFieldsProps) => {
        const newPlayerRef = useRef<HTMLInputElement | null>(null)

        const addPlayer = useCallback(() => {
            const { value } = newPlayerRef.current!

            if (value && value.length > 0) {
                onUpdate([
                    ...currentPlayers,
                    {
                        name: value,
                        id: currentPlayers.length,
                        exclude: []
                    }
                ])
            }
        }, [currentPlayers, newPlayerRef])

        const deletePlayer = (id: number) => {
            if (currentPlayers.some(({ id: playerId }) => playerId === id)) {
                onUpdate(
                    currentPlayers.filter(({ id: playerId }) => playerId !== id)
                )
            }
        }

        const updateExcluded = useCallback(
            (id: number) => (exclude: number[]) => {
                const newState = currentPlayers.map((player) => {
                    return player.id === id
                        ? {
                              ...player,
                              exclude
                          }
                        : player
                })

                onUpdate(newState)
            },
            [currentPlayers, onUpdate]
        )

        return (
            <>
                <Flex alignItems="flex-start" direction="column">
                    {currentPlayers?.map(({ name, id, exclude }) => (
                        <SPlayerRow justifyContent="flex-start" key={id}>
                            <Typography>{name}</Typography>
                            <Button
                                onClick={() => deletePlayer(id)}
                                variant="regular"
                                marginLeft="sm"
                                marginRight="sm"
                            >
                                Delete player
                            </Button>
                            <Select
                                placeholder="Excluded players"
                                options={
                                    currentPlayers.filter(
                                        (player) => player.id !== id
                                    ) || []
                                }
                                chosenIds={exclude}
                                updateOptions={updateExcluded(id)}
                            />
                            <Flex direction="row">
                                <Typography marginLeft="sm">
                                    Excluded players:
                                </Typography>
                                {exclude.map((playerId: number) => (
                                    <Typography
                                        weight="light"
                                        marginLeft="xs"
                                        key={playerId}
                                    >
                                        {currentPlayers.map(({ id, name }) =>
                                            id === playerId ? name : null
                                        )}
                                    </Typography>
                                ))}
                            </Flex>
                        </SPlayerRow>
                    ))}

                    <Flex justifyContent="flex-start">
                        <InputText
                            ref={newPlayerRef}
                            placeholder="Add New Player"
                            marginRight="sm"
                        />
                        <Button
                            variant="regular"
                            marginBottom="md"
                            marginTop="md"
                            marginLeft="sm"
                            onClick={addPlayer}
                        >
                            Add player
                        </Button>
                    </Flex>
                </Flex>
            </>
        )
    }
)

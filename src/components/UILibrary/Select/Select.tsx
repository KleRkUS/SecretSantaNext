import Image from 'next/image'
import {
    ChangeEvent,
    ChangeEventHandler,
    MouseEvent,
    MouseEventHandler,
    useCallback,
    useState
} from 'react'

import { Flex, Typography } from '#components/UILibrary'

import {
    SSelectContainer,
    SSelectDropdown,
    SSelectList,
    SSelectListItem
} from './styled'

type Option = {
    id: number
    name: string
}

interface SelectProps {
    placeholder?: string
    options: Option[]
    chosenIds: number[]
    updateOptions: (options: number[]) => void
}

export const Select = ({
    placeholder,
    options,
    chosenIds,
    updateOptions
}: SelectProps) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)

    function handleClick(id: number): MouseEventHandler
    function handleClick(id: number, checkbox?: boolean): ChangeEventHandler
    function handleClick(
        id: number,
        checkbox?: boolean
    ): MouseEventHandler | ChangeEventHandler {
        if (checkbox) {
            return (e: ChangeEvent<HTMLInputElement>) => {
                updateOptions(
                    e.target?.checked
                        ? [...chosenIds, id]
                        : chosenIds.filter(
                              (optionId: number) => optionId !== id
                          )
                )
            }
        } else {
            return () => {
                updateOptions(
                    chosenIds.includes(id)
                        ? chosenIds.filter(
                              (optionId: number) => optionId !== id
                          )
                        : [...chosenIds, id]
                )
            }
        }
    }

    const toggleOpen = () => {
        setIsOpened((prevState) => !prevState)
    }

    return (
        <SSelectContainer direction="column">
            <SSelectDropdown
                direction="row"
                justifyContent="space-between"
                onClick={toggleOpen}
            >
                <Typography weight="light" marginRight="sm">
                    {placeholder ?? 'Choose options'}
                </Typography>
                <Image src="/arrowDown.svg" width="12" height="12" alt="V" />
            </SSelectDropdown>
            <SSelectList isOpened={isOpened}>
                {options.length === 0 && <li>Nothing</li>}
                {options.map(({ id, name }: Option) => (
                    <SSelectListItem onClick={handleClick(id)} key={id}>
                        <input
                            type="checkbox"
                            onChange={handleClick(id, true)}
                            checked={chosenIds.includes(id)}
                        />
                        <Typography>{name}</Typography>
                    </SSelectListItem>
                ))}
            </SSelectList>
        </SSelectContainer>
    )
}

import React from 'react'

import { SizesKeys, SpacingKeys } from '#constants/themes'
import { AppTheme } from '#services/theme'

import { SButton } from './styled'

interface StyleProps {
    variant?: 'regular' | 'contrast' | 'text'
    disabled?: boolean
    size?: SizesKeys
    marginTop?: SpacingKeys
    marginBottom?: SpacingKeys
    marginLeft?: SpacingKeys
    marginRight?: SpacingKeys
}

interface ButtonProps extends StyleProps {
    onClick: () => void
    children: React.ReactNode
}

export interface SButtonProps extends StyleProps {
    theme: AppTheme
}

export const Button = ({ children, onClick, ...otherProps }: ButtonProps) => {
    const handleClick = (e?: React.MouseEvent<HTMLElement>) => {
        e?.preventDefault()
        onClick()
    }

    return (
        <SButton {...otherProps} onClick={handleClick}>
            {children}
        </SButton>
    )
}

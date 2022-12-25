import React, { memo } from 'react'

import { SpacingKeys } from '#constants/themes'
import { AppTheme } from '#services/theme'

import { SFlex } from './styled'

interface StyleProps {
    justifyContent?:
        | 'space-between'
        | 'space-around'
        | 'flex-start'
        | 'center'
        | 'flex-end'
    alignItems?: 'flex-start' | 'center' | 'flex-end'
    direction?: 'row' | 'column'
    padding?: SpacingKeys
    marginTop?: SpacingKeys
    marginBottom?: SpacingKeys
    marginLeft?: SpacingKeys
    marginRight?: SpacingKeys
}

interface FlexProps extends StyleProps {
    children: React.ReactNode
    onClick?: React.MouseEventHandler
}

export interface SFlexProps extends StyleProps {
    theme: AppTheme
}

export const Flex = memo(({ children, ...otherProps }: FlexProps) => (
    <SFlex {...otherProps}>{children}</SFlex>
))

Flex.displayName = "Flex";

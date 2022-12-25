import styled from 'styled-components'

import { Flex } from '#components/UILibrary'
import { AppTheme } from '#services/theme'

export const SPlayerRow = styled(Flex)`
    margin-bottom: ${({ theme }: { theme: AppTheme }) => theme.spacings.md};
`

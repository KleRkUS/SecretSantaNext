import styled from 'styled-components'

import { Flex } from '#components/UILibrary/Flex'

export const SPageLayout = styled(Flex)`
    width: 100%;
`

export const SPageLayoutHeader = styled.div`
    background: ${({ theme }) => theme.headerBackground};
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
    margin-bottom: 100px;
`

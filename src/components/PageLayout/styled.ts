import styled from 'styled-components';

import { Typography } from '#components/UILibrary';
import { Flex, SFlexProps } from '#components/UILibrary/Flex';

export const SPageLayout = styled(Flex)`
    width: 100%;
    min-height: 100vh;
    background-color: ${({ theme }: SFlexProps) => theme.background};
`;

export const SPageLayoutHeader = styled(Flex)`
    background: ${({ theme }: SFlexProps) => theme.headerBackground};
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
    margin-bottom: 100px;
`;

export const SThemeSwitch = styled(Typography)`
    cursor: pointer;
`;

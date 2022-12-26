import styled from 'styled-components';

import { SFlexProps } from './Flex';

export const SFlex = styled.div<SFlexProps>`
    display: flex;
    justify-content: ${({ justifyContent }: SFlexProps) => justifyContent ?? 'center'};
    align-items: ${({ alignItems }: SFlexProps) => alignItems ?? 'center'};
    flex-direction: ${({ direction }: SFlexProps) => direction ?? 'row'};
    padding: ${({ theme, padding }: SFlexProps) => (padding ? theme.breakpoints[padding] : 0)};
    margin-top: ${({ theme, marginTop }: SFlexProps) => (marginTop ? theme.spacings[marginTop] : 0)};
    margin-left: ${({ theme, marginLeft }: SFlexProps) => (marginLeft ? theme.spacings[marginLeft] : 0)};
    margin-bottom: ${({ theme, marginBottom }: SFlexProps) => (marginBottom ? theme.spacings[marginBottom] : 0)};
    margin-right: ${({ theme, marginRight }: SFlexProps) => (marginRight ? theme.spacings[marginRight] : 0)};
`;

import styled from 'styled-components';

import { Flex } from '#components/UILibrary';
import { SpacingKeys } from '#constants/themes';
import { AppTheme, ThemedComponent } from '#services/theme';

interface SSelectDropdown {
    theme: AppTheme;
    marginTop?: SpacingKeys;
    marginLeft?: SpacingKeys;
    marginBottom?: SpacingKeys;
    marginRight?: SpacingKeys;
}

interface SSelectListProps {
    isOpened: boolean;
}

export const SSelectContainer = styled(Flex)`
    font-size: ${({ theme }: SSelectDropdown) => theme.sizes.md};
    border-radius: ${({ theme }: SSelectDropdown) => theme.spacings.sm};
    margin-top: ${({ theme, marginTop }: SSelectDropdown) => (marginTop ? theme.spacings[marginTop] : 0)};
    margin-left: ${({ theme, marginLeft }: SSelectDropdown) => (marginLeft ? theme.spacings[marginLeft] : 0)};
    margin-bottom: ${({ theme, marginBottom }: SSelectDropdown) => (marginBottom ? theme.spacings[marginBottom] : 0)};
    margin-right: ${({ theme, marginRight }: SSelectDropdown) => (marginRight ? theme.spacings[marginRight] : 0)};
    position: relative;
`;

export const SSelectDropdown = styled(Flex)`
    width: 100%;
    padding: ${({ theme }: SSelectDropdown) => theme.spacings.xs + ' ' + theme.spacings.sm};
    border: 1px solid ${({ theme }: SSelectDropdown) => theme.headerBackground};
    box-sizing: border-box;
    cursor: pointer;
`;

export const SSelectList = styled.ul<SSelectListProps>`
    width: 100%;
    box-sizing: border-box;
    list-style-type: none;
    border: 1px solid ${({ theme }: SSelectDropdown) => theme.headerBackground};
    border-top: none;
    margin: 0;
    position: absolute;
    top: 100%;
    display: ${({ isOpened }: SSelectListProps) => (isOpened ? 'auto' : 'none')};
    z-index: 2;
    padding: 0;
`;

export const SSelectListItem = styled.li<ThemedComponent>`
    width: 100%;
    margin-left: 0;
    cursor: pointer;
    background: ${({ theme }: ThemedComponent) => theme.background};

    input {
        cursor: pointer;
    }
`;

import styled from 'styled-components';

import { SInputTextProps } from '#components/UILibrary/InputText/InputText';

export const SInputText = styled.input.attrs(() => ({
    type: 'text'
}))<SInputTextProps>`
    padding: ${({ theme }) => theme.spacings.xs + ' ' + theme.spacings.sm};
    font-size: ${({ theme }) => theme.sizes.md};
    margin-top: ${({ theme, marginTop }: SInputTextProps) =>
        theme.spacings[marginTop!] || 0};
    margin-right: ${({ theme, marginRight }: SInputTextProps) =>
        theme.spacings[marginRight!] || 0};
    margin-bottom: ${({ theme, marginBottom }: SInputTextProps) =>
        theme.spacings[marginBottom!] || 0};
    margin-left: ${({ theme, marginLeft }: SInputTextProps) =>
        theme.spacings[marginLeft!] || 0};
`;

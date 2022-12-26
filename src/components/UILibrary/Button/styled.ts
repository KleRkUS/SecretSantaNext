import styled from 'styled-components';

import type { SButtonProps } from './Button';

const getButtonStyleString = (background: string, text: string, border: string, borderWidth?: number): string =>
    `
        background-color: ${background};
        color: ${text};
        border-color: ${border};
        border-width: ${borderWidth ?? '1'};
        border-style: solid;
    `;

const getButtonHoverStyleString = (background: string, text: string): string =>
    `
        background-color: ${background};
        color: ${text};
    `;

export const SButton = styled.button<SButtonProps>`
    ${({ theme, variant }: SButtonProps) => {
        switch (variant) {
            case 'regular':
                return getButtonStyleString(theme.background, theme.headerBackground, theme.headerBackground);
            case 'contrast':
                return getButtonStyleString(theme.colors.contrast, theme.text, theme.headerBackground);
            case 'text':
                return getButtonStyleString('transparent', theme.text, 'transparent', 0);
            default:
                return getButtonStyleString(theme.background, theme.headerBackground, theme.headerBackground);
        }
    }}
    padding: ${({ theme, variant }: SButtonProps) =>
        variant === 'text' ? 0 : theme.spacings.xs + ' ' + theme.spacings.sm};
    font-size: ${({ theme }: SButtonProps) => theme.sizes.md};
    border-radius: ${({ theme }: SButtonProps) => theme.spacings.sm};
    margin-top: ${({ theme, marginTop }: SButtonProps) => (marginTop ? theme.spacings[marginTop] : 0)};
    margin-left: ${({ theme, marginLeft }: SButtonProps) => (marginLeft ? theme.spacings[marginLeft] : 0)};
    margin-bottom: ${({ theme, marginBottom }: SButtonProps) => (marginBottom ? theme.spacings[marginBottom] : 0)};
    margin-right: ${({ theme, marginRight }: SButtonProps) => (marginRight ? theme.spacings[marginRight] : 0)};
    transition: all 0.3s ease-in-out;
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
    box-shadow: none;
    opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
    
    &:hover {
        ${({ theme, variant, disabled }: SButtonProps) => {
            if (disabled) {
                return '';
            }

            switch (variant) {
                case 'regular':
                    return getButtonHoverStyleString(theme.headerBackground, theme.background);
                case 'contrast':
                    return getButtonHoverStyleString(theme.background, theme.headerBackground);
                default:
                    return getButtonHoverStyleString(theme.headerBackground, theme.background);
            }
        }}
`;

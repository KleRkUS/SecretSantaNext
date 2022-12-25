import styled from 'styled-components'

import { STypographyProps } from './Typography'

export const STypography = styled.span<STypographyProps>`
    color: ${({ theme, color }: STypographyProps) =>
        theme.colors[color!] ?? theme.colors.regular};
    font-size: ${({ theme, size }: STypographyProps) =>
        theme.sizes[size!] ?? theme.sizes.md};
    font-weight: ${({ weight }: STypographyProps) => weight ?? '600'};
    margin-top: ${({ theme, marginTop }: STypographyProps) =>
        theme.spacings[marginTop!] || 0};
    margin-left: ${({ theme, marginLeft }: STypographyProps) =>
        theme.spacings[marginLeft!] || 0};
    margin-right: ${({ theme, marginRight }: STypographyProps) =>
        theme.spacings[marginRight!] || 0};
    margin-bottom: ${({ theme, marginBottom }: STypographyProps) =>
        theme.spacings[marginBottom!] || 0};
`

import styled from 'styled-components'

import { STypographyProps } from './Typography'

export const STypography = styled.span<STypographyProps>`
    color: ${({ theme, color }: STypographyProps) =>
        color ? theme.colors[color] : theme.colors.regular};
    font-size: ${({ theme, size }: STypographyProps) =>
        size ? theme.sizes[size] : theme.sizes.md};
    font-weight: ${({ weight }: STypographyProps) => weight ?? '600'};
  margin-top: ${({ theme, marginTop }: STypographyProps) =>
          marginTop ? theme.spacings[marginTop] : 0};
  margin-left: ${({ theme, marginLeft }: STypographyProps) =>
          marginLeft ? theme.spacings[marginLeft] : 0};
  margin-bottom: ${({ theme, marginBottom }: STypographyProps) =>
          marginBottom ? theme.spacings[marginBottom] : 0};
  margin-right: ${({ theme, marginRight }: STypographyProps) =>
          marginRight ? theme.spacings[marginRight] : 0};
`

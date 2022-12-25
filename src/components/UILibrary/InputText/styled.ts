import styled from 'styled-components'

import { SInputTextProps } from './InputText'

export const SInputText = styled.input.attrs(() => ({
    type: 'text'
}))<SInputTextProps>`
    // eslint-disable @typescript-eslint/restrict-plus-operands
    padding: ${({ theme }: SInputTextProps) => theme.spacings.xs + ' ' + theme.spacings.sm};
    font-size: ${({ theme }: SInputTextProps) => theme.sizes.md};
  margin-top: ${({ theme, marginTop }: SInputTextProps) =>
          marginTop ? theme.spacings[marginTop] : 0};
  margin-left: ${({ theme, marginLeft }: SInputTextProps) =>
          marginLeft ? theme.spacings[marginLeft] : 0};
  margin-bottom: ${({ theme, marginBottom }: SInputTextProps) =>
          marginBottom ? theme.spacings[marginBottom] : 0};
  margin-right: ${({ theme, marginRight }: SInputTextProps) =>
          marginRight ? theme.spacings[marginRight] : 0};
`

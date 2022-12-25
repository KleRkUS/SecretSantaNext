import React, { memo } from 'react';

import { ColorsKeys, SizesKeys, SpacingKeys } from '#constants/themes';
import { AppTheme } from '#services/theme';

import { STypography } from './styled';

interface StyleProps {
    color?: ColorsKeys;
    size?: SizesKeys;
    weight?: string;
    marginTop?: SpacingKeys;
    marginRight?: SpacingKeys;
    marginBottom?: SpacingKeys;
    marginLeft?: SpacingKeys;
}

interface TypographyProps extends StyleProps {
    children: React.ReactNode | string;
}

export interface STypographyProps extends StyleProps {
    theme: AppTheme;
}

export const Typography = memo(
    ({ children, ...orherProps }: TypographyProps) => (
        <STypography {...orherProps}>{children}</STypography>
    )
);

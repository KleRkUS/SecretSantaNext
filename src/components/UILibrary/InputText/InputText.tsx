import { ChangeEvent, Ref, forwardRef, useCallback } from 'react';

import { SpacingKeys } from '#constants/themes';
import { useExecutionDelay } from '#hooks/useExecutionDelay';
import { AppTheme } from '#services/theme';

import { SInputText } from './styled';

interface StyleProps {
    marginTop?: SpacingKeys;
    marginRight?: SpacingKeys;
    marginBottom?: SpacingKeys;
    marginLeft?: SpacingKeys;
}

interface InputTextProps extends StyleProps {
    placeholder?: string;
    onChange?: (value: string) => void;
}

export interface SInputTextProps extends StyleProps {
    theme: AppTheme;
}

export const InputText = forwardRef(({ onChange, ...otherProps }: InputTextProps, ref: Ref<HTMLInputElement>) => {
    const delayedInput = useExecutionDelay({ func: onChange, delay: 300 });

    const handleInput = useCallback(
        (e: ChangeEvent<HTMLInputElement> | undefined) => () => {
            e?.preventDefault();
            if (onChange && delayedInput) {
                delayedInput(e?.target.value ?? '');
            }
        },
        [onChange, delayedInput]
    );

    return <SInputText ref={ref} onChange={handleInput} {...otherProps} />;
});

InputText.displayName = 'InputText';

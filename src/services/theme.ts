import { ColorsKeys, SizesKeys, SpacingKeys, ThemesKeys } from '#constants/themes';

export interface AppTheme {
    background: string;
    text: string;
    headerBackground: string;
    headerText: string;
    colors: { [key in ColorsKeys]: string };
    sizes: { [key in SizesKeys]: string };
    spacings: { [key in SpacingKeys]: string };
    breakpoints: { [key in SpacingKeys]: string };
}

export interface ThemedComponent {
    theme: AppTheme;
}

const common = {
    sizes: {
        md: '14px',
        lg: '18px',
    },
    spacings: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
    },
    breakpoints: {
        xs: '12px',
        sm: '16px',
        md: '32px',
        lg: '48px',
    },
};

const light = {
    background: '#fefefe',
    text: '#000',
    headerBackground: '#414141',
    headerText: '#eee',
    colors: {
        contrast: '#eee',
        regular: '#000',
    },
    ...common,
};

const dark = {
    background: '#414141',
    text: '#eee',
    headerBackground: '#eee',
    headerText: '#000',
    colors: {
        contrast: '#000',
        regular: '#eee',
    },
    ...common,
};

export type Themes = {
    [key in ThemesKeys]: AppTheme;
};

export const themes: Themes = {
    light,
    dark,
};

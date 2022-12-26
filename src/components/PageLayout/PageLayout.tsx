import Link from 'next/link';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { Typography } from '#components/UILibrary';
import { ROUTES, SantaRoutes } from '#constants/routes';
import { ThemesKeys } from '#constants/themes';
import { useAppDispatch } from '#hooks/useAppDispatch';
import { useAppSelector } from '#hooks/useAppSelector';
import { getCurrentTheme, switchTheme } from '#services/store';
import { themes } from '#services/theme';

import { SPageLayout, SPageLayoutHeader, SThemeSwitch } from './styled';

interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    const theme: ThemesKeys = useAppSelector(getCurrentTheme);
    const dispatchTheme = useAppDispatch();

    const handleChangeTheme = () => {
        dispatchTheme(switchTheme());
    };

    return (
        <ThemeProvider theme={themes[theme]}>
            <SPageLayout direction="column" alignItems="flex-start" justifyContent="flex-start">
                <SPageLayoutHeader justifyContent="space-between">
                    <div>
                        {ROUTES.map((route: SantaRoutes) => (
                            <Link href={route.path} key={route.title}>
                                <Typography color="contrast" weight="bold">
                                    {route.title}
                                </Typography>
                            </Link>
                        ))}
                    </div>

                    <SThemeSwitch color="contrast" weight="light" onClick={handleChangeTheme}>
                        {theme}
                    </SThemeSwitch>
                </SPageLayoutHeader>

                {children}
            </SPageLayout>
        </ThemeProvider>
    );
};

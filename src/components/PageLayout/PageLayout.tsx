import Link from 'next/link';
import { ReactNode } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { Typography } from '#components/UILibrary';
import { SantaRoutes, routes } from '#constants/routes';
import { ThemesKeys } from '#constants/themes';
import { RootState, getCurrentTheme } from '#services/store';
import { themes } from '#services/theme';

import { SPageLayout, SPageLayoutHeader } from './styled';

interface PageLayoutProps {
    children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const theme: ThemesKeys = useAppSelector(getCurrentTheme);

    return (
        <ThemeProvider theme={themes[theme]}>
            <SPageLayout
                direction="column"
                alignItems="flex-start"
                justifyContent="flex-start"
            >
                <SPageLayoutHeader>
                    {routes.map((route: SantaRoutes) => (
                        <Link href={route.path} key={route.title}>
                            <Typography color="contrast" weight="bold">
                                {route.title}
                            </Typography>
                        </Link>
                    ))}
                </SPageLayoutHeader>

                {children}
            </SPageLayout>
        </ThemeProvider>
    );
};

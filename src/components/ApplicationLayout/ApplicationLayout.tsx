import { ReactNode, StrictMode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import { PageLayout } from '#components/PageLayout'
import { store } from '#services/store'

interface ApplicationLayoutProps {
    children: ReactNode
}

export const ApplicationLayout = ({ children }: ApplicationLayoutProps) => (
    <StrictMode>
        <ReduxProvider store={store}>
            <PageLayout>{children}</PageLayout>
        </ReduxProvider>
    </StrictMode>
)

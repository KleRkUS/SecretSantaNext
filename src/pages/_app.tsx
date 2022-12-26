import type { AppProps } from 'next/app';

import { ApplicationLayout } from '#components/ApplicationLayout';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApplicationLayout>
            <Component {...pageProps} />
        </ApplicationLayout>
    );
}

"use client"; 

import { useEffect, useState } from 'react';
import i18n from '@/src/i18n';
import { I18nextProvider } from 'react-i18next';

export default function I18nProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        i18n.on('initialized', () => setReady(true));
        if (i18n.isInitialized) setReady(true);
    }, []);

    if (!ready) return null;

    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    );
}
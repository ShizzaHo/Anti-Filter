"use client"

import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'АНТИ ФИЛЬТР',
    description:
        'Ваше мнение и эмоции, не должны быть ограничены политикой и бесчеловечными корпорациями',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js'); 
            });
        }
    });

    return (
        <html lang='ru'>
            <head>
                <title>АНТИ ФИЛЬТР</title>
                <link rel='manifest' href='/manifest.json' />

                <meta name='theme-color' content='#e70053' />
                <meta name='msapplication-navbutton-color' content='#e70053' />
                <meta
                    name='apple-mobile-web-app-status-bar-style'
                    content='#e70053'
                />

                <link
                    rel='apple-touch-icon'
                    sizes='57x57'
                    href='/apple-icon-57x57.png'
                />
                <link
                    rel='apple-touch-icon'
                    sizes='60x60'
                    href='/apple-icon-60x60.png'
                />
                <link
                    rel='apple-touch-icon'
                    sizes='72x72'
                    href='/apple-icon-72x72.png'
                />
                <link
                    rel='apple-touch-icon'
                    sizes='76x76'
                    href='/apple-icon-76x76.png'
                />
                <link
                    rel='apple-touch-icon'
                    sizes='114x114'
                    href='/apple-icon-114x114.png'
                />
                <link
                    rel='apple-touch-icon'
                    sizes='120x120'
                    href='/apple-icon-120x120.png'
                />
                <link
                    rel='apple-touch-icon'
                    sizes='144x144'
                    href='/apple-icon-144x144.png'
                />
                <link
                    rel='apple-touch-icon'
                    sizes='152x152'
                    href='/apple-icon-152x152.png'
                />
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/apple-icon-180x180.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='192x192'
                    href='/android-icon-192x192.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='96x96'
                    href='/favicon-96x96.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/favicon-16x16.png'
                />
                <meta name='msapplication-TileColor' content='#ffffff' />
                <meta
                    name='msapplication-TileImage'
                    content='/ms-icon-144x144.png'
                />
                <meta name='theme-color' content='#ffffff' />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}

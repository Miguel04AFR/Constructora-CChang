"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import type { Casa } from '@/src/Services/Casa';
import { useTranslation } from 'react-i18next';

interface GaleriaHeaderProps {
    propiedad: Casa;
}

const Encabezado: React.FC<{ propiedad: Casa }> = ({ propiedad }) => {
    const { t } = useTranslation();


    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
                <Link 
                    href="/servicios/catalogo"
                    className="flex items-center text-[#003153] hover:text-blue-800 transition-colors font-medium mt-4"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('propertyDetail.backToCatalog')}
                </Link>
            </div>

            <div className="text-center">
                <h1 className="text-3xl font-bold text-[#003153] mb-2">
                    {propiedad.nombre}
                </h1>
                <div className="flex items-center justify-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-lg">{propiedad.ubicacion}</span>
                </div>
            </div>
        </div>
    );
};

const Galeria: React.FC<{ propiedad: Casa }> = ({ propiedad }) => {
    const imagenesPorCasa: { [key: string]: string[] } = {
        '1': [
            '/Casa 1/1761508791-z3qyIA-x.jpeg',
            '/Casa 1/1761508791-OgjSAzFh.webp', 
            '/Casa 1/1761508791-Ma7RHO2p.webp',
            '/Casa 1/1761508791-j-yVp35Y.webp',
            '/Casa 1/1761508791-GqE9exmP.webp',
            '/Casa 1/1761508791-gAYIV_Y5.webp',
        ],
        '3': [
            '/Casa 3/1757528002-1nuokhxu.webp',
            '/Casa 3/1757528053-Ktx-nYJE.jpeg',
            '/Casa 3/1757528002-1nuokhxu.webp',
            '/Casa 3/1757527999-iVD-ebeT.webp',
            '/Casa 3/1757527935-g8uUmTJi.jpeg',
            '/Casa 3/1757527932-XtkO1al8.jpeg',
        ],
        '4': [
            '/Casa 4/1757361273-nLT7wQnz.webp',
            '/Casa 4/1757361257-BK1VYemR.webp',
            '/Casa 4/1757361243-X3xfz4Ae.webp',
            '/Casa 4/1757361243-J4b6zrBE.webp',
            '/Casa 4/1757361243-h4OKWl1N.webp',
            '/Casa 4/1757361242-a3aROEG5.webp',
        ]
    };

    const numeroCasa = typeof propiedad.id === 'string' ? propiedad.id.slice(-1) : (propiedad.id != null ? String(propiedad.id).slice(-1) : '');
    const fallbackImagenes: string[] = propiedad.imagenUrl
        ? (Array.isArray(propiedad.imagenUrl) ? propiedad.imagenUrl : [propiedad.imagenUrl])
        : [];
    const imagenes = imagenesPorCasa[numeroCasa] || fallbackImagenes;

    const [imagenPrincipal, setImagenPrincipal] = useState<string>(imagenes[0] || '');

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
                <img
                    src={imagenPrincipal}
                    alt={propiedad.nombre}
                    className="w-full h-96 object-cover rounded-lg"
                />
            </div>

            <div className="grid grid-cols-4 gap-2">
                {imagenes.map((imagen, index) => (
                    <button
                        key={index}
                        onClick={() => setImagenPrincipal(imagen)}
                        className={`border-2 rounded-lg overflow-hidden transition-all ${
                            imagen === imagenPrincipal 
                            ? 'border-[#003153] scale-105' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                    >
                        <img
                            src={imagen}
                            alt={`${propiedad.nombre} - Vista ${index + 1}`}
                            className="w-full h-20 object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export const GaleriaHeader: React.FC<GaleriaHeaderProps> = ({ propiedad }) => {
    return (
        <>
            <Encabezado propiedad={propiedad} />
            <Galeria propiedad={propiedad} />
        </>
    );
};

export { Encabezado, Galeria };
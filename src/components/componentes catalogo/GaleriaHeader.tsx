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
    // Obtener imágenes de la propiedad (array imagenUrl)
    const obtenerImagenesPropiedad = (): string[] => {
        if (!propiedad.imagenUrl) return [];
        
        if (Array.isArray(propiedad.imagenUrl)) {
            // Filtrar URLs válidas y agregar base URL
            return propiedad.imagenUrl
                .filter(img => img && img.trim() !== '')
                .map(img => `${process.env.NEXT_PUBLIC_API_URL}${img}`);
        }
        
        // Si es string, convertirlo a array
        return [`${process.env.NEXT_PUBLIC_API_URL}${propiedad.imagenUrl}`];
    };

    const imagenes = obtenerImagenesPropiedad();
    const [imagenPrincipal, setImagenPrincipal] = useState<string>(
        imagenes.length > 0 ? imagenes[0] : '/placeholder-image.jpg'
    );

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
                <img
                    src={imagenPrincipal}
                    alt={propiedad.nombre}
                    className="w-full h-96 object-cover rounded-lg"
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                        e.currentTarget.alt = 'Imagen no disponible';
                    }}
                />
            </div>

            {/* Mostrar miniaturas solo si hay más de una imagen */}
            {imagenes.length > 1 && (
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
                                onError={(e) => {
                                    e.currentTarget.src = '/placeholder-image.jpg';
                                    e.currentTarget.alt = 'Imagen no disponible';
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Mensaje si no hay imágenes */}
            {imagenes.length === 0 && (
                <div className="text-center py-8">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">No hay imágenes disponibles para esta propiedad</p>
                </div>
            )}
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
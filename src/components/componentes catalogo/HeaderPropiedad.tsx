import React from 'react';
import Link from 'next/link';
import type { Casa } from '@/src/components/index';

interface EncabezadoPropiedadProps {
    propiedad: Casa;
}

export const EncabezadoPropiedad: React.FC<EncabezadoPropiedadProps> = ({ propiedad }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Navegación */}
            <div className="flex justify-between items-center mb-4">
                <Link 
                    href="/catalogo"
                    className="flex items-center text-[#003153] hover:text-blue-800 transition-colors font-medium"
                >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                    Volver al Catálogo
                </Link>
            </div>

            {/* Título y ubicación */}
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
"use client";

import React from 'react'
import type { Servicio } from '@/src/Services/Servicio';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const Servicios = () => {
    const { t } = useTranslation();

    const servicios: Servicio[] = [
        {
            id: 1,
            titulo: t('services.list.residential.title'),
            descripcion: t('services.list.residential.description'),
            iconoUrl: '/window.png',
            ruta: '/servicios/catalogo', 
            textoBoton: t('services.viewHomes')
        },
        {
            id: 2,
            titulo: t('services.list.renovations.title'),
            descripcion: t('services.list.renovations.description'),
            iconoUrl: '/glove.svg',
            ruta: '/servicios/renovaciones', 
            textoBoton: t('services.viewRenovations')
        },
        {
            id: 3,
            titulo: t('services.list.consulting.title'),
            descripcion: t('services.list.consulting.description'),
            iconoUrl: '/file.svg',
            ruta: '/servicios/consultoria', 
            textoBoton: t('services.contactConsulting')
        },
        {
            id: 4,
            titulo: t('services.list.supervision.title'),
            descripcion: t('services.list.supervision.description'),
            iconoUrl: '/icono-consultoria.png',
            ruta: '/servicios/catalogo', 
            textoBoton: t('services.viewHomes')
        }
    ];

    return (
        <div id="servicios" className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-[#003153] mb-4">
                    {t('services.title')}
                </h1>
                
                <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                    {t('services.subtitle')}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {servicios.map((servicio) => (
                        <div 
                            key={servicio.id}
                            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-start gap-6">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <img 
                                            src={servicio.iconoUrl} 
                                            alt={servicio.titulo}
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-[#003153] mb-3">
                                        {servicio.titulo}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {servicio.descripcion}
                                    </p>
                                    <div className="flex items-center gap-6 mt-4">
                                        <p className="text-[#003153] font-medium hover:text-blue-800 transition-colors">
                                            {t('services.moreInfo')}
                                        </p>
                                        <Link href={servicio.ruta}>
                                            <button className="text-white font-medium bg-[#6B21A8] hover:bg-blue-800 rounded-lg transition-all py-3 px-10">
                                                {servicio.textoBoton}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
"use client";

import React from 'react'
import type { Servicio } from '@/src/Services/Servicio';
import Link from 'next/link'; // ← Agrega esta importación

const servicios: Servicio[] = [
    {
        id: 1,
        titulo: 'Construcción Residencial',
        descripcion: 'Casas y edificios con los más altos estándares de calidad.',
        iconoUrl: '/window.png'
    },
    {
        id: 2,
        titulo: 'Renovaciones y Remodelaciones',
        descripcion: 'Transformamos tus espacios existentes con diseños modernos.',
        iconoUrl: '/glove.svg'
    },
    {
        id: 3,
        titulo: 'Consultoría en Construcción',
        descripcion: 'Asesoría especializada para tu proyecto constructivo.',
        iconoUrl: '/file.svg'
    },
    {
        id: 4,
        titulo: 'Supervisión de Proyectos',
        descripcion: 'Control de calidad y cumplimiento de plazos garantizados.',
        iconoUrl: '/icono-consultoria.png'
    }
];

export const Servicios = () => {
    return (
        <div id="servicios" className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-[#003153] mb-4">
                    Nuestros Servicios de Construcción
                </h1>
                
                <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                    Soluciones integrales para hacer realidad tus proyectos constructivos
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

                                {/* Texto */}
                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-[#003153] mb-3">
                                        {servicio.titulo}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {servicio.descripcion}
                                    </p>
                            <div className="flex items-center gap-6 mt-4">
                                <p className="mt-4 text-[#003153] font-medium hover:text-blue-800 transition-colors">
                                    Más información y precios →
                                </p>

                                <Link href="/catalogo">
                                    <button className="mt-4 text-white font-medium bg-[#6B21A8] hover:bg-blue-800 rounded-lg transition-all py-3 px-10">
                                        Vista
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
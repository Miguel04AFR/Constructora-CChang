"use client";

import React from 'react'
import type { Servicio } from '@/src/Services/Servicio';
import Link from 'next/link';

export const Servicios = () => {
    const servicios: Servicio[] = [
        {
            id: 1,
            titulo: "Construcción Residencial",
            descripcion: "Diseñamos y construimos tu hogar ideal con los más altos estándares de calidad y atención personalizada.",
            iconoUrl: '/window.png'
        },
        {
            id: 2,
            titulo: "Remodelaciones",
            descripcion: "Transformamos tus espacios existentes con soluciones innovadoras que maximizan funcionalidad y estética.",
            iconoUrl: '/glove.svg'
        },
        {
            id: 3,
            titulo: "Consultoría Especializada",
            descripcion: "Asesoramiento técnico profesional para planificar y ejecutar tu proyecto con total confianza.",
            iconoUrl: '/file.svg'
        },
        {
            id: 4,
            titulo: "Supervisión de Obras",
            descripcion: "Control y seguimiento continuo garantizando el cumplimiento de plazos, presupuestos y calidad.",
            iconoUrl: '/icono-consultoria.png'
        }
    ];

    return (
        <div id="servicios" className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-[#003153] mb-4">
                    Nuestros Servicios
                </h1>
                
                <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                    Ofrecemos soluciones integrales en construcción y remodelación para hacer realidad tus proyectos
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
                                        <p className="text-[#003153] font-medium hover:text-blue-800 transition-colors cursor-pointer">
                                            Más información
                                        </p>
                                        <Link href={servicio.id === 2 ? '/servicios/renovaciones' : '/catalogo'}>
                                            <button className="text-white font-medium bg-[#6B21A8] hover:bg-purple-700 rounded-lg transition-all py-3 px-10">
                                                Ver más
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
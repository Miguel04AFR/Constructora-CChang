import React from 'react';
import type { Casa } from '@/src/components/index';

interface InformacionPropiedadProps {
    propiedad: Casa;
}

const Especificaciones: React.FC<{ propiedad: Casa }> = ({ propiedad }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                    <div className="text-2xl font-bold text-[#6B21A8] mb-1">
                        ${propiedad.precio.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Precio</div>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                        <span className="text-2xl">🛏️</span>
                    </div>
                    <div className="text-lg font-semibold text-[#003153]">{propiedad.habitaciones}</div>
                    <div className="text-sm text-gray-500">Habitaciones</div>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                        <span className="text-2xl">🚿</span>
                    </div>
                    <div className="text-lg font-semibold text-[#003153]">{propiedad.banos}</div>
                    <div className="text-sm text-gray-500">Baños</div>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                        <span className="text-2xl">📐</span>
                    </div>
                    <div className="text-lg font-semibold text-[#003153]">{propiedad.metrosCuadrados}m²</div>
                    <div className="text-sm text-gray-500">Superficie</div>
                </div>
            </div>
        </div>
    );
};

const Descripcion: React.FC<{ propiedad: Casa }> = ({ propiedad }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#003153] mb-4">Descripción</h2>
            <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                    {propiedad.descripcion}
                </p>
            </div>
        </div>
    );
};

const Caracteristicas: React.FC<{ propiedad: Casa }> = ({ propiedad }) => {
    const caracteristicasDisponibles = [
        { nombre: 'Piscina', icono: '🏊' },
        { nombre: 'Garaje', icono: '🚗' },
        { nombre: 'Jardín', icono: '🌳' },
        { nombre: 'Aire Acondicionado', icono: '❄️' },
        { nombre: 'WiFi', icono: '📶' },
        { nombre: 'Lavadero', icono: '🧺' },
        { nombre: 'Cocina Equipada', icono: '👨‍🍳' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#003153] mb-4">Características</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {caracteristicasDisponibles.map((caracteristica, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-xl">{caracteristica.icono}</span>
                        <span className="text-sm text-gray-700">{caracteristica.nombre}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const InformacionPropiedad: React.FC<InformacionPropiedadProps> = ({ propiedad }) => {
    return (
        <>
            <Especificaciones propiedad={propiedad} />
            <Descripcion propiedad={propiedad} />
            <Caracteristicas propiedad={propiedad} />
        </>
    );
};

export { Especificaciones, Descripcion, Caracteristicas };
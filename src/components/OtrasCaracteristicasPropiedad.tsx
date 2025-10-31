import React from 'react';
import type { Casa } from '@/src/components/index';

interface CaracteristicasPropiedadProps {
    propiedad: Casa;
}

const caracteristicasDisponibles = [
    { nombre: 'Piscina', icono: '🏊' },
    { nombre: 'Garaje', icono: '🚗' },
    { nombre: 'Jardín', icono: '🌳' },
    { nombre: 'Aire Acondicionado', icono: '❄️' },
    { nombre: 'WiFi', icono: '📶' },
    { nombre: 'Lavadero', icono: '🧺' },
    { nombre: 'Cocina Equipada', icono: '👨‍🍳' }
];

export const CaracteristicasPropiedad: React.FC<CaracteristicasPropiedadProps> = ({ propiedad }) => {
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
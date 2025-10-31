import React from 'react';
import type { Casa } from '@/src/components/index';

interface EspecificacionesPropiedadProps {
    propiedad: Casa;
}

export const EspecificacionesPropiedad: React.FC<EspecificacionesPropiedadProps> = ({ propiedad }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
                {/* Precio */}
                <div className="text-center">
                    <div className="text-2xl font-bold text-[#6B21A8] mb-1">
                        ${propiedad.precio.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Precio</div>
                </div>
        
                {/* Habitaciones */}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                        <span className="text-2xl">🛏️</span>
                    </div>
                    <div className="text-lg font-semibold text-[#003153]">{propiedad.habitaciones}</div>
                    <div className="text-sm text-gray-500">Habitaciones</div>
                </div>
        
                {/* Baños */}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                        <span className="text-2xl">🚿</span>
                    </div>
                    <div className="text-lg font-semibold text-[#003153]">{propiedad.banos}</div>
                    <div className="text-sm text-gray-500">Baños</div>
                </div>
        
                {/* Metros Cuadrados */}
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
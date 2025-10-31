import React from 'react';
import type { Casa } from '@/src/components/index';

interface DescripcionPropiedadProps {
    propiedad: Casa;
}

export const DescripcionPropiedad: React.FC<DescripcionPropiedadProps> = ({ propiedad }) => {
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
"use client";

import React, { useState } from 'react';
import type { Casa } from '@/src/components/index';

interface GaleriaImagenesProps {
    propiedad: Casa;
}

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

export const GaleriaImagenes: React.FC<GaleriaImagenesProps> = ({ propiedad }) => {
    const [imagenPrincipal, setImagenPrincipal] = useState(propiedad.imagenUrl);

  // Obtener el número de casa del ID (último carácter)
    const numeroCasa = propiedad.id.slice(-1);

    const imagenes = imagenesPorCasa[numeroCasa] || [propiedad.imagenUrl];

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
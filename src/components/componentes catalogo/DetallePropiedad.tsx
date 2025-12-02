"use client";

import React from 'react';
import type { Casa } from '@/src/Services/Casa';
import { GaleriaHeader } from '@/src/components/componentes catalogo/GaleriaHeader';
import { InformacionPropiedad } from '@/src/components/componentes catalogo/InformacionPropiedad';
import { FormularioContactoP } from './FormularioDeContacto';
interface DetallePropiedadProps {
    propiedad: Casa;
}

export const DetallePropiedad: React.FC<DetallePropiedadProps> = ({ propiedad }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
        
                <GaleriaHeader propiedad={propiedad} />
        
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                    <div className="lg:col-span-2 space-y-8">
                        <InformacionPropiedad propiedad={propiedad} />
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <FormularioContactoP propiedad={propiedad} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
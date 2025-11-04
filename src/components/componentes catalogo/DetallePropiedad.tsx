import React from 'react';
import type { Casa } from '@/src/components/index';
import { EncabezadoPropiedad } from '@/src/components/componentes catalogo/HeaderPropiedad';
import { GaleriaImagenes } from '@/src/components/componentes catalogo/GaleriaImagenes';
import { EspecificacionesPropiedad } from '@/src/components/componentes catalogo/EspecificacionesPropiedad';
import { DescripcionPropiedad } from '@/src/components/componentes catalogo/DescripcionPropiedad';
import { CaracteristicasPropiedad } from '@/src/components/componentes catalogo/OtrasCaracteristicasPropiedad';
import { FormularioContacto } from '@/src/components/componentes catalogo/FormularioDeContactoPropietario';

interface DetallePropiedadProps {
    propiedad: Casa;
}

export const DetallePropiedad: React.FC<DetallePropiedadProps> = ({ propiedad }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
        
                <EncabezadoPropiedad propiedad={propiedad} />
        
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">

                    <div className="lg:col-span-2 space-y-8">
            
                        <GaleriaImagenes propiedad={propiedad} />
            
                        <EspecificacionesPropiedad propiedad={propiedad} />
            
                        <DescripcionPropiedad propiedad={propiedad} />
            
                        <CaracteristicasPropiedad propiedad={propiedad} />
            
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <FormularioContacto propiedad={propiedad} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
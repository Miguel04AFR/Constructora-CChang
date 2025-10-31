import React from 'react';
import type { Casa } from '@/src/components/index';
import { EncabezadoPropiedad } from '@/src/components/HeaderPropiedad';
import { GaleriaImagenes } from '@/src/components/GaleriaImagenes';
import { EspecificacionesPropiedad } from '@/src/components/EspecificacionesPropiedad';
import { DescripcionPropiedad } from '@/src/components/DescripcionPropiedad';
import { CaracteristicasPropiedad } from '@/src/components/OtrasCaracteristicasPropiedad';
import { FormularioContacto } from '@/src/components/FormularioDeContactoPropietario';

interface DetallePropiedadProps {
    propiedad: Casa;
}

export const DetallePropiedad: React.FC<DetallePropiedadProps> = ({ propiedad }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
        
                {/* Encabezado con navegación */}
                <EncabezadoPropiedad propiedad={propiedad} />
        
                {/* Contenido principal */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">

                    {/* Columna izquierda - Contenido principal */}
                    <div className="lg:col-span-2 space-y-8">
            
                        {/* Galería de imágenes */}
                        <GaleriaImagenes propiedad={propiedad} />
            
                        {/* Especificaciones básicas */}
                        <EspecificacionesPropiedad propiedad={propiedad} />
            
                        {/* Descripción */}
                        <DescripcionPropiedad propiedad={propiedad} />
            
                        {/* Características */}
                        <CaracteristicasPropiedad propiedad={propiedad} />
            
                    </div>

                    {/* Columna derecha - Formulario de contacto */}
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
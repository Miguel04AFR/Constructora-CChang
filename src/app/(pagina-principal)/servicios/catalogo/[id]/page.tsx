import React from 'react';
import { DetallePropiedad } from '@/src/components/componentes catalogo/DetallePropiedad';
import { casasAnadidas } from '@/src/data/propiedades-casas';

function encontrarCasaPorId(id: string) {
    return casasAnadidas.find(casa => casa.id === id);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const casa = encontrarCasaPorId(id);

    if (!casa) {
        return {
            titulo: 'Propiedad No Encontrada',
            descripcion: 'La propiedad que buscas no está disponible.'
        };
    }

    return {
        titulo: `${casa.nombre} - ${casa.ubicacion}`,
        descripcion: casa.descripcion.substring(0, 160) + '...',
    };
}

export default async function PaginaDetallePropiedad({ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const casa = encontrarCasaPorId(id);

    if (!casa) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Propiedad No Encontrada</h1>
                    <p className="text-gray-600 mb-6">La propiedad que buscas no existe o ha sido removida.</p>
                    <a 
                        href="/catalogo" 
                        className="bg-[#003153] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                        Volver al Catálogo
                    </a>
                </div>
            </div>
        );
    }

    return <DetallePropiedad propiedad={casa} />;
}

export async function generateStaticParams() {
    return casasAnadidas.map((casa) => ({
        id: casa.id,
    }));
}
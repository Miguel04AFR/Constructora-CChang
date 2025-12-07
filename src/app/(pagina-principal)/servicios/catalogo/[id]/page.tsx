import React from 'react';
import { DetallePropiedad } from '@/src/components/componentes catalogo/DetallePropiedad';
import { casasAnadidas } from '@/src/data/propiedades-casas';
import { casaService } from '@/src/Services/Casa';

async function obtenerTodasLasCasas() {
  try {
   
    const casasDB = await casaService.obtenerCasas();
    
    
    
    const casasDBFormateadas = Array.isArray(casasDB) 
      ? casasDB.map(casa => ({
          ...casa,
          id: casa.id?.toString() || String(Math.random())
        }))
      : [];
    
   
    const todasLasCasas = [...casasDBFormateadas, ...casasAnadidas];
    
    return todasLasCasas;
  } catch (error) {
    console.error('Error obteniendo casas:', error);

    return casasAnadidas;
  }
}

// Función para encontrar casa por ID
async function encontrarCasaPorId(id: string) {
  const todasLasCasas = await obtenerTodasLasCasas();
  return todasLasCasas.find(casa => casa.id === id);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const casa = await encontrarCasaPorId(id);

  if (!casa) {
    return {
      title: 'Propiedad No Encontrada',
      description: 'La propiedad que buscas no está disponible.'
    };
  }

  return {
    title: `${casa.nombre} - ${casa.ubicacion}`,
    description: (casa.descripcion || '').substring(0, 160) + '...',
  };
}

export default async function PaginaDetallePropiedad({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const casa = await encontrarCasaPorId(id);

  if (!casa) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Propiedad No Encontrada</h1>
          <p className="text-gray-600 mb-6">La propiedad que buscas no existe o ha sido removida.</p>
          <a 
            href="/" 
            className="bg-[#003153] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  return <DetallePropiedad propiedad={casa} />;
}

export async function generateStaticParams() {
  // Solo generar rutas para las casas mock (ya que son estáticas)
  // Las de la DB serán dinámicas
  return casasAnadidas.map((casa) => ({
    id: casa.id,
  }));
}
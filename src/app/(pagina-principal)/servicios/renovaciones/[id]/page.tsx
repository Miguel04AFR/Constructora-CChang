import React from 'react';
import RemodelacionDetail from '@/src/components/remodelaciones/RemodelacionDetail';
import { remodelaciones as remodelacionesMock } from '@/src/data/remodelaciones';
import type { Remodelacion } from '@/src/Services/Remodelacion';
import { remodelacionService } from '@/src/Services/Remodelacion';

// Función para obtener TODAS las remodelaciones (mock + DB)
async function obtenerTodasLasRemodelaciones() {
  try {
    // Obtener remodelaciones de la base de datos
    const remodelacionesDB = await remodelacionService.obtenerRemodelaciones();
    
    // Combinar con remodelaciones mock
    const remodelacionesDBFormateadas = Array.isArray(remodelacionesDB) 
      ? remodelacionesDB.map(remodel => ({
          ...remodel,
          id: remodel.id?.toString() || String(Math.random()) // Asegurar que id sea string
        }))
      : [];
    
    // Las remodelaciones mock ya tienen IDs en tu data
    const todasLasRemodelaciones = [...remodelacionesDBFormateadas, ...remodelacionesMock];
    
    return todasLasRemodelaciones;
  } catch (error) {
    console.error('Error obteniendo remodelaciones:', error);
    // Si hay error, solo devolver las mock
    return remodelacionesMock;
  }
}

export default async function RenovacionDetailPage({ params }: { params: any }) {
  // params may be a Promise in some Next.js setups; await to be safe
  const resolvedParams = await params;
  
  // Obtener todas las remodelaciones
  const todasLasRemodelaciones = await obtenerTodasLasRemodelaciones();
  
  // Buscar por ID (convertir ambos a string para comparación)
  const remodel: Remodelacion | undefined = todasLasRemodelaciones.find((r) => 
    String(r.id) === String(resolvedParams?.id)
  );

  if (!remodel) {
    // helpful debug info when id not found
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Remodelación no encontrada.</p>
          <p className="text-sm text-gray-500">id recibido: {String(resolvedParams?.id ?? '')}</p>
          <p className="text-sm text-gray-500 mt-2">Ids disponibles: {todasLasRemodelaciones.map((r) => r.id).join(', ')}</p>
        </div>
      </div>
    );
  }

  return <RemodelacionDetail remodelacion={remodel} />;
}
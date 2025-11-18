import React from 'react';
import RemodelacionDetail from '@/src/components/remodelaciones/RemodelacionDetail';
import { remodelaciones } from '@/src/data/remodelaciones';
import type { Remodelacion } from '@/src/Services/Remodelacion';

export default async function RenovacionDetailPage({ params }: { params: any }) {
  // params may be a Promise in some Next.js setups; await to be safe
  const resolvedParams = await params;

  // match by string to avoid Number/NaN issues from params
  const remodel: Remodelacion | undefined = remodelaciones.find((r) => String(r.id) === String(resolvedParams?.id));

  if (!remodel) {
    // helpful debug info when id not found
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Remodelación no encontrada.</p>
          <p className="text-sm text-gray-500">id recibido: {String(resolvedParams?.id ?? '')}</p>
          <p className="text-sm text-gray-500 mt-2">Ids disponibles: {remodelaciones.map((r) => r.id).join(', ')}</p>
        </div>
      </div>
    );
  }

  return <RemodelacionDetail remodelacion={remodel} />;
}

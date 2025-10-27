"use client";

import React, { useState } from 'react';
import type { Proyecto } from './index';


const proyectosEjemplo: Proyecto[] = [ 
  {
    id: 1,
    imagenUrl: "/img/"
  },
  {
    id: 2,
    imagenUrl: "/imag/modelo-3d-de-edificio-residencial.jpg"  
  },
  {
    id: 3,
    imagenUrl: "/imag/proyectos/proyecto3.jpg" 
  }
];

export const Proyectos = () => {  // ← "Proyectos" con P mayúscula
  const [indiceActual, setIndiceActual] = useState(0);

  const proyectoActual = proyectosEjemplo[indiceActual];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-[#003153] mb-8">
        Nuestros Proyectos
      </h1>
      
      <div className="max-w-4xl mx-auto">
    
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="h-80 bg-gray-100 flex items-center justify-center">
            <img 
              src={proyectoActual.imagenUrl} 
              alt={`Proyecto ${proyectoActual.id}`}
              className="max-h-full max-w-full object-cover"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button 
            onClick={() => setIndiceActual(prev => (prev - 1 + proyectosEjemplo.length) % proyectosEjemplo.length)}
            className="bg-[#003153] text-white px-6 py-3 rounded-lg hover:bg-blue-800"
          >
          {/*  ← Anterior*/}
          </button>
          
          <div className="text-lg font-medium">
            {indiceActual + 1} / {proyectosEjemplo.length}
          </div>
          
          <button 
            onClick={() => setIndiceActual(prev => (prev + 1) % proyectosEjemplo.length)}
            className="bg-[#003153] text-white px-6 py-3 rounded-lg hover:bg-blue-800"
          >
            {/* Siguiente →*/}
          </button>
        </div>
      </div>
    </div>
  );
}
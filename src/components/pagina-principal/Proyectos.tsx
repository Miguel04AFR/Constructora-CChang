"use client";

import React, { useState, useEffect } from 'react';
import type { Proyecto } from '@/src/Services/Proyecto';


const proyectosEjemplo: Proyecto[] = [ 
  {
    id: 1,
    imagenUrl: "/modelo-3d-de-edificio-residencial.jpg"
  },
  {
    id: 2,
    imagenUrl: "/vista-3d-del-modelo-de-casa.jpg"  
  },
  {
    id: 3,
    imagenUrl: "/vista-del-modelo-de-casa-3d.jpg" 
  }
];

  export const Proyectos = () => {
  const [indiceActual, setIndiceActual] = useState(0);

  const proyectoActual = proyectosEjemplo[indiceActual];

 useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual(prev => (prev + 1) % proyectosEjemplo.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div id="proyectos" className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-[#003153] mb-8">
        Nuestros Proyectos
      </h1>
      
      <div className="max-w-4xl mx-auto">
    
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
           <div className="h-[500px] bg-gray-100 flex items-center justify-center">
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
           ← Anterior
          </button>
          
          <div className="text-lg font-medium">{/*indicador 1/3 cosas asi */}
            {indiceActual + 1} / {proyectosEjemplo.length}
          </div>
          
          <button 
            onClick={() => setIndiceActual(prev => (prev + 1) % proyectosEjemplo.length)}
            className="bg-[#003153] text-white px-6 py-3 rounded-lg hover:bg-blue-800"
          >
             Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
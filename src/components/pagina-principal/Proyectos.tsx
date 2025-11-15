"use client";

import React, { useState, useEffect } from 'react';
import type { Proyecto } from '@/src/Services/Proyecto';

const proyectosEjemplo: Proyecto[] = [ 
  {
    id: 1,
    imagenUrl: "/modelo-3d-de-edificio-residencial.jpg",
    titulo: "Residencial Las Palmas",
    descripcion: "Moderno complejo residencial con áreas verdes y amenities exclusivos"
  },
  {
    id: 2,
    imagenUrl: "/vista-3d-del-modelo-de-casa.jpg",
    titulo: "Casa Contemporánea",
    descripcion: "Diseño vanguardista con integración perfecta entre espacios interiores y exteriores"
  },
  {
    id: 3,
    imagenUrl: "/vista-del-modelo-de-casa-3d.jpg",
    titulo: "Urban Living",
    descripcion: "Apartamentos inteligentes en zona urbana con acabados de lujo"
  }
];

export const Proyectos = () => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [estaTransicionando, setEstaTransicionando] = useState(false);

  const proyectoActual = proyectosEjemplo[indiceActual];

  const siguienteProyecto = () => {
    setEstaTransicionando(true);
    setTimeout(() => {
      setIndiceActual(prev => (prev + 1) % proyectosEjemplo.length);
      setEstaTransicionando(false);
    }, 300);
  };

  const anteriorProyecto = () => {
    setEstaTransicionando(true);
    setTimeout(() => {
      setIndiceActual(prev => (prev - 1 + proyectosEjemplo.length) % proyectosEjemplo.length);
      setEstaTransicionando(false);
    }, 300);
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      siguienteProyecto();
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <section id="proyectos" className="py-20 gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#003153] mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestras obras más representativas donde calidad y diseño se encuentran
          </p>
          <div className="w-24 h-1 bg-[#003153] mx-auto mt-6 rounded-full"></div>
        </div>


        <div className="max-w-6xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">

            <div className="relative h-[600px] overflow-hidden">
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  estaTransicionando ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <img 
                  src={proyectoActual.imagenUrl} 
                  alt={proyectoActual.titulo}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bgradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Información del proyecto */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="max-w-2xl">
                  <h3 className="text-3xl font-bold mb-3">{proyectoActual.titulo}</h3>
                  <p className="text-lg text-blue-400 mb-6">{proyectoActual.descripcion}</p>
                  

                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      {proyectosEjemplo.map((proyecto, index) => ( /*no uso la variable proyecto pero wueno*/
                        <button
                          key={index}
                          onClick={() => {
                            setEstaTransicionando(true);
                            setTimeout(() => {
                              setIndiceActual(index);
                              setEstaTransicionando(false);
                            }, 300);
                          }}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === indiceActual 
                              ? 'bg-white scale-125' 
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-300">
                      {indiceActual + 1} / {proyectosEjemplo.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={anteriorProyecto}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-blue-800 text-[#003153] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 "
              aria-label="Proyecto anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={siguienteProyecto}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-blue-800 text-[#003153] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              aria-label="Siguiente proyecto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* en chiquito */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {proyectosEjemplo.map((proyecto, index) => (
              <button
                key={proyecto.id}
                onClick={() => {
                  setEstaTransicionando(true);
                  setTimeout(() => {
                    setIndiceActual(index);
                    setEstaTransicionando(false);
                  }, 300);
                }}
                className={`relative h-32 rounded-xl overflow-hidden transition-all ${
                  index === indiceActual 
                    ? 'ring-4 ring-[#003153] scale-105' //ring es como border pero es mas decorativo,la diferencia es que no suma al tamño del elemento 
                    : 'opacity-80 hover:opacity-100 hover:scale-102'
                }`}
              >
                <img 
                  src={proyecto.imagenUrl} 
                  alt={proyecto.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-medium text-sm text-center px-2">
                    {proyecto.titulo}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
};
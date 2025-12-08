// Datos mock fijos
/*const proyectosEjemplo: Proyecto[] = [ 
  {

    titulo: "Residencial Las Palmas",
    descripcion: "Moderno complejo residencial con áreas verdes y amenities exclusivos"
  },
  {

    titulo: "Casa Contemporánea",
    descripcion: "Diseño vanguardista con integración perfecta entre espacios interiores y exteriores"
  },
  {
    titulo: "Urban Living",
    descripcion: "Apartamentos inteligentes en zona urbana con acabados de lujo"
  }
];*/

"use client";

import React, { useState, useEffect } from 'react';
import type { Proyecto } from '@/src/Services/Proyecto';
import { proyectoService } from '@/src/Services/Proyecto';
import { useTranslation } from 'react-i18next';

export const Proyectos = () => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [estaTransicionando, setEstaTransicionando] = useState(false);
  const [proyectosDB, setProyectosDB] = useState<Proyecto[]>([]);
  const [cargando, setCargando] = useState(true);
  const { t } = useTranslation();

  const todosLosProyectos = [...proyectosDB];
  
  // Validar que proyectoActual exista antes de usarlo
  const proyectoActual = todosLosProyectos[indiceActual];

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        setCargando(true);
        const proyectos = await proyectoService.obtenerProyectos();
        setProyectosDB(proyectos);
      } catch (err) {
        console.log('No se pudieron cargar proyectos');
      } finally {
        setCargando(false);
      }
    };

    fetchProyectos();
  }, []);

  const siguienteProyecto = () => {
    if (todosLosProyectos.length <= 1) return;
    
    setEstaTransicionando(true);
    setTimeout(() => {
      setIndiceActual(prev => (prev + 1) % todosLosProyectos.length);
      setEstaTransicionando(false);
    }, 300);
  };

  const anteriorProyecto = () => {
    if (todosLosProyectos.length <= 1) return;
    
    setEstaTransicionando(true);
    setTimeout(() => {
      setIndiceActual(prev => (prev - 1 + todosLosProyectos.length) % todosLosProyectos.length);
      setEstaTransicionando(false);
    }, 300);
  };

  // Auto-rotación solo si hay proyectos
  useEffect(() => {
    if (todosLosProyectos.length <= 1) return;
    
    const intervalo = setInterval(() => {
      siguienteProyecto();
    }, 5000);

    return () => clearInterval(intervalo);
  }, [todosLosProyectos.length]);

  // Si no hay proyectos o está cargando, mostrar estado de carga
  if (cargando) {
    return (
      <section id="proyectos" className="py-20 gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#003153] mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003153]"></div>
            <p className="ml-4 text-gray-600">Cargando proyectos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (todosLosProyectos.length === 0) {
    return (
      <section id="proyectos" className="py-20 gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#003153] mb-4">
              {t('projects.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No hay proyectos disponibles</h3>
            <p className="text-gray-500">No se encontraron proyectos para mostrar.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="proyectos" className="py-20 gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#003153] mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('projects.subtitle')}
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
                  src={`${process.env.NEXT_PUBLIC_API_URL}${proyectoActual?.imagenUrl}`}
                  alt={proyectoActual?.titulo || 'Proyecto'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    e.currentTarget.src = '/placeholder-image.jpg';
                    e.currentTarget.alt = 'Imagen no disponible';
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Información del proyecto */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="max-w-2xl">
                  <h3 className="text-3xl font-bold mb-3">{proyectoActual?.titulo || 'Proyecto sin título'}</h3>
                  <p className="text-lg text-blue-400 mb-6">{proyectoActual?.descripcion || 'Descripción no disponible'}</p>
                  

                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      {todosLosProyectos.map((proyecto, index) => (
                        <button
                          key={proyecto.id || index}
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
                          aria-label={t('projects.goToProject', { number: index + 1 })}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-300">
                      {indiceActual + 1} / {todosLosProyectos.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {todosLosProyectos.length > 1 && (
              <>
                <button
                  onClick={anteriorProyecto}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-blue-800 text-[#003153] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 "
                  aria-label={t('projects.previous')}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  onClick={siguienteProyecto}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-blue-800 text-[#003153] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  aria-label={t('projects.next')}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Miniaturas - todos los proyectos juntos */}
          {todosLosProyectos.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-8">
              {todosLosProyectos.map((proyecto, index) => (
                <button
                  key={proyecto.id || index}
                  onClick={() => {
                    setEstaTransicionando(true);
                    setTimeout(() => {
                      setIndiceActual(index);
                      setEstaTransicionando(false);
                    }, 300);
                  }}
                  className={`relative h-32 rounded-xl overflow-hidden transition-all ${
                    index === indiceActual 
                      ? 'ring-4 ring-[#003153] scale-105'
                      : 'opacity-80 hover:opacity-100 hover:scale-102'
                  }`}
                >
                  <img 
                    src={`${process.env.NEXT_PUBLIC_API_URL}${proyecto.imagenUrl}`} 
                    alt={proyecto.titulo || 'Proyecto'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      e.currentTarget.src = '/placeholder-image.jpg';
                      e.currentTarget.alt = 'Imagen no disponible';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-medium text-sm text-center px-2">
                      {proyecto.titulo || 'Proyecto'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
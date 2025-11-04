"use client";

import React, { useState, useEffect } from 'react';
import type { Casa } from '@/src/Services/Casa';
import {casasAnadidas} from '@/src/data/propiedades-casas';
import Link from 'next/link';


export const CatalogoContainer = () => {
    const [indiceActual, setIndiceActual] = useState(0);
    const [direccion, setDireccion] = useState<'derecha' | 'izquierda'>('derecha');

    const totalCasas = casasAnadidas.length;

    const limitarDescripcion = (descripcion: string, maxCaracteres: number = 100) => {
        if (descripcion.length <= maxCaracteres) {
            return descripcion;
        }
        
        const textoCortado = descripcion.substring(0, maxCaracteres - 3);
        
        const ultimoEspacio = textoCortado.lastIndexOf(' ');
        
        if (ultimoEspacio > maxCaracteres - 10) {
            return textoCortado.substring(0, ultimoEspacio) + '...';
        }
        
        return textoCortado + '...';
    };

    const siguiente = () => {
        setDireccion('derecha');
        setIndiceActual((prev) => (prev + 1) % totalCasas);
    };

    const anterior = () => {
        setDireccion('izquierda');
        setIndiceActual((prev) => (prev - 1 + totalCasas) % totalCasas);
    };

    // Autoplay inteligente
    useEffect(() => {
        if (totalCasas <= 1) return;

        const intervalo = setInterval(() => {
            if (direccion === 'derecha') {
                if (indiceActual === totalCasas - 1) {
                    setDireccion('izquierda');
                    anterior();
                } else {
                    siguiente();
                }
            } else {
                if (indiceActual === 0) {
                    setDireccion('derecha');
                    siguiente();
                } else {
                    anterior();
                }
            }
        }, 4000);

        return () => clearInterval(intervalo);
    }, [indiceActual, direccion, totalCasas]);

    const getIndicesVisibles = () => {
        if (totalCasas === 0) return [];
        if (totalCasas === 1) return [0];
        if (totalCasas === 2) return [indiceActual, (indiceActual + 1) % totalCasas];
        
        return [
            (indiceActual - 1 + totalCasas) % totalCasas,
            indiceActual,
            (indiceActual + 1) % totalCasas
        ];
    };

    const indicesVisibles = getIndicesVisibles();

    if (totalCasas === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center " >
                <p className="text-xl text-gray-600">No hay casas disponibles en el catálogo.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-[#003153] mb-4 text-center mt-5">
              Nuestras Viviendas
            </h1>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Descubre nuestra exclusiva selección de viviendas diseñadas para tu comodidad
            </p>

            {/* Carrusel */}
            <div className="relative max-w-6xl mx-auto">
          
                {/* Botón Izquierdo */}
                {totalCasas > 1 && (
                    <button
                      onClick={anterior}
                      className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-30 bg-[#003153] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-800 transition-colors"
                      aria-label='Casa anterior'
                      title='Ver casa anterior'
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                )}

                {/* Contenedor de tarjetas */}
                <div className="flex items-center justify-center gap-4 px-12">
                  {indicesVisibles.map((indice, posicion) => {
                    const casa = casasAnadidas[indice];
                    const esCentro = totalCasas > 2 ? posicion === 1 : posicion === 0;
                    const descripcionLimitada = limitarDescripcion(casa.descripcion);
                    
                    return (
                        <div
                          key={`${casa.id}-${posicion}`}
                          className={`
                            transition-all duration-500 ease-in-out
                            w-[400px] h-[520px] flex-none
                            ${esCentro 
                              ? 'scale-100 opacity-100 z-20' 
                              : 'scale-90 opacity-60 z-10'
                            }
                            ${posicion === 0 && totalCasas > 2 ? '-translate-x-2' : ''}
                            ${posicion === 2 && totalCasas > 2 ? 'translate-x-2' : ''}
                          `}
                        >
                          {/* Tarjeta */}
                          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-full h-full flex flex-col">
                            {/* Imagen */}
                            <div className="h-64 bg-gray-100 overflow-hidden flex shrink-0"> 
                              <img 
                                src={casa.imagenUrl} 
                                alt={casa.nombre}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                            
                           
                            <div className="p-6  grow flex flex-col"> 
                              <h3 className="text-xl font-bold text-[#003153] mb-3"> 
                                {casa.nombre}
                              </h3>
                        
                            
                              <div className="mb-3 min-h-[60px]"> 
                                <p className="text-sm text-gray-600"> 
                                  {descripcionLimitada}
                                </p>
                              </div>
                        
                              {/* Especificaciones */}
                              <div className="grid grid-cols-2 gap-4 mb-auto text-[12px] text-gray-600"> 
                                <div className="flex items-center gap-1">
                                  <span>📍 {casa.ubicacion}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>🛏️ {casa.habitaciones} hab.</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>🚿 {casa.banos} baños</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>📐 {casa.metrosCuadrados} m²</span>
                                </div>
                              </div>
                        
                              {/* Precio y Botón */}
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center gap-2">
                                  <span className="text-2xl font-bold text-[#6B21A8] flex shrink-0"> 
                                    ${casa.precio.toLocaleString()}
                                  </span>
                                  <Link 
                                    href={`/catalogo/${casa.id}`}
                                    className="bg-[#003153] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm whitespace-nowrap flex shrink-0" 
                                    aria-label={`Ver detalles de ${casa.nombre}`}
                                    title={`Más información sobre ${casa.nombre}`}
                                  >
                                    Ver Detalles
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    );
                  })}
                </div>

                {/* Botón Derecho */}
                {totalCasas > 1 && (
                    <button
                      onClick={siguiente}
                      className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-30 bg-[#003153] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-800 transition-colors"
                      aria-label='Casa siguiente'
                      title='Ver casa siguiente'
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                )}
            </div>

            {/* Indicadores */}
            {totalCasas > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {casasAnadidas.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDireccion(index > indiceActual ? 'derecha' : 'izquierda');
                        setIndiceActual(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === indiceActual ? 'bg-[#003153]' : 'bg-gray-300'
                      }`}
                      aria-label={`Ir a casa ${index + 1}`}
                      title={`Ver casa ${index + 1}`}
                    />
                  ))}
                </div>
            )}
          </div>
        </div>
    );
};
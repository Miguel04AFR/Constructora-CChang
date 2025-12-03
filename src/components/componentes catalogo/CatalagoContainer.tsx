"use client";

import React, { useState, useEffect } from 'react';
import type { Casa } from '@/src/Services/Casa';
import { casaService } from '@/src/Services/Casa'; // Importa el service
import { casasAnadidas } from '@/src/data/propiedades-casas';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const CatalogoContainer = () => {
    const [indiceActual, setIndiceActual] = useState(0);
    const [direccion, setDireccion] = useState<'derecha' | 'izquierda'>('derecha');
    const [casasDB, setCasasDB] = useState<Casa[]>([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    // Combinar datos del backend con datos mock
    const todasLasCasas = [...casasDB, ...casasAnadidas];
    const totalCasas = todasLasCasas.length;

    // Obtener casas de la base de datos
    useEffect(() => {
        const fetchCasas = async () => {
            try {
                setLoading(true);
                const casasFromAPI = await casaService.obtenerCasas();
                
                if (casasFromAPI && Array.isArray(casasFromAPI)) {
                    // Filtrar casas válidas
                    const casasValidas = casasFromAPI.filter(
                        casa => casa && casa.nombre && casa.imagenUrl && casa.imagenUrl.length > 0
                    );
                    setCasasDB(casasValidas);
                }
            } catch (err) {
                console.log('No se pudieron cargar casas adicionales');
                // Silenciamos el error, los mock ya están disponibles
            } finally {
                setLoading(false);
            }
        };

        fetchCasas();
    }, []);

    // Función para obtener la URL correcta de la imagen
    const getImageUrl = (imagenUrl: string | string[]): string => {
        // Si es array, tomar la primera imagen
        const url = Array.isArray(imagenUrl) ? (imagenUrl[0] ?? '') : (imagenUrl ?? '');
        
        if (!url) return '/placeholder-image.jpg';
        
        // Verificar si es una imagen mock conocida
        const mockImages = casasAnadidas.flatMap(casa => 
            Array.isArray(casa.imagenUrl) ? casa.imagenUrl : [casa.imagenUrl]
        );
        
        if (mockImages.includes(url)) {
            return url; // Es imagen mock, usar directamente
        }
        
        // Si ya es URL completa
        if (url.startsWith('http')) {
            return url;
        }
        
        // Para imágenes de la base de datos
        const normalizedPath = url.startsWith('/') ? url : `/${url}`;
        return `${process.env.NEXT_PUBLIC_API_URL}${normalizedPath}`;
    };

    // Función para limitar caracteres
    const limitarDescripcion = (descripcion: string, maxCaracteres: number = 100) => {
        if (!descripcion) return '';
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
        if (totalCasas <= 1) return;
        setDireccion('derecha');
        setIndiceActual((prev) => (prev + 1) % totalCasas);
    };

    const anterior = () => {
        if (totalCasas <= 1) return;
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003153]"></div>
                    <p className="mt-2 text-gray-600">Cargando catálogo...</p>
                </div>
            </div>
        );
    }

    if (totalCasas === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
                <p className="text-xl text-gray-600">{t('catalog.noHouses')}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-[#003153] mb-4 text-center mt-4">
                    {t('catalog.title')}
                </h1>
                <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    {t('catalog.subtitle')}
                </p>

                {/* Carrusel */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Botón Izquierdo */}
                    {totalCasas > 1 && (
                        <button
                            onClick={anterior}
                            className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-30 bg-[#003153] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-800 transition-colors"
                            aria-label={t('catalog.previousHouse')}
                            title={t('catalog.previousHouse')}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Contenedor de tarjetas */}
                    <div className="flex items-center justify-center gap-4 px-12">
                        {indicesVisibles.map((indice, posicion) => {
                            const casa = todasLasCasas[indice];
                            const esCentro = totalCasas > 2 ? posicion === 1 : posicion === 0;
                            const descripcionLimitada = limitarDescripcion(casa.descripcion);
                            const imagenUrl = getImageUrl(casa.imagenUrl);
                            
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
                                                src={imagenUrl}
                                                alt={casa.nombre}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/placeholder-image.jpg';
                                                    e.currentTarget.alt = 'Imagen no disponible';
                                                }}
                                            />
                                        </div>
                                        
                                        {/* Contenedor de datos */}
                                        <div className="p-6 grow flex flex-col">
                                            <h3 className="text-xl font-bold text-[#003153] mb-3">
                                                {casa.nombre}
                                            </h3>
                                    
                                            {/* Descripción */}
                                            <div className="mb-3 min-h-[60px]">
                                                <p className="text-sm text-gray-600">
                                                    {descripcionLimitada}
                                                </p>
                                            </div>
                                    
                                            {/* Especificaciones */}
                                            <div className="grid grid-cols-2 gap-4 mb-auto text-[12px] text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <span>📍 {casa.ubicacion || t('catalog.locationNotSpecified')}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>🛏️ {casa.habitaciones || 0} {t('catalog.bedrooms')}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>🚿 {casa.banos || 0} {t('catalog.bathrooms')}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>📐 {casa.metrosCuadrados || 0} {t('catalog.area')}</span>
                                                </div>
                                            </div>
                                    
                                            {/* Precio y Botón */}
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <div className="flex justify-between items-center gap-2">
                                                    <span className="text-2xl font-bold text-[#6B21A8] flex shrink-0">
                                                        ${(casa.precio || 0).toLocaleString()}
                                                    </span>
                                                    <Link 
                                                        href={`/servicios/catalogo/${casa.id}`}
                                                        className="bg-[#003153] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm whitespace-nowrap flex shrink-0"
                                                        aria-label={t('catalog.viewDetails', { name: casa.nombre })}
                                                        title={t('catalog.viewDetails', { name: casa.nombre })}
                                                    >
                                                        {t('catalog.viewDetailsButton')}
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
                            aria-label={t('catalog.nextHouse')}
                            title={t('catalog.nextHouse')}
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
                        {todasLasCasas.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDireccion(index > indiceActual ? 'derecha' : 'izquierda');
                                    setIndiceActual(index);
                                }}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === indiceActual ? 'bg-[#003153]' : 'bg-gray-300'
                                }`}
                                aria-label={t('catalog.goToHouse', { number: index + 1 })}
                                title={t('catalog.goToHouse', { number: index + 1 })}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
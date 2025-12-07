"use client";

import React, { useState, useEffect } from 'react';
import type { Casa, PaginacionResponse } from '@/src/Services/Casa';
import { casaService } from '@/src/Services/Casa';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const CatalogoContainer = () => {
    const [casasDB, setCasasDB] = useState<Casa[]>([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    
    // Estado para las pag
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [totalCasas, setTotalCasas] = useState(0);
    const [itemsPorPagina] = useState(3);

    useEffect(() => {
        const fetchCasas = async () => {
            try {
                setLoading(true);
                const offset = (paginaActual - 1) * itemsPorPagina;
                
                const respuestaPaginada: PaginacionResponse = await casaService.obtenerCasasPag({
                    limit: itemsPorPagina,
                    offset: offset
                });
                
                if (respuestaPaginada && Array.isArray(respuestaPaginada.casas)) {
                    // Filtrar casas validas
                    const casasValidas = respuestaPaginada.casas.filter(
                        casa => casa && casa.nombre && casa.imagenUrl && casa.imagenUrl.length > 0
                    );
                    
                    setCasasDB(casasValidas);
                    setTotalCasas(respuestaPaginada.total);
                    setTotalPaginas(respuestaPaginada.totalPages);
                }
            } catch (err) {
                console.error('Error cargando casas paginadas:', err);
                setCasasDB([]);
                setTotalCasas(0);
                setTotalPaginas(1);
            } finally {
                setLoading(false);
            }
        };

        fetchCasas();
    }, [paginaActual, itemsPorPagina]);

    const limitarDescripcion = (descripcion: string, maxCaracteres: number = 100) => {
        if (!descripcion) return '';
        if (descripcion.length <= maxCaracteres) return descripcion;
        
        const textoCortado = descripcion.substring(0, maxCaracteres - 3);
        const ultimoEspacio = textoCortado.lastIndexOf(' ');
        
        if (ultimoEspacio > maxCaracteres - 10) {
            return textoCortado.substring(0, ultimoEspacio) + '...';
        }
        
        return textoCortado + '...';
    };


    const cambiarPagina = (nuevaPagina: number) => {
        if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
        setPaginaActual(nuevaPagina);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

    if (casasDB.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">{t('catalog.noHouses')}</p>
                    <p className="text-gray-500 text-sm">No hay casas disponibles en el catálogo</p>
                </div>
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

            
                <div className="max-w-4xl mx-auto space-y-8">
                    {casasDB.map((casa, index) => {
                        const descripcionLimitada = limitarDescripcion(casa.descripcion);
                        const imagenPrincipal = Array.isArray(casa.imagenUrl) ? 
                            casa.imagenUrl[0] : casa.imagenUrl;
                        
                        return (
                            <div 
                                key={casa.id} 
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="md:flex">
                                    {/* Imagen a la izquierda */}
                                    <div className="md:w-1/3">
                                        <div className="h-64 md:h-full overflow-hidden">
                                            <img 
                                                src={`${process.env.NEXT_PUBLIC_API_URL}${imagenPrincipal}`}
                                                alt={casa.nombre}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/placeholder-image.jpg';
                                                    e.currentTarget.alt = 'Imagen no disponible';
                                                }}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Contenido a la derecha */}
                                    <div className="md:w-2/3 p-6">
                                        <h3 className="text-2xl font-bold text-[#003153] mb-3">
                                            {casa.nombre}
                                        </h3>
                                
                                        {/* Descripción */}
                                        <div className="mb-4">
                                            <p className="text-gray-600">
                                                {descripcionLimitada}
                                            </p>
                                        </div>
                                
                                        {/* Especificaciones en grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm text-gray-600">
                                            <div className="flex flex-col">
                                                <span className="font-semibold">📍 Ubicación</span>
                                                <span>{casa.ubicacion || 'No especificada'}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">🛏️ Habitaciones</span>
                                                <span>{casa.habitaciones || 0}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">🚿 Baños</span>
                                                <span>{casa.banos || 0}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">📐 Área</span>
                                                <span>{casa.metrosCuadrados || 0} m²</span>
                                            </div>
                                        </div>
                                
                                        {/* Precio y Botón */}
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                            <div>
                                                <span className="text-3xl font-bold text-[#6B21A8]">
                                                    ${(casa.precio || 0).toLocaleString()}
                                                </span>
                                                <p className="text-sm text-gray-500 mt-1">Precio total</p>
                                            </div>
                                            <Link 
                                                href={`/servicios/catalogo/${casa.id}`}
                                                className="bg-[#003153] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                                                aria-label={`Ver detalles de ${casa.nombre}`}
                                                title={`Ver detalles de ${casa.nombre}`}
                                            >
                                                Ver detalles completos
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Controles de paginación (abajo) - ESTA SECCIÓN SE MANTIENE */}
                {totalPaginas > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-gray-200">
                        <button
                            onClick={() => cambiarPagina(1)}
                            disabled={paginaActual === 1}
                            className={`px-4 py-2 rounded ${
                                paginaActual === 1 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-[#003153] text-white hover:bg-blue-800'
                            }`}
                        >
                            « Primera
                        </button>
                        
                        <button
                            onClick={() => cambiarPagina(paginaActual - 1)}
                            disabled={paginaActual === 1}
                            className={`px-4 py-2 rounded ${
                                paginaActual === 1 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-[#003153] text-white hover:bg-blue-800'
                            }`}
                        >
                            ‹ Anterior
                        </button>
                        
                        {/* Números de página */}
                        <div className="flex items-center gap-2">
                            {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                                // Lógica para mostrar páginas alrededor de la actual
                                let paginaNum;
                                if (totalPaginas <= 5) {
                                    paginaNum = i + 1;
                                } else if (paginaActual <= 3) {
                                    paginaNum = i + 1;
                                } else if (paginaActual >= totalPaginas - 2) {
                                    paginaNum = totalPaginas - 4 + i;
                                } else {
                                    paginaNum = paginaActual - 2 + i;
                                }
                                
                                return (
                                    <button
                                        key={paginaNum}
                                        onClick={() => cambiarPagina(paginaNum)}
                                        className={`w-10 h-10 rounded flex items-center justify-center ${
                                            paginaActual === paginaNum
                                            ? 'bg-[#003153] text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {paginaNum}
                                    </button>
                                );
                            })}
                            
                            {totalPaginas > 5 && paginaActual < totalPaginas - 2 && (
                                <>
                                    <span className="text-gray-400">...</span>
                                    <button
                                        onClick={() => cambiarPagina(totalPaginas)}
                                        className="w-10 h-10 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center"
                                    >
                                        {totalPaginas}
                                    </button>
                                </>
                            )}
                        </div>
                        
                        <button
                            onClick={() => cambiarPagina(paginaActual + 1)}
                            disabled={paginaActual === totalPaginas}
                            className={`px-4 py-2 rounded ${
                                paginaActual === totalPaginas 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-[#003153] text-white hover:bg-blue-800'
                            }`}
                        >
                            Siguiente ›
                        </button>
                        
                        <button
                            onClick={() => cambiarPagina(totalPaginas)}
                            disabled={paginaActual === totalPaginas}
                            className={`px-4 py-2 rounded ${
                                paginaActual === totalPaginas 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-[#003153] text-white hover:bg-blue-800'
                            }`}
                        >
                            Última »
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
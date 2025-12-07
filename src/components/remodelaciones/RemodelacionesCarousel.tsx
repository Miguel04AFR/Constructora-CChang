"use client";

import React, { useState, useEffect, useRef } from 'react';
import type { Remodelacion, PaginacionRemodelacion } from '@/src/Services/Remodelacion';
import { remodelacionService } from '@/src/Services/Remodelacion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FormularioContactoP } from '@/src/components/componentes catalogo/FormularioDeContacto';

export const RemodelacionesCarousel = () => {
  const { t } = useTranslation();
  const pageSize = 3;
  
  const [items, setItems] = useState<Remodelacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRemodel, setModalRemodel] = useState<Remodelacion | null>(null);
  const [formValido, setFormValido] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Estado para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalRemodelaciones, setTotalRemodelaciones] = useState(0);

  // Obtener remodelaciones PAGINADAS
  useEffect(() => {
    const fetchRemodelaciones = async () => {
      try {
        setLoading(true);
        const offset = (paginaActual - 1) * pageSize;
        
        const respuestaPaginada: PaginacionRemodelacion = await remodelacionService.obtenerRemodelacionesPag({
          limit: pageSize,
          offset: offset
        });
        
        if (respuestaPaginada && Array.isArray(respuestaPaginada.remodelaciones)) {
          const remodelacionesValidas = respuestaPaginada.remodelaciones.filter(
            remodel => remodel && remodel.nombre && remodel.descripcion
          );
          
          setItems(remodelacionesValidas);
          setTotalRemodelaciones(respuestaPaginada.total);
          setTotalPaginas(respuestaPaginada.totalPages);
        }
      } catch (err) {
        console.error('Error cargando remodelaciones paginadas:', err);
        setItems([]);
        setTotalRemodelaciones(0);
        setTotalPaginas(1);
      } finally {
        setLoading(false);
      }
    };

    fetchRemodelaciones();
  }, [paginaActual]);

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

  const getImagenPrincipal = (r: Remodelacion): string => {
    const imagenPrincipal = Array.isArray(r.imagenUrl) ? 
      (r.imagenUrl[0] || '/placeholder-image.jpg') : 
      (r.imagenUrl || '/placeholder-image.jpg');
    
    return `${process.env.NEXT_PUBLIC_API_URL}${imagenPrincipal}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003153]"></div>
          <p className="mt-2 text-gray-600">Cargando remodelaciones...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <p className="text-xl text-gray-600">{t('remodel.empty') || 'No hay remodelaciones disponibles.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#003153] mb-4 text-center mt-4">
          {t('services.list.renovations.title')}
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {t('remodel.subtitle') || 'Conoce nuestras opciones de remodelación y paquetes.'}
        </p>

        {/* Cards stack */}
        <div className="space-y-8">
          {items.map((r) => {
            const imagenUrl = getImagenPrincipal(r);
            const descripcionLimitada = limitarDescripcion(r.descripcion || '');
            
            return (
              <div 
                key={r.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl"
              >
                <div className="md:flex">
                  {/* Imagen a la izquierda */}
                  <div className="md:w-1/3">
                    <div className="h-64 md:h-full overflow-hidden">
                      <img 
                        src={imagenUrl} 
                        alt={r.nombre} 
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
                      {r.nombre}
                    </h3>
                    
                    {/* Descripción */}
                    <div className="mb-4">
                      <p className="text-gray-600">
                        {descripcionLimitada}
                      </p>
                    </div>
                    
                    {/* Especificaciones */}
                    <div className="mb-6">
                      
                    </div>
                    
                    {/* Precio y Botones */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div>
                        <span className="text-3xl font-bold text-[#6B21A8]">
                          {new Intl.NumberFormat(undefined, { 
                            style: 'currency', 
                            currency: 'USD', 
                            maximumFractionDigits: 0 
                          }).format(r.precio || 0)}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{t('remodel.estimatedPrice')}</p>
                      </div>
                      
                      <div className="flex gap-3">
                        <Link 
                          href={`/servicios/renovaciones/${r.id}`} 
                          className="bg-[#003153] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                          aria-label={`Ver detalles de ${r.nombre}`}
                          title={`Ver detalles de ${r.nombre}`}
                        >
                          {t('catalog.viewDetailsButton') || 'Ver Detalles'}
                        </Link>
                        <button
                          onClick={() => { 
                            setModalRemodel(r); 
                            setModalOpen(true); 
                            setFormValido(false); 
                          }}
                          className="bg-[#6B21A8] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                        >
                          {t('remodel.buy') || 'Contactar'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles de paginación */}
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
      
      {/* Modal for contact form */}
      {modalOpen && modalRemodel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 z-10 max-h-[70vh]">
            <button
              aria-label={t('close') || 'Cerrar'}
              onClick={() => { setModalOpen(false); setModalRemodel(null); }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center z-20"
            >
              ×
            </button>
            <div className="p-4">
              <h3 className="text-2xl font-bold text-[#003153] mb-2">
                {t('propertyDetail.contactForm.title') || 'Formulario de Contacto'}
              </h3>
              <p className="text-gray-600">Interesado en: <span className="font-semibold">{modalRemodel.nombre}</span></p>
            </div>

            <div className="px-4 overflow-auto max-h-[56vh]">
              <FormularioContactoP
                propiedad={{ nombre: modalRemodel.nombre }}
                formRef={formRef}
                onValChange={(v) => setFormValido(v)}
                onSubmitSuccess={() => {
                  setModalOpen(false);
                  setModalRemodel(null);
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 3000);
                }}
                hideSubmit={true}
              />
            </div>
            <div className="flex justify-end gap-3 p-4 border-t">
              <button 
                onClick={() => setModalOpen(false)} 
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                {t('cancel') || 'Cancelar'}
              </button>
              <button
                onClick={() => {
                  if (formRef.current) {
                    // @ts-ignore
                    if (typeof formRef.current.requestSubmit === 'function') formRef.current.requestSubmit();
                    else formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                  }
                }}
                disabled={!formValido}
                className={`px-4 py-2 rounded text-white ${
                  formValido 
                  ? 'bg-[#003153] hover:bg-blue-800' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {t('accept') || 'Enviar Consulta'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success toast */}
      {showSuccess && (
        <div role="status" className="fixed bottom-6 right-6 z-60 bg-green-600 text-white px-4 py-2 rounded shadow animate-fade-in">
          {t('propertyDetail.contactForm.successMessage') || 'Consulta enviada con éxito. Nos pondremos en contacto pronto.'}
        </div>
      )}
    </div>
  );
};

export default RemodelacionesCarousel;
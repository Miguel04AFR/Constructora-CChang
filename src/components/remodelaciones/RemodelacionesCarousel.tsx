"use client";

import React, { useState, useEffect, useRef } from 'react';
import { remodelaciones as remodelacionesMock } from '@/src/data/remodelaciones';
import type { Remodelacion } from '@/src/Services/Remodelacion';
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

  // Obtener remodelaciones de la base de datos y combinar con mock
  useEffect(() => {
    const fetchRemodelaciones = async () => {
      try {
        setLoading(true);
        const remodelacionesFromAPI = await remodelacionService.obtenerRemodelaciones();
        
        // Combinar con remodelaciones mock
        const todasLasRemodelaciones = [
          ...(Array.isArray(remodelacionesFromAPI) ? remodelacionesFromAPI : []),
          ...remodelacionesMock
        ];
        
        setItems(todasLasRemodelaciones);
      } catch (err) {
        console.log('No se pudieron cargar remodelaciones adicionales, usando solo mock');
        // Si hay error, usar solo las mock
        setItems(remodelacionesMock);
      } finally {
        setLoading(false);
      }
    };

    fetchRemodelaciones();
  }, []);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [page, setPage] = useState(0);

  // Keep page index in-range if items change dynamically
  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  // Scroll to top when page changes so upper side is visible
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  // Función para obtener la URL correcta de la imagen
  const getImageUrl = (imagenUrl: string | string[] | undefined): string => {
    // Si es undefined o vacío
    if (!imagenUrl) return '/placeholder-image.jpg';
    
    // Si es array, tomar la primera imagen
    const url = Array.isArray(imagenUrl) ? (imagenUrl[0] ?? '') : imagenUrl;
    
    if (!url) return '/placeholder-image.jpg';
    
    // Verificar si es una imagen mock conocida
    const mockImages = remodelacionesMock.flatMap(remodel => 
      Array.isArray(remodel.imagenUrl) ? remodel.imagenUrl : 
      remodel.imagenUrl ? [remodel.imagenUrl] : []
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

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const pageItems = items.slice(page * pageSize, page * pageSize + pageSize);

  const limitarDescripcion = (descripcion: string, maxCaracteres: number = 200) => {
    if (!descripcion) return '';
    if (descripcion.length <= maxCaracteres) return descripcion;
    const textoCortado = descripcion.substring(0, maxCaracteres - 3);
    const ultimoEspacio = textoCortado.lastIndexOf(' ');
    if (ultimoEspacio > maxCaracteres - 10) {
      return textoCortado.substring(0, ultimoEspacio) + '...';
    }
    return textoCortado + '...';
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

  if (total === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <p className="text-xl text-gray-600">{t('remodel.empty') || 'No hay remodelaciones disponibles.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#003153] mb-4 text-center mt-4">{t('services.list.renovations.title')}</h1>
        <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">{t('remodel.subtitle') || 'Conoce nuestras opciones de remodelación y paquetes.'}</p>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              aria-label={`Page ${i + 1}`}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full transition-colors ${i === page ? 'bg-[#003153]' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Cards stack */}
        <div className="space-y-6">
          {pageItems.map((r) => {
            const imagenUrl = getImageUrl(r.imagenUrl);
            
            return (
              <div key={r.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto bg-gray-100 overflow-hidden">
                    <img 
                      src={imagenUrl} 
                      alt={r.nombre} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-image.jpg';
                        e.currentTarget.alt = 'Imagen no disponible';
                      }}
                    />
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col">
                    <h3 className="text-2xl font-bold text-[#003153] mb-2">{r.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-4">{limitarDescripcion(r.descripcion || '')}</p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-sm text-gray-600">📌 {t('catalog.area') || 'm²'}</div>
                      <div className="text-2xl font-bold text-[#6B21A8]">
                        {new Intl.NumberFormat(undefined, { 
                          style: 'currency', 
                          currency: 'USD', 
                          maximumFractionDigits: 0 
                        }).format(r.precio || 0)}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <Link 
                        href={`/servicios/renovaciones/${r.id}`} 
                        className="bg-[#003153] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm"
                      >
                        {t('catalog.viewDetailsButton') || 'Ver Detalles'}
                      </Link>
                      <button
                        onClick={() => { 
                          setModalRemodel(r); 
                          setModalOpen(true); 
                          setFormValido(false); 
                        }}
                        className="text-sm bg-[#6B21A8] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        {t('remodel.buy') || 'Contactar'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 mt-8">
          <button
            onClick={goPrev}
            disabled={page === 0}
            className={`px-4 py-2 rounded-md min-w-24 ${page === 0 ? 'bg-gray-300 text-gray-500' : 'bg-[#003153] text-white hover:bg-blue-800'}`}>
            {t('catalog.previous') || 'Anterior'}
          </button>

          <div className="text-sm text-gray-600 whitespace-nowrap">
            {t('remodel.pageInfo', { page: page + 1, total: totalPages }) || `Página ${page + 1} de ${totalPages}`}
          </div>

          <button
            onClick={goNext}
            disabled={page === totalPages - 1}
            className={`px-4 py-2 rounded-md min-w-24 ${page === totalPages - 1 ? 'bg-gray-300 text-gray-500' : 'bg-[#003153] text-white hover:bg-blue-800'}`}>
            {t('catalog.next') || 'Siguiente'}
          </button>
        </div>
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
              <h3 className="text-2xl font-bold text-[#003153] mb-2">{t('propertyDetail.contactForm.title') || 'Formulario'}</h3>
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
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded bg-gray-200">
                {t('cancel') || 'Cancelar'}
              </button>
              <button
                onClick={() => {
                  if (formRef.current) {
                    // requestSubmit is preferred when available
                    // @ts-ignore
                    if (typeof formRef.current.requestSubmit === 'function') formRef.current.requestSubmit();
                    else formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                  }
                }}
                disabled={!formValido}
                className={`px-4 py-2 rounded text-white ${formValido ? 'bg-[#003153] hover:bg-blue-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                {t('accept') || 'Aceptar'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success toast */}
      {showSuccess && (
        <div role="status" className="fixed bottom-6 right-6 z-60 bg-green-600 text-white px-4 py-2 rounded shadow">
          {t('propertyDetail.contactForm.successMessage') || 'Operación realizada con éxito'}
        </div>
      )}
    </div>
  );
};

export default RemodelacionesCarousel;
"use client";

import React, { useState, useEffect } from 'react';
import { remodelaciones } from '@/src/data/remodelaciones';
import type { Remodelacion } from '@/src/Services/Remodelacion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export const RemodelacionesCarousel = () => {
  const { t } = useTranslation();
  const [indiceActual, setIndiceActual] = useState(0);
  const [direccion, setDireccion] = useState<'derecha' | 'izquierda'>('derecha');

  const total = remodelaciones.length;

  const limitarDescripcion = (descripcion: string, maxCaracteres: number = 120) => {
    if (!descripcion) return '';
    if (descripcion.length <= maxCaracteres) return descripcion;
    const textoCortado = descripcion.substring(0, maxCaracteres - 3);
    const ultimoEspacio = textoCortado.lastIndexOf(' ');
    if (ultimoEspacio > maxCaracteres - 10) {
      return textoCortado.substring(0, ultimoEspacio) + '...';
    }
    return textoCortado + '...';
  };

  const siguiente = () => {
    setDireccion('derecha');
    setIndiceActual((prev) => (prev + 1) % total);
  };

  const anterior = () => {
    setDireccion('izquierda');
    setIndiceActual((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (total <= 1) return;
    const intervalo = setInterval(() => {
      if (direccion === 'derecha') {
        if (indiceActual === total - 1) {
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
  }, [indiceActual, direccion, total]);

  const getIndicesVisibles = () => {
    if (total === 0) return [];
    if (total === 1) return [0];
    if (total === 2) return [indiceActual, (indiceActual + 1) % total];
    return [
      (indiceActual - 1 + total) % total,
      indiceActual,
      (indiceActual + 1) % total,
    ];
  };

  const indicesVisibles = getIndicesVisibles();

  if (total === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <p className="text-xl text-gray-600">{t('remodel.empty') || 'No hay remodelaciones disponibles.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#003153] mb-4 text-center mt-4">{t('services.list.renovations.title')}</h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">{t('remodel.subtitle') || 'Conoce nuestras opciones de remodelación y paquetes.'}</p>

        <div className="relative max-w-6xl mx-auto">
          {total > 1 && (
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

          <div className="flex items-center justify-center gap-4 px-12">
            {indicesVisibles.map((indice, posicion) => {
              const r = remodelaciones[indice];
              const esCentro = total > 2 ? posicion === 1 : posicion === 0;
              const descripcionLimitada = limitarDescripcion(r.descripcion || '');

              const baseCard = 'transition-all duration-500 ease-in-out w-[380px] h-[520px] flex-none';
              const scaleClass = esCentro ? 'scale-100 opacity-100 z-20' : 'scale-90 opacity-60 z-10';
              const shiftClass = posicion === 0 && total > 2 ? '-translate-x-2' : posicion === 2 && total > 2 ? 'translate-x-2' : '';
              const cardClasses = `${baseCard} ${scaleClass} ${shiftClass}`;

              return (
                <div
                  key={`${r.id}-${posicion}`}
                  className={`${cardClasses} cursor-pointer`}
                  onClick={() => {
                    // if this card isn't the focused one, make it focused
                    if (indiceActual !== indice) setIndiceActual(indice);
                  }}
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-full h-full flex flex-col">
                    <div className="h-64 bg-gray-100 overflow-hidden flex shrink-0">
                      {r.imagenUrl ? (
                        esCentro ? (
                          // When the card is focused/center, clicking the image should navigate to details
                          <Link href={`/servicios/renovaciones/${r.id}`} onClick={(e) => e.stopPropagation()}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={r.imagenUrl} alt={r.nombre} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                          </Link>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.imagenUrl} alt={r.nombre} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                      )}
                    </div>

                    <div className="p-6 grow flex flex-col">
                      <h3 className="text-xl font-bold text-[#003153] mb-3">{r.nombre}</h3>
                      <div className="mb-3 min-h-[60px]">
                        <p className="text-sm text-gray-600">{descripcionLimitada}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-auto text-[12px] text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>📌 {t('catalog.area') || 'm²'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl font-bold text-[#6B21A8]">{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(r.precio)}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                        <Link
                          href={`/servicios/renovaciones/${r.id}`}
                          className="bg-[#003153] text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t('catalog.viewDetailsButton') || 'Ver Detalles'}
                        </Link>
                        <button className="text-sm bg-[#6B21A8] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">{t('remodel.contact') || 'Contactar'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {total > 1 && (
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

        {total > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {remodelaciones.map((_, index) => (
              <button
                key={index}
                onClick={() => setIndiceActual(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === indiceActual ? 'bg-[#003153]' : 'bg-gray-300'}`}
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

export default RemodelacionesCarousel;

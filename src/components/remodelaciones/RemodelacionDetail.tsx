"use client";

import React from 'react';
import type { Remodelacion } from '@/src/Services/Remodelacion';
import { useTranslation } from 'react-i18next';

type Props = {
  remodelacion: Remodelacion;
};

export default function RemodelacionDetail({ remodelacion }: Props) {
  const { t } = useTranslation();

  const formatCurrency = (v: number) => {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(v);
    } catch (e) {
      return `$${v.toLocaleString()}`;
    }
  };

  const itemsTotal = (remodelacion.items || []).reduce((s, it) => s + (it.precio || 0) * (it.cantidad || 1), 0);

  return (
  <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#003153] mb-6">Descripción detallada del servicio</h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="md:flex gap-6">
            <div className="md:w-1/3 h-56 bg-gray-100 rounded overflow-hidden mb-4 md:mb-0">
              {remodelacion.imagenUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={remodelacion.imagenUrl} alt={remodelacion.nombre} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
              )}
            </div>

            <div className="md:flex-1">
              <h2 className="text-2xl font-semibold text-[#003153]">{remodelacion.nombre}</h2>
              <p className="text-gray-600 mt-2">{remodelacion.descripcion}</p>

              {remodelacion.descripcionDetallada && (
                <div className="mt-4 text-gray-700">
                  <h3 className="font-medium text-[#003153]">Detalle</h3>
                  <p className="mt-2 text-sm">{remodelacion.descripcionDetallada}</p>
                </div>
              )}

              <div className="mt-4">
                <span className="text-2xl font-bold text-[#6B21A8]">{formatCurrency(remodelacion.precio || itemsTotal)}</span>
                <span className="text-sm text-gray-500 ml-2">{t('catalog.price') || 'Precio'}</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#003153] mb-4">{t('remodel.itemsTitle') || 'Items incluidos'}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(remodelacion.items || []).map((it) => (
            <div key={it.id} className="bg-white rounded-lg shadow p-4">
              <div className="h-36 bg-gray-100 rounded overflow-hidden mb-3">
                {it.imagenUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.imagenUrl} alt={it.nombre} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>

              <h4 className="font-semibold text-[#003153]">{it.nombre}</h4>
              <p className="text-sm text-gray-600 mt-1">{it.descripcion}</p>

              <div className="mt-3 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  {formatCurrency(it.precio || 0)} {"/unit"}
                </div>
                <div className="text-sm font-medium text-gray-800">x{it.cantidad}</div>
              </div>

              <div className="mt-2 text-right text-sm text-gray-600">
                {t('remodel.itemTotal') || 'Total:'} {formatCurrency((it.precio || 0) * (it.cantidad || 1))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

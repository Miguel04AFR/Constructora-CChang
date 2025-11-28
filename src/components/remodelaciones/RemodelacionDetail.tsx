"use client";

import React, { useState, useEffect, useRef } from 'react';
import type { Remodelacion } from '@/src/Services/Remodelacion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/src/contexts/AuthContext';
import { ModalLoginIni } from '@/src/components/ui/ModalLoginIni';
import { FormularioRemodelaciones } from '@/src/components/remodelaciones/FormularioRemodelaciones';

type Props = {
  remodelacion: Remodelacion;
};

export default function RemodelacionDetail({ remodelacion }: Props) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalContactoOpen, setModalContactoOpen] = useState(false);
  const pendingRef = useRef<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (isAuthenticated && pendingRef.current) {
      pendingRef.current = false;
      setModalContactoOpen(true);
    }
  }, [isAuthenticated]);

  const formatCurrency = (v: number) => {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(v);
    } catch (e) {
      return `$${v.toLocaleString()}`;
    }
  };

  
  // items are strings with format: "Name : Description"
  const parseItemString = (itemStr: string) => {
    if (!itemStr) return { name: '', description: '' };
    const idx = itemStr.indexOf(':');
    if (idx === -1) return { name: itemStr.trim(), description: '' };
    const name = itemStr.slice(0, idx).trim();
    const description = itemStr.slice(idx + 1).trim();
    return { name, description };
  };

  return (
  <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#003153] mb-6">Descripción detallada del servicio</h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="md:flex gap-6">
            <div className="md:w-1/3 mb-4 md:mb-0 flex flex-col gap-4">
              <div className="h-56 bg-gray-100 rounded overflow-hidden">
                {remodelacion.imagenUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={remodelacion.imagenUrl} alt={remodelacion.nombre} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>
              <div>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      pendingRef.current = true;
                      setModalLoginOpen(true);
                      return;
                    }
                    setModalContactoOpen(true);
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-[#6B21A8] text-white hover:bg-purple-800 transition-colors text-sm"
                >
                  {t('remodel.buy') || 'Contactar'}
                </button>
              </div>
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
                <span className="text-2xl font-bold text-[#6B21A8]">{formatCurrency(remodelacion.precio)}</span>
                <span className="text-sm text-gray-500 ml-2">{t('catalog.price') || 'Precio'}</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#003153] mb-4">{t('remodel.itemsTitle') || 'Items incluidos'}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(remodelacion.items || []).map((it, idx) => {
            const parsed = parseItemString(it);
            return (
              <div key={`${remodelacion.id}-item-${idx}`} className="bg-white rounded-lg shadow p-4">
                <h4 className="font-semibold text-[#003153]">{parsed.name}</h4>
                <p className="text-sm text-gray-600 mt-2">{parsed.description}</p>
              </div>
            );
          })}
        </div>
        {/* Contact modal */}
        {modalContactoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-40" onClick={() => setModalContactoOpen(false)} />
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 z-10 max-h-[90vh] overflow-y-auto">
              <button
                aria-label={t('common.close') || 'Cerrar'}
                onClick={() => setModalContactoOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center z-20"
              >
                ×
              </button>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#003153] mb-4">{t('propertyDetail.contactForm.title') || 'Contactar sobre remodelación'}</h3>
                <FormularioRemodelaciones
                  propiedad={{ nombre: remodelacion.nombre }}
                  formRef={formRef}
                  onValChange={() => {}}
                  onSubmitSuccess={() => setModalContactoOpen(false)}
                  hideSubmit={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal Login */}
        <ModalLoginIni
          isOpen={modalLoginOpen}
          onClose={() => {
            setModalLoginOpen(false);
            pendingRef.current = false;
          }}
          onLoginSuccess={() => {
            setModalLoginOpen(false);
            // The effect watching isAuthenticated will open the contact modal if pendingRef is true
          }}
        />
      </div>
    </div>
  );
}

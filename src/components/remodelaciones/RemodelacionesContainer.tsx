"use client";

import React from 'react';
import { remodelaciones } from '@/src/data/remodelaciones';
import type { Remodelacion } from '@/src/Services/Remodelacion';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export const RemodelacionesContainer = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const formatCurrency = (value: number) => {
        try {
            return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);
        } catch (e) {
            return `$${value.toLocaleString()}`;
        }
    };

    const computeItemsTotal = (items: { precio?: number; cantidad?: number }[] = []) =>
        items.reduce((sum, it) => sum + (it.precio || 0) * (it.cantidad || 1), 0);

    if (remodelaciones.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
                <p className="text-xl text-gray-600">{t('remodel.empty') || 'No hay remodelaciones disponibles.'}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-[#003153] mb-4 text-center mt-4">
                    {t('services.list.renovations.title')}
                </h1>
                <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    {t('remodel.subtitle') || 'Conoce nuestras opciones de remodelación y paquetes.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {remodelaciones.map((r: Remodelacion) => {
                        const itemsTotal = computeItemsTotal(r.items || []);
                        const displayTotal = itemsTotal > 0 ? itemsTotal : r.precio;

                        return (
                        <div key={r.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="h-44 bg-gray-100 mb-4 overflow-hidden rounded">
                                {r.imagenUrl ? (
                                    <img src={r.imagenUrl} alt={r.nombre} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-[#003153] mb-2">{r.nombre}</h3>
                            <p className="text-gray-600 mb-4 text-sm">{r.descripcion}</p>

                            <div className="mb-4">
                                <span className="text-2xl font-bold text-[#6B21A8]">{formatCurrency(displayTotal)}</span>
                            </div>

                            <details className="mb-4 text-sm text-gray-700">
                                <summary className="cursor-pointer font-medium">{t('remodel.itemsTitle') || 'Incluye'}</summary>
                                <ul className="mt-2 space-y-2">
                                    {r.items.map((it) => (
                                        <li key={it.id} className="border-l-2 border-gray-200 pl-3">
                                            <div className="flex justify-between">
                                                <span className="font-medium">{it.nombre} x{it.cantidad}</span>
                                                <span className="text-gray-600">{formatCurrency(it.precio || 0)} /unit — {formatCurrency((it.precio || 0) * (it.cantidad || 1))}</span>
                                            </div>
                                            {it.descripcion && <p className="text-xs text-gray-500">{it.descripcion}</p>}
                                        </li>
                                    ))}
                                </ul>
                            </details>

                                                        <div className="flex justify-between items-center">
                                                                <button
                                                                    onClick={() => {
                                                                        const path = `/servicios/renovaciones/${encodeURIComponent(String(r.id))}`;
                                                                        // debug log in browser console to help trace empty id issues
                                                                        // eslint-disable-next-line no-console
                                                                        console.log('navegando a', path);
                                                                        router.push(path);
                                                                    }}
                                                                    className="text-sm bg-[#003153] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                                                                >
                                                                    {t('remodel.viewDetails') || 'Ver detalles'}
                                                                </button>
                                <button className="text-sm bg-[#6B21A8] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                                    {t('remodel.contact') || 'Contactar'}
                                </button>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default RemodelacionesContainer;

"use client";

import React, { useState, useEffect } from 'react';
import { remodelaciones } from '@/src/data/remodelaciones';
import type { Remodelacion } from '@/src/Services/Remodelacion';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/src/contexts/AuthContext';
import { ModalLoginIni } from '@/src/components/ui/ModalLoginIni';
import { FormularioContacto } from '@/src/components/componentes catalogo/FormularioDeContacto';

export const RemodelacionesContainer = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isAuthenticated, user } = useAuth(); // Usar directamente el contexto
    
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const [modalContactoOpen, setModalContactoOpen] = useState(false);
    const [remodelacionSeleccionada, setRemodelacionSeleccionada] = useState<Remodelacion | null>(null);
    const [remodelacionPendiente, setRemodelacionPendiente] = useState<Remodelacion | null>(null);
    const remodelacionPendienteRef = React.useRef<Remodelacion | null>(null);
    const formRef = React.useRef<HTMLFormElement>(null);
    const [formValido, setFormValido] = useState(false);

    // Sincronizar la referencia con el estado
    React.useEffect(() => {
        remodelacionPendienteRef.current = remodelacionPendiente;
    }, [remodelacionPendiente]);

    // Efecto para abrir el formulario automáticamente cuando el usuario se autentica
    // y hay una remodelación pendiente
    useEffect(() => {
        if (isAuthenticated && remodelacionPendiente && !modalContactoOpen) {
            setRemodelacionSeleccionada(remodelacionPendiente);
            setModalContactoOpen(true);
            setRemodelacionPendiente(null);
        }
    }, [isAuthenticated, remodelacionPendiente, modalContactoOpen]);

    const formatCurrency = (value: number) => {
        try {
            return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);
        } catch (e) {
            return `$${value.toLocaleString()}`;
        }
    };

    // Items are strings with format: "Name : Description"
    const parseItemString = (itemStr: string) => {
        if (!itemStr) return { name: '', description: '' };
        // split on first ':' to allow ':' inside the description
        const idx = itemStr.indexOf(':');
        if (idx === -1) {
            return { name: itemStr.trim(), description: '' };
        }
        const name = itemStr.slice(0, idx).trim();
        const description = itemStr.slice(idx + 1).trim();
        return { name, description };
    };

    const handleContactarClick = (remodelacion: Remodelacion) => {
        if (!isAuthenticated) {
            // Guardar la remodelación que el usuario quiere contactar
            setRemodelacionPendiente(remodelacion);
            remodelacionPendienteRef.current = remodelacion;
            setModalLoginOpen(true);
            return;
        }
        
        setRemodelacionSeleccionada(remodelacion);
        setModalContactoOpen(true);
    };

    const handleLoginSuccess = () => {
        // Esperar un momento para que el estado de autenticación se actualice
        // Usar la referencia para obtener el valor actual
        const checkAndOpen = () => {
            const currentAuth = localStorage.getItem('user');
            const pendingRemodelacion = remodelacionPendienteRef.current;
            // Si hay una remodelación pendiente, abrir el formulario
            if (pendingRemodelacion && currentAuth) {
                setRemodelacionSeleccionada(pendingRemodelacion);
                setModalContactoOpen(true);
                setRemodelacionPendiente(null);
                remodelacionPendienteRef.current = null;
            }
        };
        // Intentar después de un pequeño delay para asegurar que el estado se haya actualizado
        setTimeout(checkAndOpen, 300);
    };

    const handleEnvioExitoso = () => {
        setModalContactoOpen(false);
        setRemodelacionSeleccionada(null);
    };

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

                {/* Estado de autenticación visible */}
                <div className={`mb-4 p-3 rounded text-center text-sm ${
                    isAuthenticated 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}>
                    {isAuthenticated 
                        ? '✅ Estás autenticado - Puedes contactar' 
                        : '🔒 Inicia sesión para contactar sobre remodelaciones'
                    }
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {remodelaciones.map((r: Remodelacion) => {
                        const displayTotal = r.precio;

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
                                    {(r.accesorios || []).map((it, idx) => {
                                        const parsed = parseItemString(it);
                                        return (
                                            <li key={`${r.id}-item-${idx}`} className="border-l-2 border-gray-200 pl-3">
                                                <div className="font-medium text-sm text-[#003153]">{parsed.name}</div>
                                                {parsed.description && <p className="text-xs text-gray-500 mt-1">{parsed.description}</p>}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </details>

                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => {
                                        const path = `/servicios/renovaciones/${encodeURIComponent(String(r.id))}`;
                                        router.push(path);
                                    }}
                                    className="text-sm bg-[#003153] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                                >
                                    {t('remodel.viewDetails') || 'Ver detalles'}
                                </button>
                                
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleContactarClick(r);
                                    }}
                                    className={`text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                                        isAuthenticated
                                            ? 'bg-[#6B21A8] text-white hover:bg-purple-800'
                                            : 'bg-[#003153] text-white hover:bg-blue-800'
                                    }`}
                                    type="button"
                                >
                                    {t('remodel.buy') || 'Contactar'}
                                </button>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>

            {/* Modal de Login */}
            <ModalLoginIni 
                isOpen={modalLoginOpen}
                onClose={() => {
                    setModalLoginOpen(false);
                    // Limpiar la remodelación pendiente si se cierra el modal sin login
                    setRemodelacionPendiente(null);
                }}
                onLoginSuccess={handleLoginSuccess}
            />

            {/* Modal de Formulario de Contacto */}
            {modalContactoOpen && remodelacionSeleccionada && (
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
                            <h3 className="text-2xl font-bold text-[#003153] mb-4">
                                {t('propertyDetail.contactForm.title') || 'Contactar sobre remodelación'}
                            </h3>
                            
                            <FormularioContacto
                                propiedad={{ nombre: remodelacionSeleccionada.nombre }}
                                formRef={formRef}
                                onValChange={setFormValido}
                                onSubmitSuccess={handleEnvioExitoso}
                                hideSubmit={false}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RemodelacionesContainer;
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/src/contexts/AuthContext';
import { ModalLoginIni } from '@/src/components/ui/ModalLoginIni';
import type { Casa } from '@/src/Services/Casa';

interface FormularioContactoProps {
    propiedad: Casa | { nombre: string };
    formRef?: React.Ref<HTMLFormElement>;
    onValChange?: (valid: boolean) => void;
    onSubmitSuccess?: () => void;
    hideSubmit?: boolean;
}

export const FormularioContacto: React.FC<FormularioContactoProps> = ({ propiedad, formRef, onValChange, onSubmitSuccess, hideSubmit = false }) => {
    const { t } = useTranslation();
    const { isAuthenticated } = useAuth();
    const [modalLoginOpen, setModalLoginOpen] = useState(false);
    const formDataPendienteRef = useRef<any | null>(null);

    const initialData = { nombre: '', email: '', telefono: '', mensaje: '' };
    const [formData, setFormData] = useState<any>(initialData);
    const [errores, setErrores] = useState<any>({});
    const [mostrarMensajeErrores, setMostrarMensajeErrores] = useState(false);
    const [formularioValido, setFormularioValido] = useState(false);
    const [camposTocados, setCamposTocados] = useState<{ [key: string]: boolean }>({});
    const [mensajeEnviado, setMensajeEnviado] = useState(false);

    useEffect(() => {
        const valid = Object.keys(errores).length === 0;
        setFormularioValido(valid);
        if (onValChange) onValChange(valid);
    }, [errores, onValChange]);

    useEffect(() => {
        if (isAuthenticated && formDataPendienteRef.current) {
            const pending = formDataPendienteRef.current;
            formDataPendienteRef.current = null;
            enviarFormulario(pending);
        }
    }, [isAuthenticated]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let valorFiltrado = value;
        if (name === 'nombre') {
            valorFiltrado = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
            if (valorFiltrado.length > 50) valorFiltrado = valorFiltrado.slice(0, 50);
        } else if (name === 'telefono') {
            valorFiltrado = value.replace(/[^0-9]/g, '');
            if (valorFiltrado.length > 8) valorFiltrado = valorFiltrado.slice(0, 8);
        }

        setFormData((prev: any) => ({ ...prev, [name]: valorFiltrado }));
        if (!camposTocados[name]) setCamposTocados(prev => ({ ...prev, [name]: true }));
        validarCampoIndividual(name, valorFiltrado);
    };

    const validarCampoIndividual = (name: string, value: string) => {
        const nuevosErrores = { ...errores };

        switch (name) {
            case 'nombre':
                if (!value.trim()) nuevosErrores.nombre = t('form.errors.nameRequired') || 'Nombre requerido';
                else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(value)) nuevosErrores.nombre = t('form.errors.nameInvalid') || 'Nombre inválido';
                else delete nuevosErrores.nombre;
                break;
            case 'telefono':
                if (value.trim() && !/^[0-9]{8}$/.test(value)) nuevosErrores.telefono = t('form.errors.phoneInvalid') || 'Teléfono inválido';
                else delete nuevosErrores.telefono;
                break;
            case 'email':
                if (!value.trim()) nuevosErrores.email = t('form.errors.emailRequired') || 'Email requerido';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) nuevosErrores.email = t('form.errors.emailInvalid') || 'Email inválido';
                else delete nuevosErrores.email;
                break;
            case 'mensaje':
                if (!value.trim()) nuevosErrores.mensaje = t('form.errors.messageRequired') || 'Mensaje requerido';
                else if (value.trim().length < 10) nuevosErrores.mensaje = t('form.errors.messageMinLength') || 'Mensaje muy corto';
                else if (value.trim().length > 500) nuevosErrores.mensaje = t('form.errors.messageMaxLength') || 'Mensaje muy largo';
                else delete nuevosErrores.mensaje;
                break;
        }

        setErrores(nuevosErrores);
    };

    const validarFormularioCompleto = () => {
        const nuevosErrores: any = {};
        if (!formData.nombre || !formData.nombre.trim()) nuevosErrores.nombre = t('form.errors.nameRequired') || 'Nombre requerido';
        else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(formData.nombre)) nuevosErrores.nombre = t('form.errors.nameInvalid') || 'Nombre inválido';

        if (formData.telefono && !/^[0-9]{8}$/.test(formData.telefono)) nuevosErrores.telefono = t('form.errors.phoneInvalid') || 'Teléfono inválido';

        if (!formData.email || !formData.email.trim()) nuevosErrores.email = t('form.errors.emailRequired') || 'Email requerido';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nuevosErrores.email = t('form.errors.emailInvalid') || 'Email inválido';

        if (!formData.mensaje || !formData.mensaje.trim()) nuevosErrores.mensaje = t('form.errors.messageRequired') || 'Mensaje requerido';
        else if (formData.mensaje.trim().length < 10) nuevosErrores.mensaje = t('form.errors.messageMinLength') || 'Mensaje muy corto';
        else if (formData.mensaje.trim().length > 500) nuevosErrores.mensaje = t('form.errors.messageMaxLength') || 'Mensaje muy largo';

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const getInputClass = (campo: string, valor: string) => {
        const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200";
        const fueTocado = camposTocados[campo];
        const tieneError = errores[campo];
        const tieneValor = valor && valor.trim() !== '';

        let estadoClase = '';
        if (fueTocado && tieneError) estadoClase = 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50';
        else if (fueTocado && !tieneError && tieneValor) estadoClase = 'border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50';
        else estadoClase = 'border-gray-300 focus:ring-[#003153] focus:border-transparent';

        return `${baseClasses} ${estadoClase}`;
    };

    const handleLoginSuccess = () => {
        const checkAndSubmit = () => {
            const currentAuth = localStorage.getItem('user');
            const pendingData = formDataPendienteRef.current;
            if (pendingData && currentAuth) {
                enviarFormulario(pendingData);
                formDataPendienteRef.current = null;
            }
        };
        setTimeout(checkAndSubmit, 300);
    };

    const enviarFormulario = (datos: any) => {
        setMensajeEnviado(true);
        setMostrarMensajeErrores(false);

        // TODO: enviar al servidor o manejar el envío según el proyecto

        // Limpiar
        setFormData(initialData);
        setErrores({});
        setCamposTocados({});

        if (onSubmitSuccess) onSubmitSuccess();

        setTimeout(() => setMensajeEnviado(false), 5000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const campos = Object.keys(initialData).reduce((acc: any, k: string) => ({ ...acc, [k]: true }), {});
        setCamposTocados(campos);

        if (!validarFormularioCompleto()) {
            setMostrarMensajeErrores(true);
            const primerError = document.querySelector('.border-red-500');
            if (primerError) (primerError as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (!isAuthenticated) {
            formDataPendienteRef.current = { ...formData };
            setModalLoginOpen(true);
            return;
        }

        enviarFormulario(formData);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#003153] mb-4">{t('propertyDetail.contactForm.title') || 'Formulario'}</h2>

            {mensajeEnviado && (
                <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm'>
                    {t('propertyDetail.contactForm.successMessage') || 'Mensaje enviado'}
                </div>
            )}

            {mostrarMensajeErrores && !formularioValido && (
                <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm'>
                    {t('propertyDetail.contactForm.errorMessage') || 'Corrige los errores'}
                </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">{t('form.name') || 'Nombre'} *</label>
                        <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className={getInputClass('nombre', formData.nombre)} placeholder={t('form.placeholderName') || ''} required />
                        {errores.nombre && camposTocados.nombre && (<p className="mt-1 text-sm text-red-600">{errores.nombre}</p>)}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('form.email') || 'Email'} *</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={getInputClass('email', formData.email)} placeholder={t('form.placeholderEmail') || ''} required />
                        {errores.email && camposTocados.email && (<p className="mt-1 text-sm text-red-600">{errores.email}</p>)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">{t('form.phone') || 'Teléfono'}</label>
                        <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className={getInputClass('telefono', formData.telefono)} placeholder={t('form.placeholderPhone') || ''} />
                        {errores.telefono && camposTocados.telefono && (<p className="mt-1 text-sm text-red-600">{errores.telefono}</p>)}
                    </div>
                    <div></div>
                </div>

                <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">{t('propertyDetail.contactForm.message') || 'Mensaje'} *</label>
                    <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} rows={4} className={`${getInputClass('mensaje', formData.mensaje)} resize-none`} placeholder={t('propertyDetail.contactForm.placeholderMessage', { propertyName: propiedad?.nombre || '' }) || ''} required />
                    {errores.mensaje && camposTocados.mensaje && (<p className="mt-1 text-sm text-red-600">{errores.mensaje}</p>)}
                    <div className="mt-1 text-xs text-gray-500 text-right">{formData.mensaje.length}/500</div>
                </div>

                {!hideSubmit && (
                    <button type="submit" disabled={!formularioValido} className={`w-full py-3 px-4 rounded-md transition-colors font-medium ${formularioValido ? 'bg-[#003153] text-white hover:bg-blue-800 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                        {formularioValido ? (t('propertyDetail.contactForm.send') || 'Enviar') : (t('propertyDetail.contactForm.completeFields') || 'Completa los campos')}
                    </button>
                )}

                <p className="text-xs text-gray-500 text-center">* {t('propertyDetail.contactForm.requiredFields') || 'Campos requeridos'}</p>
            </form>

            <ModalLoginIni isOpen={modalLoginOpen} onClose={() => { setModalLoginOpen(false); formDataPendienteRef.current = null; }} onLoginSuccess={handleLoginSuccess} />
        </div>
    );
};

export default FormularioContacto;
"use client";

import React, { useState, useEffect } from 'react';
import type { Casa } from '@/src/Services/Casa';
import { useTranslation } from 'react-i18next';

interface FormularioContactoProps {
    propiedad: Casa;
}

type CamposFormulario = 'nombre' | 'email' | 'telefono' | 'mensaje';

interface ErroresFormulario {
    nombre?: string;
    email?: string;
    telefono?: string;
    mensaje?: string;
}

export const FormularioContacto: React.FC<FormularioContactoProps> = ({ propiedad }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

    const [errores, setErrores] = useState<ErroresFormulario>({});
    const [mostrarMensajeErrores, setMostrarMensajeErrores] = useState(false);
    const [formularioValido, setFormularioValido] = useState(false);
    const [camposTocados, setCamposTocados] = useState<{ [key in CamposFormulario]?: boolean }>({});
    const [mensajeEnviado, setMensajeEnviado] = useState(false);

    const { t } = useTranslation();

    // Efecto para verificar la validez del formulario cuando cambien los errores
    useEffect(() => {
        setFormularioValido(Object.keys(errores).length === 0);
    }, [errores]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const campo = name as CamposFormulario;

        let valorFiltrado = value;
        if (campo === 'nombre') {
            valorFiltrado = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
            if (valorFiltrado.length > 50) {
                valorFiltrado = valorFiltrado.slice(0, 50);
            }
        } else if (campo === 'telefono') {
            valorFiltrado = value.replace(/[^0-9]/g, '');
            if (valorFiltrado.length > 8) {
                valorFiltrado = valorFiltrado.slice(0, 8);
            }
        }

        setFormData(prev => ({
            ...prev,
            [campo]: valorFiltrado,
        }));

        // Marcar el campo como tocado
        if (!camposTocados[campo]) {
            setCamposTocados(prev => ({
                ...prev,
                [campo]: true
            }));
        }

        // Validar el campo individual
        validarCampoIndividual(campo, valorFiltrado);
    };

    const validarCampoIndividual = (campo: CamposFormulario, value: string) => {
        const nuevosErrores = { ...errores };

        switch (campo) {
            case 'nombre':
                if (!value.trim()) {
                    nuevosErrores.nombre = t('propertyDetail.contactForm.errors.nameRequired');
                } else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(value)) {
                    nuevosErrores.nombre = t('propertyDetail.contactForm.errors.nameInvalid');
                } else {
                    delete nuevosErrores.nombre;
                }
                break;

            case 'telefono':
                if (value.trim() && !/^[0-9]{8}$/.test(value)) {
                    nuevosErrores.telefono = t('propertyDetail.contactForm.errors.phoneInvalid');
                } else {
                    delete nuevosErrores.telefono;
                }
                break;

            case 'email':
                if (!value.trim()) {
                    nuevosErrores.email = t('propertyDetail.contactForm.errors.emailRequired');
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    nuevosErrores.email = t('propertyDetail.contactForm.errors.emailInvalid');
                } else {
                    delete nuevosErrores.email;
                }
                break;

            case 'mensaje':
                if (!value.trim()) {
                    nuevosErrores.mensaje = t('propertyDetail.contactForm.errors.messageRequired');
                } else if (value.trim().length < 10) {
                    nuevosErrores.mensaje = t('propertyDetail.contactForm.errors.messageMinLength');
                } else if (value.trim().length > 500) {
                    nuevosErrores.mensaje = t('propertyDetail.contactForm.errors.messageMaxLength');
                } else {
                    delete nuevosErrores.mensaje;
                }
                break;
        }

        setErrores(nuevosErrores);
    };

    const validarFormularioCompleto = () => {
        const nuevosErrores: ErroresFormulario = {};

        if (!formData.nombre.trim()) {
            nuevosErrores.nombre = t('propertyDetail.contactForm.errors.nameRequired');
        } else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(formData.nombre)) {
            nuevosErrores.nombre = t('propertyDetail.contactForm.errors.nameInvalid');
        }

        if (formData.telefono.trim() && !/^[0-9]{8}$/.test(formData.telefono)) {
            nuevosErrores.telefono = t('propertyDetail.contactForm.errors.phoneInvalid');
        }

        if (!formData.email.trim()) {
            nuevosErrores.email = t('propertyDetail.contactForm.errors.emailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            nuevosErrores.email = t('propertyDetail.contactForm.errors.emailInvalid');
        }

        if (!formData.mensaje.trim()) {
            nuevosErrores.mensaje = t('propertyDetail.contactForm.errors.messageRequired');
        } else if (formData.mensaje.trim().length < 10) {
            nuevosErrores.mensaje = t('propertyDetail.contactForm.errors.messageMinLength');
        } else if (formData.mensaje.trim().length > 500) {
            nuevosErrores.mensaje = t('propertyDetail.contactForm.errors.messageMaxLength');
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Función para determinar la clase del input
    const getInputClass = (campo: CamposFormulario, valor: string) => {
        const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200";
    const fueTocado = camposTocados[campo];
    const tieneError = errores[campo as keyof ErroresFormulario];
        const tieneValor = valor.trim() !== '';

        let estadoClase = '';
        if (fueTocado && tieneError) {
            estadoClase = 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50';
        } else if (fueTocado && !tieneError && tieneValor) {
            estadoClase = 'border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50';
        } else {
            estadoClase = 'border-gray-300 focus:ring-[#003153] focus:border-transparent';
        }

        return `${baseClasses} ${estadoClase}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Marcar todos los campos como tocados al enviar
        const todosLosCamposTocados: { [key in CamposFormulario]: boolean } = {
            nombre: true,
            telefono: true,
            email: true,
            mensaje: true
        };
        setCamposTocados(todosLosCamposTocados);

        if (validarFormularioCompleto()) {
            setMensajeEnviado(true);
            setMostrarMensajeErrores(false);
            
            // Aquí iría la lógica para enviar el formulario
            console.log('Formulario enviado:', formData);
            
            // Limpiar formulario
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                mensaje: ''
            });
            setErrores({});
            setCamposTocados({});
        } else {
            setMostrarMensajeErrores(true);
            // Scroll al primer error
            const primerError = document.querySelector('.border-red-500');
            if (primerError) {
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        setTimeout(() => {
            setMensajeEnviado(false);
        }, 5000);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#003153] mb-4">
                {t('propertyDetail.contactForm.title')}
            </h2>

            {mensajeEnviado && (
                <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm'>
                    {t('propertyDetail.contactForm.successMessage')}
                </div>
            )}

            {mostrarMensajeErrores && !formularioValido && (
                <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm'>
                    {t('propertyDetail.contactForm.errorMessage')}
                </div>
            )}
      
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Nombre */}
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('propertyDetail.contactForm.name')} *
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={getInputClass('nombre', formData.nombre)}
                        placeholder={t('propertyDetail.contactForm.placeholderName')}
                        required
                    />
                    {errores.nombre && camposTocados.nombre && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.nombre}
                        </p>
                    )}
                </div>

                {/* Campo Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('propertyDetail.contactForm.email')} *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={getInputClass('email', formData.email)}
                        placeholder={t('propertyDetail.contactForm.placeholderEmail')}
                        required
                    />
                    {errores.email && camposTocados.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.email}
                        </p>
                    )}
                </div>

                {/* Campo Teléfono */}
                <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('propertyDetail.contactForm.phone')}
                    </label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className={getInputClass('telefono', formData.telefono)}
                        placeholder={t('propertyDetail.contactForm.placeholderPhone')}
                    />
                    {errores.telefono && camposTocados.telefono && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.telefono}
                        </p>
                    )}
                </div>

                {/* Campo Mensaje */}
                <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('propertyDetail.contactForm.message')} *
                    </label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows={4}
                        className={getInputClass('mensaje', formData.mensaje)}
                        placeholder={t('propertyDetail.contactForm.placeholderMessage', { propertyName: propiedad.nombre })}
                        required
                    />
                    {errores.mensaje && camposTocados.mensaje && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.mensaje}
                        </p>
                    )}
                    <div className="mt-1 text-xs text-gray-500 text-right">
                        {formData.mensaje.length}/500 {t('propertyDetail.contactForm.characters')}
                    </div>
                </div>

                {/* Botón de enviar */}
                <button
                    type="submit"
                    disabled={!formularioValido}
                    className={`w-full py-3 px-4 rounded-md transition-colors font-medium ${
                        formularioValido
                            ? 'bg-[#003153] text-white hover:bg-blue-800 cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {formularioValido ? t('propertyDetail.contactForm.send') : t('propertyDetail.contactForm.completeFields')}
                </button>

                {/* Leyenda de campos requeridos */}
                <p className="text-xs text-gray-500 text-center">
                    * {t('propertyDetail.contactForm.requiredFields')}
                </p>
            </form>
        </div>
    );
};
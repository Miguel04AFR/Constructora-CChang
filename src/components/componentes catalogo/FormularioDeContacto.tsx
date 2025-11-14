"use client";

import React, { useState } from 'react';
import type { Casa } from '@/src/components/index';
import { useTranslation } from 'react-i18next';

interface FormularioContactoProps {
    propiedad: Casa;
}
interface ErroresFormulario {
    nombre?: string;
    email?: string;
    telefono?: string;
    mensaje?: string;
}

interface CampoValido {
    nombre: boolean;
    email: boolean;
    telefono: boolean;
    mensaje: boolean;
}

export const FormularioContacto: React.FC<FormularioContactoProps> = ({ propiedad }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

    const [errores, setErrores] = useState<ErroresFormulario>({});
    const [campoValido, setCampoValido] = useState<CampoValido>({
        nombre: false,
        email: false,
        telefono: true, // Teléfono es opcional, por defecto válido
        mensaje: false
    });
    const [campoTocado, setCampoTocado] = useState<CampoValido>({
        nombre: false,
        email: false,
        telefono: false,
        mensaje: false
    });

    const { t } = useTranslation();

    const validarCampo = (nombre: string, valor: string): string => {
        switch (nombre) {
            case 'nombre':
                if (!valor.trim()) {
                    return t('propertyDetail.contactForm.errors.nameRequired');
                }
                if (valor.trim().length < 2) {
                    return t('propertyDetail.contactForm.errors.nameMinLength');
                }
                if (valor.trim().length > 50) {
                    return t('propertyDetail.contactForm.errors.nameMaxLength');
                }
                if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(valor)) {
                    return t('propertyDetail.contactForm.errors.nameInvalid');
                }
                return '';

            case 'email':
                if (!valor.trim()) {
                    return t('propertyDetail.contactForm.errors.emailRequired');
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                    return t('propertyDetail.contactForm.errors.emailInvalid');
                }
                return '';

            case 'telefono':
                if (valor.trim() && !/^[0-9]{8}$/.test(valor.trim())) {
                    return t('propertyDetail.contactForm.errors.phoneInvalid');
                }
                return '';

            case 'mensaje':
                if (!valor.trim()) {
                    return t('propertyDetail.contactForm.errors.messageRequired');
                }
                if (valor.trim().length < 10) {
                    return t('propertyDetail.contactForm.errors.messageMinLength');
                }
                if (valor.trim().length > 500) {
                    return t('propertyDetail.contactForm.errors.messageMaxLength');
                }
                return '';

            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (campoTocado[name as keyof CampoValido]) {
            const error = validarCampo(name, value);
            setErrores(prev => ({
                ...prev,
                [name]: error
            }));
            setCampoValido(prev => ({
                ...prev,
                [name]: !error
            }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setCampoTocado(prev => ({
            ...prev,
            [name]: true
        }));

        const error = validarCampo(name, value);
        setErrores(prev => ({
            ...prev,
            [name]: error
        }));
        setCampoValido(prev => ({
            ...prev,
            [name]: !error
        }));
    };

    const getInputClasses = (campo: string) => {
        const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200";
        const hasError = errores[campo as keyof ErroresFormulario] && campoTocado[campo as keyof CampoValido];
        const isValid = campoValido[campo as keyof CampoValido] && campoTocado[campo as keyof CampoValido];
        
        if (hasError) {
            return `${baseClasses} border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50`;
        } else if (isValid) {
            return `${baseClasses} border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-50`;
        } else {
            return `${baseClasses} border-gray-300 focus:ring-[#003153] focus:border-transparent`;
        }
    };

    const validarFormularioCompleto = (): boolean => {
        const nuevosErrores: ErroresFormulario = {};
        const nuevosCampoTocados: CampoValido = {
            nombre: true,
            email: true,
            telefono: true,
            mensaje: true
        };

        nuevosErrores.nombre = validarCampo('nombre', formData.nombre);
        nuevosErrores.email = validarCampo('email', formData.email);
        nuevosErrores.telefono = validarCampo('telefono', formData.telefono);
        nuevosErrores.mensaje = validarCampo('mensaje', formData.mensaje);

        setErrores(nuevosErrores);
        setCampoTocado(nuevosCampoTocados);
        setCampoValido({
            nombre: !nuevosErrores.nombre,
            email: !nuevosErrores.email,
            telefono: !nuevosErrores.telefono,
            mensaje: !nuevosErrores.mensaje
        });

        return !Object.values(nuevosErrores).some(error => error !== '');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validarFormularioCompleto()) {
            // Scroll al primer error
            const primerError = document.querySelector('.border-red-500');
            if (primerError) {
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Aquí iría la lógica para enviar el formulario
        console.log('Formulario enviado:', formData);
        alert('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
        
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            mensaje: ''
        });
        setErrores({});
        setCampoValido({
            nombre: false,
            email: false,
            telefono: true,
            mensaje: false
        });
        setCampoTocado({
            nombre: false,
            email: false,
            telefono: false,
            mensaje: false
        });
    };

    const formularioValido = campoValido.nombre && campoValido.email && campoValido.mensaje;

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#003153] mb-4">{t('propertyDetail.contactForm.title')}</h2>

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
                        onBlur={handleBlur}
                        required
                        className={getInputClasses('nombre')}
                        placeholder={t('propertyDetail.contactForm.placeholderName')}
                    />
                    {errores.nombre && campoTocado.nombre && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.nombre}
                        </p>
                    )}
                    {campoValido.nombre && campoTocado.nombre && (
                        <p className="mt-1 text-sm text-green-600 flex items-center">
                            <span className="mr-1">✓</span>
                            {t('propertyDetail.contactForm.validName')}
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
                        onBlur={handleBlur}
                        required
                        className={getInputClasses('email')}
                        placeholder="tu@email.com"
                    />
                    {errores.email && campoTocado.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.email}
                        </p>
                    )}
                    {campoValido.email && campoTocado.email && (
                        <p className="mt-1 text-sm text-green-600 flex items-center">
                            <span className="mr-1">✓</span>
                            {t('propertyDetail.contactForm.validEmail')}
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
                        onBlur={handleBlur}
                        className={getInputClasses('telefono')}
                        placeholder="+53 12345678"
                    />
                    {errores.telefono && campoTocado.telefono && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.telefono}
                        </p>
                    )}
                    {campoValido.telefono && campoTocado.telefono && formData.telefono && (
                        <p className="mt-1 text-sm text-green-600 flex items-center">
                            <span className="mr-1">✓</span>
                            {t('propertyDetail.contactForm.validPhone')}
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
                        onBlur={handleBlur}
                        rows={4}
                        className={getInputClasses('mensaje')}
                        placeholder={t('propertyDetail.contactForm.placeholderMessage', { propertyName: propiedad.nombre })}
                        required
                    />
                    {errores.mensaje && campoTocado.mensaje && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.mensaje}
                        </p>
                    )}
                    {campoValido.mensaje && campoTocado.mensaje && (
                        <p className="mt-1 text-sm text-green-600 flex items-center">
                            <span className="mr-1">✓</span>
                            {t('propertyDetail.contactForm.validMessage')}
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
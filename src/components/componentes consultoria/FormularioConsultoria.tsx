"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
    nombre: string;
    email: string;
    telefono: string;
    tipoProyecto: string;
    presupuesto: string;
    ubicacion: string;
    descripcion: string;
}

interface ErroresFormulario {
    nombre?: string;
    email?: string;
    telefono?: string;
    tipoProyecto?: string;
    presupuesto?: string;
    ubicacion?: string;
    descripcion?: string;
}

type CamposFormulario = keyof FormData;

export const FormularioConsultoria = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        email: '',
        telefono: '',
        tipoProyecto: '',
        presupuesto: '',
        ubicacion: '',
        descripcion: ''
    });

    const [errores, setErrores] = useState<ErroresFormulario>({});
    const [mostrarMensajeErrores, setMostrarMensajeErrores] = useState(false);
    const [formularioValido, setFormularioValido] = useState(false);
    const [camposTocados, setCamposTocados] = useState<{ [key in CamposFormulario]?: boolean }>({});
    const [mensajeEnviado, setMensajeEnviado] = useState(false);

    // Efecto para verificar la validez del formulario
    useEffect(() => {
        setFormularioValido(Object.keys(errores).length === 0);
    }, [errores]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
                    nuevosErrores.nombre = t('consulting.form.errors.nameRequired');
                } else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(value)) {
                    nuevosErrores.nombre = t('consulting.form.errors.nameInvalid');
                } else {
                    delete nuevosErrores.nombre;
                }
                break;

            case 'telefono':
                if (value.trim() && !/^[0-9]{8}$/.test(value)) {
                    nuevosErrores.telefono = t('consulting.form.errors.phoneInvalid');
                } else {
                    delete nuevosErrores.telefono;
                }
                break;

            case 'email':
                if (!value.trim()) {
                    nuevosErrores.email = t('consulting.form.errors.emailRequired');
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    nuevosErrores.email = t('consulting.form.errors.emailInvalid');
                } else {
                    delete nuevosErrores.email;
                }
                break;

            case 'tipoProyecto':
                if (!value.trim()) {
                    nuevosErrores.tipoProyecto = t('consulting.form.errors.projectTypeRequired');
                } else {
                    delete nuevosErrores.tipoProyecto;
                }
                break;

            case 'presupuesto':
                if (!value.trim()) {
                    nuevosErrores.presupuesto = t('consulting.form.errors.budgetRequired');
                } else {
                    delete nuevosErrores.presupuesto;
                }
                break;

            case 'ubicacion':
                if (!value.trim()) {
                    nuevosErrores.ubicacion = t('consulting.form.errors.locationRequired');
                } else {
                    delete nuevosErrores.ubicacion;
                }
                break;

            case 'descripcion':
                if (!value.trim()) {
                    nuevosErrores.descripcion = t('consulting.form.errors.descriptionRequired');
                } else if (value.trim().length < 20) {
                    nuevosErrores.descripcion = t('consulting.form.errors.descriptionMinLength');
                } else if (value.trim().length > 1000) {
                    nuevosErrores.descripcion = t('consulting.form.errors.descriptionMaxLength');
                } else {
                    delete nuevosErrores.descripcion;
                }
                break;
        }

        setErrores(nuevosErrores);
    };

    const validarFormularioCompleto = () => {
        const nuevosErrores: ErroresFormulario = {};

        if (!formData.nombre.trim()) {
            nuevosErrores.nombre = t('consulting.form.errors.nameRequired');
        } else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(formData.nombre)) {
            nuevosErrores.nombre = t('consulting.form.errors.nameInvalid');
        }

        if (!formData.email.trim()) {
            nuevosErrores.email = t('consulting.form.errors.emailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            nuevosErrores.email = t('consulting.form.errors.emailInvalid');
        }

        if (formData.telefono.trim() && !/^[0-9]{8}$/.test(formData.telefono)) {
            nuevosErrores.telefono = t('consulting.form.errors.phoneInvalid');
        }

        if (!formData.tipoProyecto.trim()) {
            nuevosErrores.tipoProyecto = t('consulting.form.errors.projectTypeRequired');
        }

        if (!formData.presupuesto.trim()) {
            nuevosErrores.presupuesto = t('consulting.form.errors.budgetRequired');
        }

        if (!formData.ubicacion.trim()) {
            nuevosErrores.ubicacion = t('consulting.form.errors.locationRequired');
        }

        if (!formData.descripcion.trim()) {
            nuevosErrores.descripcion = t('consulting.form.errors.descriptionRequired');
        } else if (formData.descripcion.trim().length < 20) {
            nuevosErrores.descripcion = t('consulting.form.errors.descriptionMinLength');
        } else if (formData.descripcion.trim().length > 1000) {
            nuevosErrores.descripcion = t('consulting.form.errors.descriptionMaxLength');
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
            tipoProyecto: true,
            presupuesto: true,
            ubicacion: true,
            descripcion: true
        };
        setCamposTocados(todosLosCamposTocados);

        if (validarFormularioCompleto()) {
            setMensajeEnviado(true);
            setMostrarMensajeErrores(false);
            
            // 🚀 AQUÍ IRÍA LA LÓGICA DE ENVÍO DEL FORMULARIO
            console.log('Formulario de consultoría enviado:', formData);
            // Ejemplo de implementación:
            // try {
            //   await enviarFormularioConsultoria(formData);
            //   setMensajeEnviado(true);
            // } catch (error) {
            //   console.error('Error al enviar formulario:', error);
            // }
            
            // Limpiar formulario
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                tipoProyecto: '',
                presupuesto: '',
                ubicacion: '',
                descripcion: ''
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
        <form onSubmit={handleSubmit} className="space-y-6">
            {mensajeEnviado && (
                <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm'>
                    {t('consulting.form.successMessage')}
                </div>
            )}

            {mostrarMensajeErrores && !formularioValido && (
                <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm'>
                    {t('consulting.form.errorMessage')}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campo Nombre */}
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('consulting.form.name')} *
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={getInputClass('nombre', formData.nombre)}
                        placeholder={t('consulting.form.placeholderName')}
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
                        {t('consulting.form.email')} *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={getInputClass('email', formData.email)}
                        placeholder={t('consulting.form.placeholderEmail')}
                        required
                    />
                    {errores.email && camposTocados.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.email}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campo Teléfono */}
                <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('consulting.form.phone')}
                    </label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className={getInputClass('telefono', formData.telefono)}
                        placeholder={t('consulting.form.placeholderPhone')}
                    />
                    {errores.telefono && camposTocados.telefono && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.telefono}
                        </p>
                    )}
                </div>

                {/* Campo Tipo de Proyecto */}
                <div>
                    <label htmlFor="tipoProyecto" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('consulting.form.projectType')} *
                    </label>
                    <select
                        id="tipoProyecto"
                        name="tipoProyecto"
                        value={formData.tipoProyecto}
                        onChange={handleChange}
                        className={getInputClass('tipoProyecto', formData.tipoProyecto)}
                        required
                    >
                        <option value="">{t('consulting.form.selectProjectType')}</option>
                        <option value="residencial">{t('consulting.form.projectTypes.residential')}</option>
                        <option value="comercial">{t('consulting.form.projectTypes.commercial')}</option>
                        <option value="industrial">{t('consulting.form.projectTypes.industrial')}</option>
                        <option value="remodelacion">{t('consulting.form.projectTypes.remodeling')}</option>
                        <option value="otros">{t('consulting.form.projectTypes.other')}</option>
                    </select>
                    {errores.tipoProyecto && camposTocados.tipoProyecto && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.tipoProyecto}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campo Presupuesto */}
                <div>
                    <label htmlFor="presupuesto" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('consulting.form.budget')} *
                    </label>
                    <select
                        id="presupuesto"
                        name="presupuesto"
                        value={formData.presupuesto}
                        onChange={handleChange}
                        className={getInputClass('presupuesto', formData.presupuesto)}
                        required
                    >
                        <option value="">{t('consulting.form.selectBudget')}</option>
                        <option value="menos-10k">{t('consulting.form.budgets.lessThan10k')}</option>
                        <option value="10k-50k">{t('consulting.form.budgets.10kTo50k')}</option>
                        <option value="50k-100k">{t('consulting.form.budgets.50kTo100k')}</option>
                        <option value="100k-500k">{t('consulting.form.budgets.100kTo500k')}</option>
                        <option value="mas-500k">{t('consulting.form.budgets.moreThan500k')}</option>
                    </select>
                    {errores.presupuesto && camposTocados.presupuesto && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.presupuesto}
                        </p>
                    )}
                </div>

                {/* Campo Ubicación */}
                <div>
                    <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('consulting.form.location')} *
                    </label>
                    <input
                        type="text"
                        id="ubicacion"
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        className={getInputClass('ubicacion', formData.ubicacion)}
                        placeholder={t('consulting.form.placeholderLocation')}
                        required
                    />
                    {errores.ubicacion && camposTocados.ubicacion && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠</span>
                            {errores.ubicacion}
                        </p>
                    )}
                </div>
            </div>

            {/* Campo Descripción */}
            <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('consulting.form.description')} *
                </label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={6}
                    className={`${getInputClass('descripcion', formData.descripcion)} resize-none`}
                    placeholder={t('consulting.form.placeholderDescription')}
                    required
                />
                {errores.descripcion && camposTocados.descripcion && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠</span>
                        {errores.descripcion}
                    </p>
                )}
                <div className="mt-1 text-xs text-gray-500 text-right">
                    {formData.descripcion.length}/1000 {t('consulting.form.characters')}
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
                {formularioValido ? t('consulting.form.send') : t('consulting.form.completeFields')}
            </button>

            {/* Leyenda de campos requeridos */}
            <p className="text-xs text-gray-500 text-center">
                * {t('consulting.form.requiredFields')}
            </p>
        </form>
    );
};
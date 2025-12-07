"use client";

import React, { useState, useEffect, useRef } from 'react';
import type { FormularioContacto } from '@/src/Services/FormularioContacto';
import { IoCall, IoLocation, IoLogoWhatsapp, IoMail } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/src/contexts/AuthContext';
import { ModalLoginIni } from '@/src/components/ui/ModalLoginIni'; 
import { mensajeService } from '@/src/Services/Mensajes';

export const Contactanos = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const contactoPendienteRef = useRef<FormularioContacto | null>(null);

  const [contacto, setContacto] = useState<FormularioContacto>({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [mostrarMensajeErrores, setMostrarMensajeErrores] = useState(false);
  const [formularioValido, setFormularioValido] = useState(false);
  const [camposTocados, setCamposTocados] = useState<{ [key: string]: boolean }>({});

  // Efecto para verificar la validez del formulario cuando cambien los errores
  useEffect(() => {
    setFormularioValido(Object.keys(errores).length === 0);
  }, [errores]);

  // Efecto para enviar automáticamente cuando el usuario se autentica
  useEffect(() => {
    if (isAuthenticated && contactoPendienteRef.current) {
      const pendingContacto = contactoPendienteRef.current;
      contactoPendienteRef.current = null;
      enviarFormulario(pendingContacto);
    }
  }, [isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let valorFiltrado = value;
    if (name === 'nombre') {
      valorFiltrado = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
      if (valorFiltrado.length > 50) {
        valorFiltrado = valorFiltrado.slice(0, 50);
      }
    } else if (name === 'telefono') {
      valorFiltrado = value.replace(/[^0-9]/g, '');
      if (valorFiltrado.length > 8) {
        valorFiltrado = valorFiltrado.slice(0, 8);
      }
    }

    setContacto((prevContacto) => ({
      ...prevContacto,
      [name]: valorFiltrado,
    }));

    // Marcar el campo como tocado
    if (!camposTocados[name]) {
      setCamposTocados(prev => ({
        ...prev,
        [name]: true
      }));
    }

    // Validar el campo individual
    validarCampoIndividual(name, valorFiltrado);
  };

  const validarCampoIndividual = (name: string, value: string) => {
    const nuevosErrores = { ...errores };

    switch (name) {
      case 'nombre':
        if (!value.trim()) {
          nuevosErrores.nombre = t('contact.form.errors.nameRequired');
        } else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(value)) {
          nuevosErrores.nombre = t('contact.form.errors.nameInvalid');
        } else {
          delete nuevosErrores.nombre;
        }
        break;

      case 'telefono':
        if (!value.trim()) {
          nuevosErrores.telefono = t('contact.form.errors.phoneRequired');
        } else if (!/^[0-9]{8}$/.test(value)) {
          nuevosErrores.telefono = t('contact.form.errors.phoneInvalid');
        } else {
          delete nuevosErrores.telefono;
        }
        break;

      case 'email':
        if (!value.trim()) {
          nuevosErrores.email = t('contact.form.errors.emailRequired');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          nuevosErrores.email = t('contact.form.errors.emailInvalid');
        } else {
          delete nuevosErrores.email;
        }
        break;

      case 'mensaje':
        if (!value.trim()) {
          nuevosErrores.mensaje = t('contact.form.errors.messageRequired');
        } else {
          delete nuevosErrores.mensaje;
        }
        break;
    }

    setErrores(nuevosErrores);
  };

  const validarFormulario = () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!contacto.nombre.trim()) {
      nuevosErrores.nombre = t('contact.form.errors.nameRequired');
    } else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(contacto.nombre)) {
      nuevosErrores.nombre = t('contact.form.errors.nameInvalid');
    }

    if (!contacto.telefono.trim()) {
      nuevosErrores.telefono = t('contact.form.errors.phoneRequired');
    } else if (!/^[0-9]{8}$/.test(contacto.telefono)) {
      nuevosErrores.telefono = t('contact.form.errors.phoneInvalid');
    }

    if (!contacto.email.trim()) {
      nuevosErrores.email = t('contact.form.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto.email)) {
      nuevosErrores.email = t('contact.form.errors.emailInvalid');
    }

    if (!contacto.mensaje.trim()) {
      nuevosErrores.mensaje = t('contact.form.errors.messageRequired');
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleLoginSuccess = () => {
    const checkAndSubmit = () => {
      const currentAuth = localStorage.getItem('user');
      const pendingContacto = contactoPendienteRef.current;
      if (pendingContacto && currentAuth) {
        // Enviar el formulario guardado
        enviarFormulario(pendingContacto);
        contactoPendienteRef.current = null;
      }
    };
    setTimeout(checkAndSubmit, 300);
  };

const enviarFormulario = async (datosContacto: FormularioContacto) => {
    setMensajeEnviado(true);

    try {

      const mensajeParaEnviar = {
        tipo: 'consulta',
        motivo: datosContacto.mensaje,
        gmail: datosContacto.email,
        telefono: datosContacto.telefono
      };


      await mensajeService.crearMensaje(mensajeParaEnviar);

    setMostrarMensajeErrores(false);
    setContacto({
      nombre: '',
      telefono: '',
      email: '',
      mensaje: ''
    });
    setErrores({});
    setCamposTocados({});
    
      } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setMostrarMensajeErrores(true);
      //mostrar un mensaje de error específico
    } finally {
      setMensajeEnviado(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Marcar todos los campos como tocados al enviar
    const todosLosCamposTocados = {
      nombre: true,
      telefono: true,
      email: true,
      mensaje: true
    };
    setCamposTocados(todosLosCamposTocados);

    if (!validarFormulario()) {
      setMostrarMensajeErrores(true);
      return;
    }

    // Verificar autenticación antes de enviar
    if (!isAuthenticated) {
      // Guardar el formulario pendiente y abrir el modal de login
      contactoPendienteRef.current = { ...contacto };
      setModalLoginOpen(true);
      return;
    }

    // Si esta autenticado, enviar directamente
    await enviarFormulario(contacto);
  };

  // Funcion para determinar la clase del input
  const getInputClass = (campo: string, valor: string) => {
    const fueTocado = camposTocados[campo];
    const tieneError = errores[campo];
    const tieneValor = valor.trim() !== '';

    if (fueTocado && tieneError) {
      return 'border-red-500 bg-red-50'; // Error
    } else if (fueTocado && !tieneError && tieneValor) {
      return 'border-green-500 bg-green-50'; // Válido
    } else {
      return 'border-gray-300 bg-white'; // Neutral
    }
  };

  return (
    <div className='py-16 bg-white min-h-screen' id='contactanos'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#003153] mb-4'>
            {t('contact.title')} 
          </h1>
        </div>

        {mensajeEnviado && (
          <div className='mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded'>
            {t('contact.form.successMessage')} 
          </div>
        )}

        {mostrarMensajeErrores && !formularioValido && (
          <div className='mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
            {t('contact.form.errorMessage')} 
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
            <h2 className='text-2xl font-bold text-[#003153] mb-8 text-center'>
              {t('contact.info.title')} 
            </h2>
            
            <div className='space-y-6'>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-3 rounded-full">
                  <IoCall className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t('contact.info.phone.title')} 
                  </h3>
                  <a href="tel:+5358475772" className='text-[#003153] hover:text-blue-700 transition-colors text-lg font-medium'>
                    +53 58475772
                  </a>
                  <p className="text-gray-600 text-sm mt-1">
                    {t('contact.info.phone.hours')} 
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-100 p-3 rounded-full">
                  <IoLogoWhatsapp className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t('contact.info.whatsapp.title')} 
                  </h3>
                  <a href="https://wa.me/5358475772" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className='text-[#003153] hover:text-green-700 transition-colors text-lg font-medium'>
                    +53 58475772
                  </a>
                  <p className="text-gray-600 text-sm mt-1">
                    {t('contact.info.whatsapp.hours')} 
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-red-100 p-3 rounded-full">
                  <IoMail className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t('contact.info.email.title')} 
                  </h3>
                  <a href="mailto:cchangconstrucciones@gmail.com" 
                    className='text-[#003153] hover:text-red-700 transition-colors text-lg font-medium break-all'>
                      cchangconstrucciones@gmail.com
                  </a>
                  <p className="text-gray-600 text-sm mt-1">
                    {t('contact.info.email.response')} 
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 p-3 rounded-full">
                  <IoLocation className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t('contact.info.address.title')} 
                  </h3>
                  <p className="text-[#003153] text-lg font-medium">
                    {t('contact.info.address.street')} 
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {t('contact.info.address.city')} 
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className='mt-12 lg:mt-0' onSubmit={handleSubmit}>
              <label className='block text-[#003153] font-semibold mb-2' htmlFor='nombre'>
                {t('contact.form.name')} 
              </label>
              <input 
                className={`w-full p-2 border rounded mb-1 ${getInputClass('nombre', contacto.nombre)}`} 
                type='text' 
                id='nombre' 
                name='nombre' 
                onChange={handleChange} 
                value={contacto.nombre}  
                placeholder={t('contact.form.placeholders.name')}
                required 
              />
              {errores.nombre && ( 
                <p className='text-red-500 text-sm mb-3'>{errores.nombre}</p>
              )}

              <label className='block text-[#003153] font-semibold mb-2' htmlFor='telefono'>
                {t('contact.form.phone')} 
              </label>
              <input 
                className={`w-full p-2 border rounded mb-1 ${getInputClass('telefono', contacto.telefono)}`} 
                type='tel' 
                id='telefono' 
                name='telefono'  
                onChange={handleChange} 
                value={contacto.telefono} 
                placeholder={t('contact.form.placeholders.phone')}
                required 
              />
              {errores.telefono && ( 
                <p className='text-red-500 text-sm mb-3'>{errores.telefono}</p>
              )}

              <label className='block text-[#003153] font-semibold mb-2' htmlFor='email'>
                {t('contact.form.email')} 
              </label>
              <input 
                className={`w-full p-2 border rounded mb-1 ${getInputClass('email', contacto.email)}`} 
                type='email' 
                id='email' 
                name='email'   
                onChange={handleChange} 
                value={contacto.email} 
                placeholder={t('contact.form.placeholders.email')}
                required 
              />
              {errores.email && (  
                <p className='text-red-500 text-sm mb-3'>{errores.email}</p>
              )}

              <label className='block text-[#003153] font-semibold mb-2' htmlFor='mensaje'>
                {t('contact.form.message')} 
              </label>
              <textarea 
                className={`w-full p-2 border rounded mb-1 ${getInputClass('mensaje', contacto.mensaje)}`} 
                id='mensaje' 
                name='mensaje'  
                value={contacto.mensaje} 
                onChange={handleChange} 
                rows={4} 
                placeholder={t('contact.form.placeholders.message')}
                required 
              />
              {errores.mensaje && ( 
                <p className='text-red-500 text-sm mb-3'>{errores.mensaje}</p>
              )}

              <button 
                className={`px-4 py-2 rounded transition-colors w-full ${
                  formularioValido 
                    ? 'bg-[#003153] text-white hover:bg-[#002140]' 
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`} 
                type='submit' 
                disabled={!formularioValido}
              >
                {t('contact.form.send')} 
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de Login */}
      <ModalLoginIni 
        isOpen={modalLoginOpen}
        onClose={() => {
          setModalLoginOpen(false);
          contactoPendienteRef.current = null;
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

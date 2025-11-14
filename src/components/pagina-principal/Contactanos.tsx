"use client";

import React, { useState } from 'react';
import type { FormularioContacto } from '@/src/Services/FormularioContacto';
import { IoCall, IoLocation, IoLogoWhatsapp, IoMail } from 'react-icons/io5';
import { useTranslation } from 'react-i18next'; 

export const Contactanos = () => {
  const { t } = useTranslation(); 

  const [contacto, setContacto] = useState<FormularioContacto>({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContacto((prevContacto) => ({
      ...prevContacto,
      [name]: value,
    }));
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

  const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setMensajeEnviado(true);
    setContacto({
      nombre: '',
      telefono: '',
      email: '',
      mensaje: ''
    });
    
    setTimeout(() => {
      setMensajeEnviado(false);
    }, 5000);
  };

  const existeError = Object.keys(errores).length > 0;

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

        {existeError && (
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
            <form className='mt-12 lg:mt-0' onSubmit={handleSumit}>
              <label className='block text-[#003153] font-semibold mb-2' htmlFor='nombre'>
                {t('contact.form.name')} 
              </label>
              <input className={`w-full p-2 border rounded mb-4 ${errores.nombre && 'border-red-500'}`} 
                    type='text' id='nombre' name='nombre' 
                    onChange={handleChange} value={contacto.nombre}  
                    placeholder={t('contact.form.placeholders.name')} 
                    required />

              {errores.nombre && ( 
                <p className='text-red-500 text-sm mb-3'>{errores.nombre}</p>
              )}

              <label className='block text-[#003153] font-semibold mb-2' htmlFor='telefono'>
                {t('contact.form.phone')} 
              </label>
              <input className={`w-full p-2 border rounded mb-4 ${errores.telefono && 'border-red-500'}`} 
                    type='tel' id='telefono' name='telefono'  
                    onChange={handleChange} value={contacto.telefono} 
                    placeholder={t('contact.form.placeholders.phone')} 
                    required />
              {errores.telefono && ( 
                <p className='text-red-500 text-sm mb-3'>{errores.telefono}</p>
              )}

              <label className='block text-[#003153] font-semibold mb-2' htmlFor='email'>
                {t('contact.form.email')} 
              </label>
              <input className={`w-full p-2 border rounded mb-4 ${errores.email && 'border-red-500'}`} 
                    type='email' id='email' name='email'   
                    onChange={handleChange} value={contacto.email} 
                    placeholder={t('contact.form.placeholders.email')} 
                    required />
              {errores.email && (  
                <p className='text-red-500 text-sm mb-3'>{errores.email}</p>
              )}

              <label className='block text-[#003153] font-semibold mb-2' htmlFor='mensaje'>
                {t('contact.form.message')} 
              </label>
              <textarea className={`w-full p-2 border rounded mb-4 ${errores.mensaje && 'border-red-500'}`} 
                        id='mensaje' name='mensaje'  
                        value={contacto.mensaje} onChange={handleChange} 
                        rows={4} 
                        placeholder={t('contact.form.placeholders.message')} 
                        required />
              {errores.mensaje && ( 
                <p className='text-red-500 text-sm mb-3'>{errores.mensaje}</p>
              )}

              <button className='bg-[#003153] text-white px-4 py-2 rounded hover:bg-[#002140] transition-colors w-full' type='submit'>
                {t('contact.form.send')} 
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
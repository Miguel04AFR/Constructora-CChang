"use client";

import React, { useState, useEffect } from 'react';
import type { FormularioContacto } from '@/src/Services/FormularioContacto';
import { IoCall, IoLocation, IoLogoWhatsapp, IoMail } from 'react-icons/io5';

export const Contactanos = () => {
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
          nuevosErrores.nombre = 'El nombre es obligatorio';
        } else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(value)) {
          nuevosErrores.nombre = 'El nombre debe tener entre 2 y 50 caracteres';
        } else {
          delete nuevosErrores.nombre;
        }
        break;

      case 'telefono':
        if (!value.trim()) {
          nuevosErrores.telefono = 'El teléfono es obligatorio';
        } else if (!/^[0-9]{8}$/.test(value)) {
          nuevosErrores.telefono = 'El teléfono debe tener exactamente 8 números.';
        } else {
          delete nuevosErrores.telefono;
        }
        break;

      case 'email':
        if (!value.trim()) {
          nuevosErrores.email = 'El email es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          nuevosErrores.email = 'Por favor, ingresa un correo electrónico válido.';
        } else {
          delete nuevosErrores.email;
        }
        break;

      case 'mensaje':
        if (!value.trim()) {
          nuevosErrores.mensaje = 'El mensaje es obligatorio';
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
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (!/^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(contacto.nombre)) {
      nuevosErrores.nombre = 'El nombre debe tener entre 2 y 50 caracteres y solo letras.';
    }

    if (!contacto.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es obligatorio';
    } else if (!/^[0-9]{8}$/.test(contacto.telefono)) {
      nuevosErrores.telefono = 'El teléfono debe tener exactamente 8 números.';
    }

    if (!contacto.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto.email)) {
      nuevosErrores.email = 'Por favor, ingresa un correo electrónico válido.';
    }

    if (!contacto.mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje es obligatorio';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Marcar todos los campos como tocados al enviar
    const todosLosCamposTocados = {
      nombre: true,
      telefono: true,
      email: true,
      mensaje: true
    };
    setCamposTocados(todosLosCamposTocados);

    if (validarFormulario()) {
      setMensajeEnviado(true);
      setMostrarMensajeErrores(false);
      setContacto({
        nombre: '',
        telefono: '',
        email: '',
        mensaje: ''
      });
      setErrores({});
      setCamposTocados({});
    } else {
      setMostrarMensajeErrores(true);
    }

    setTimeout(() => {
      setMensajeEnviado(false);
    }, 5000);
  };

  // Función para determinar la clase del input
  const getInputClass = (campo: string, valor: string) => {
    const fueTocado = camposTocados[campo];
    const tieneError = errores[campo];
    const tieneValor = valor.trim() !== '';
    let result:string = "";

    if (fueTocado && tieneError) {
      result = 'border-red-500 bg-red-50'; // Error
    } else if (fueTocado && !tieneError && tieneValor) {
      result = 'border-green-500 bg-green-50'; // Válido
    } else {
      result = 'border-gray-300 bg-white'; // Neutral
    }

    return result;
  };

  return (
    <div className='py-16 bg-white min-h-screen' id='contactanos'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#003153] mb-4'>
            Contácta con nosotros por cualquier duda o consulta
          </h1>
        </div>

        {mensajeEnviado && (
          <div className='mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded'>
            ¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.
          </div>
        )}

        {mostrarMensajeErrores && !formularioValido && (
          <div className='mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
            Por favor, corrige los errores en el formulario.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
            <h2 className='text-2xl font-bold text-[#003153] mb-8 text-center'>
              Información de Contacto
            </h2>
            
            <div className='space-y-6'>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-3 rounded-full">
                  <IoCall className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Teléfono</h3>
                  <a href="tel:+5358475772" className='text-[#003153] hover:text-blue-700 transition-colors text-lg font-medium'>
                    +53 58475772
                  </a>
                  <p className="text-gray-600 text-sm mt-1">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-100 p-3 rounded-full">
                  <IoLogoWhatsapp className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">WhatsApp</h3>
                  <a href="https://wa.me/5358475772" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className='text-[#003153] hover:text-green-700 transition-colors text-lg font-medium'>
                    +53 58475772
                  </a>
                  <p className="text-gray-600 text-sm mt-1">Chat disponible 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-red-100 p-3 rounded-full">
                  <IoMail className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <a href="mailto:cchangconstrucciones@gmail.com" 
                     className='text-[#003153] hover:text-red-700 transition-colors text-lg font-medium break-all'>
                    cchangconstrucciones@gmail.com
                  </a>
                  <p className="text-gray-600 text-sm mt-1">Respondemos en menos de 24 horas</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 p-3 rounded-full">
                  <IoLocation className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Dirección</h3>
                  <p className="text-[#003153] text-lg font-medium">
                    Calle 50 entre 35 y 37 #3508, Playa
                  </p>
                  <p className="text-gray-600 text-sm mt-1">La Habana, Cuba</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className='mt-12 lg:mt-0' onSubmit={handleSubmit}>
              <label className='block text-[#003153] font-semibold mb-2' htmlFor='nombre'>Nombre:</label>
              <input 
                className={`w-full p-2 border rounded mb-1 ${getInputClass('nombre', contacto.nombre)}`} 
                type='text' 
                id='nombre' 
                name='nombre' 
                onChange={handleChange} 
                value={contacto.nombre}  
                required 
              />
              {errores.nombre && ( 
                <p className='text-red-500 text-sm mb-3'>{errores.nombre}</p>
              )}

              <label className='block text-[#003153] font-semibold mb-2' htmlFor='telefono'>Teléfono:</label>
              <input 
                className={`w-full p-2 border rounded mb-1 ${getInputClass('telefono', contacto.telefono)}`} 
                type='tel' 
                id='telefono' 
                name='telefono'  
                onChange={handleChange} 
                value={contacto.telefono} 
                required 
              />
              {errores.telefono && ( 
                <p className='text-red-500 text-sm mb-3'>{errores.telefono}</p>
              )}

              <label className='block text-[#003153] font-semibold mb-2' htmlFor='email'>Email:</label>
              <input 
                className={`w-full p-2 border rounded mb-1 ${getInputClass('email', contacto.email)}`} 
                type='email' 
                id='email' 
                name='email'   
                onChange={handleChange} 
                value={contacto.email} 
                required 
              />
              {errores.email && (  
                <p className='text-red-500 text-sm mb-3'>{errores.email}</p>
              )}

              <label className='block text-[#003153] font-semibold mb-2' htmlFor='mensaje'>Mensaje:</label>
              <textarea 
                className={`w-full p-2 border rounded mb-1 ${getInputClass('mensaje', contacto.mensaje)}`} 
                id='mensaje' 
                name='mensaje'  
                value={contacto.mensaje} 
                onChange={handleChange} 
                rows={4} 
                placeholder='mensaje breve'
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
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
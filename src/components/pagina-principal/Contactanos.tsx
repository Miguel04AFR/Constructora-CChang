"use client";

import React, { useState } from 'react';
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
  
  const [errores, setErrores] = useState<{ [key: string]: string }>({}); {/* para validar */}
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { {/* el evento puede venir de un input o un textarea */}
    const { name, value } = e.target;{/* extraemos el nombre y el valor del campo cuando el evento aparece*/}

    
    


    setContacto((prevContacto) => ({         /* prevContacto guarda todo y solo actualiza lo que coge el evento */
        ...prevContacto, /* le da valor a lo que coge */
        [name]: value,
    }));

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

const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    
   if (!validarFormulario()) {
      return; // Detener si se encuentra un error
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
            Contácta con nosotros por cualquier duda o consulta
          </h1>
        </div>

        {mensajeEnviado && (
          <div className='mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded'>
            ¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.
          </div>
        )}

         {existeError && (
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
            <form className='mt-12 lg:mt-0' onSubmit={handleSumit}>
                <label className='block text-[#003153] font-semibold mb-2' htmlFor='nombre'>Nombre:</label>
                <input   className={`w-full p-2 border rounded mb-4 ${errores.nombre && 'border-red-500'}`} type='text' id='nombre' name='nombre' onChange={handleChange} value={contacto.nombre}  required />
               {/* ` esta cosa es un backtick sirve para meter codigo dentro de un string o en este caso esa condicion */}

                {errores.nombre && ( 
                  <p className='text-red-500 text-sm mb-3'>{errores.nombre}</p>
                )}



                <label className='block text-[#003153] font-semibold mb-2' htmlFor='telefono'>Teléfono:</label>
                <input className={`w-full p-2 border rounded mb-4 ${errores.telefono && 'border-red-500'}`} type='tel' id='telefono' name='telefono'  onChange={handleChange} value={contacto.telefono} required />
                 {errores.telefono && ( 
                  <p className='text-red-500 text-sm mb-3'>{errores.telefono}</p>
                )}


                <label className='block text-[#003153] font-semibold mb-2' htmlFor='email'>Email:</label>
                <input className={`w-full p-2 border rounded mb-4 ${errores.email && 'border-red-500'}`} type='email' id='email' name='email'   onChange={handleChange} value={contacto.email} required />
                 {errores.email && (  
                  <p className='text-red-500 text-sm mb-3'>{errores.email}</p>
                )}


                <label className='block text-[#003153] font-semibold mb-2' htmlFor='mensaje'>Mensaje:</label>
                <textarea className={`w-full p-2 border rounded mb-4 ${errores.mensaje && 'border-red-500'}`} id='mensaje' name='mensaje'  value={contacto.mensaje} onChange={handleChange} rows={4} placeholder='mensaje breve'required />
                 {errores.mensaje && ( 
                  <p className='text-red-500 text-sm mb-3'>{errores.mensaje}</p>
                )}


                <button className='bg-[#003153] text-white px-4 py-2 rounded hover:bg-[#002140] transition-colors  w-full' type='submit'>Enviar</button>

            </form>

        </div>
        

        </div>

        </div>


    </div>
  )
}

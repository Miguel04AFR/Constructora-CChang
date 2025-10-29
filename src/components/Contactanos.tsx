"use client";

import React, { useState } from 'react';
import type { FormularioContacto } from './index';


export const Contactanos = () => {

const [contacto, setContacto] = useState<FormularioContacto>({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
});

  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { {/* el evento puede venir de un input o un textarea */}
    const { name, value } = e.target;{/* extraemos el nombre y el valor del campo cuando el evento aparece*/}
    setContacto((prevContacto) => ({         /* prevContacto guarda todo y solo actualiza lo que coge el evento */
        ...prevContacto, /* le da valor a lo que coge */
        [name]: value,
    }));
};


const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* informacion */}
          <div>
            <h2 className='text-2xl font-bold text-[#003153] mb-6'>
              Información de contacto:
            </h2>
            <div className='space-y-4 text-[#003153]'>
              <p className='text-lg'>
                📞 Teléfono: <a href="tel:+5358475772" className='underline hover:text-blue-800'>+53 58475772</a>
              </p>
              <p className='text-lg'>
                📱 WhatsApp: <a href="https://wa.me/5358475772" className='underline hover:text-blue-800'>+53 58475772</a>
              </p>
              <p className='text-lg'>
                📧 Email: <a href="mailto:cchangconstrucciones@gmail.com" className='underline hover:text-blue-800'>cchangconstrucciones@gmail.com</a>
              </p>
              <p className='text-lg'>
                📍 Dirección: Calle 50 entre 35 y 37 #3508, Playa
              </p>
            </div>
          </div>
        

        <div>
            <form className='mt-12 lg:mt-0' onSubmit={handleSumit}>
                <label className='block text-[#003153] font-semibold mb-2' htmlFor='nombre'>Nombre:</label>
                <input className='w-full p-2 border border-gray-300 rounded mb-4' type='text' id='nombre' name='nombre' onChange={handleChange} value={contacto.nombre}  required />

                <label className='block text-[#003153] font-semibold mb-2' htmlFor='telefono'>Teléfono:</label>
                <input className='w-full p-2 border border-gray-300 rounded mb-4' type='tel' id='telefono' name='telefono'  onChange={handleChange} value={contacto.telefono} required />

                <label className='block text-[#003153] font-semibold mb-2' htmlFor='email'>Email:</label>
                <input className='w-full p-2 border border-gray-300 rounded mb-4' type='email' id='email' name='email'   onChange={handleChange} value={contacto.email} required />

                <label className='block text-[#003153] font-semibold mb-2' htmlFor='mensaje'>Mensaje:</label>
                <textarea className='w-full p-2 border border-gray-300 rounded mb-4' id='mensaje' name='mensaje'  value={contacto.mensaje} onChange={handleChange} rows={4} placeholder='mensaje breve'required>

                </textarea>

                <button className='bg-[#003153] text-white px-4 py-2 rounded hover:bg-[#002140] transition-colors  w-full' type='submit'>Enviar</button>

            </form>

        </div>
        

        </div>

        </div>


    </div>
  )
}

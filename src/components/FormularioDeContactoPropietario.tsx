"use client";

import React, { useState } from 'react';
import type { Casa } from '@/src/components/index';

interface FormularioContactoProps {
    propiedad: Casa;
}

export const FormularioContacto: React.FC<FormularioContactoProps> = ({ propiedad }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    alert('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
};

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#003153] mb-4">Contactar sobre esta propiedad</h2>
      
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003153] focus:border-transparent"
                        placeholder="Tu nombre"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003153] focus:border-transparent"
                        placeholder="tu@email.com"
                    />
                </div>

                <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003153] focus:border-transparent"
                        placeholder="+1 234 567 890"
                    />
                    </div>

                    <div>
                        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                            Mensaje
                        </label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003153] focus:border-transparent"
                            placeholder={`Estoy interesado en la propiedad: ${propiedad.nombre}`}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#003153] text-white py-3 px-4 rounded-md hover:bg-blue-800 transition-colors font-medium"
                    >
                        Enviar Mensaje
                    </button>
            </form>
        </div>
    );
};
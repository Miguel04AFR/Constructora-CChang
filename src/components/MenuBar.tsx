'use client';

import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import { IoBuild, IoPersonOutline, IoBusiness, IoCall, IoInformation, IoConstruct, IoLogOutOutline } from 'react-icons/io5';
import { ModalLoginIni } from './ModalLoginIni'

export const MenuBar = () => {
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if(element)
    element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoginU = (usuario: string) => {
    setUsuarioLogueado(usuario);
  };

  const handleCerrarSesion = () => {
    setUsuarioLogueado('');
  };

  return (
    <>
      <nav className='flex px-5 justify-between items-center w-full bg-white shadow-lg py-4'>
        {/* Logo destacado */}
        <div>
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-[#6B21A8] text-[#FBBF24] px-4 py-2 rounded-lg flex items-center gap-2">
              <IoConstruct size={24} className="text-[#FBBF24]" />
              <span className="text-2xl font-bold">CChang</span>
            </div>
            <span className="text-sm text-gray-600 hidden md:block">
              Construcción, Calidad, Confianza
            </span>
          </Link>
        </div>

        {/* Navegación */}
        <div className='hidden md:flex items-center space-x-8'>
          <button 
            onClick={() => scrollToSection('servicios')}
            className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
            <IoBuild size={20} className="text-[#003153]" />
            <span className="font-medium">Servicios</span>
          </button>
          
          <button 
            onClick={() => scrollToSection('proyectos')}
            className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153] font-medium'
          >
            <IoBusiness size={20} className="text-[#003153]" />
            <span>Proyectos</span>
          </button>
          
          <button
            onClick={() => scrollToSection('nosotros')}
            className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
            <IoInformation size={20} className="text-[#003153]" />
            <span className="font-medium">Nosotros</span>
          </button>
          
          <button 
            onClick={() => scrollToSection('contacto')}
            className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
            <IoCall size={20} className="text-[#003153]" />
            <span className="font-medium">Contacto</span>
          </button>
        </div>

        {/* Botón de login o información de usuario */}
        {!usuarioLogueado ? (
          <div className='flex items-center'>
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className='flex items-center gap-2 bg-[#003153] text-[#FBBF24] px-4 py-2 rounded-lg hover:bg-blue-800 transition-all shadow-md'
            >
              <IoPersonOutline size={20} />
              <span className="font-medium">Iniciar Sesión</span>
            </button>
          </div>
        ) : (
         
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg border border-green-200'>
              <IoPersonOutline size={20} />
              <span className="font-medium">Bienvenido, {usuarioLogueado}</span>
            </div>
            <button 
              onClick={handleCerrarSesion}
              className='flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-all'
            >
              <IoLogOutOutline size={18} />
              <span>Salir</span>
            </button>
          </div>
        )}
      </nav>

      {/* Modal de Login */}
      <ModalLoginIni 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        usuario={handleLoginU} 
      />
    </>
  );
}
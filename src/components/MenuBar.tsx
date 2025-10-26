'use client';

import React from 'react'
import Link from 'next/link';
import { IoBuild, IoPersonOutline, IoBusiness, IoCall, IoInformation } from 'react-icons/io5';

export const MenuBar = () => {
  return (
    <nav className='flex px-5 justify-between items-center w-full bg-white shadow-lg py-4'>
      {/* Logo destacado */}
      <div>
        <Link href="/" className="flex items-center space-x-3">
          <div className="bg-[#003153] text-white px-4 py-2 rounded-lg">
            <span className="text-2xl font-bold">CChang</span>
          </div>
          <span className="text-sm text-gray-600 hidden md:block">
            Construcción, Calidad, Confianza
          </span>
        </Link>
      </div>

      {/* Navegación central con iconos */}
      <div className='hidden md:flex items-center space-x-8'>
        <Link href="/servicios" className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
          <IoBuild size={20} className="text-[#003153]" />
          <span className="font-medium">Servicios</span>
        </Link>
        
        <Link href="/proyectos" className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
          <IoBusiness size={20} className="text-[#003153]" />
          <span className="font-medium">Proyectos</span>
        </Link>
        
        <Link href="/nosotros" className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
          <IoInformation size={20} className="text-[#003153]" />
          <span className="font-medium">Nosotros</span>
        </Link>
        
        <Link href="/contacto" className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
          <IoCall size={20} className="text-[#003153]" />
          <span className="font-medium">Contacto</span>
        </Link>
      </div>

      {/* Botón de login destacado */}
      <div className='hidden sm:flex items-center'>
        <Link href="/login" className='flex items-center gap-2 bg-[#003153] text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all shadow-md'>
          <IoPersonOutline size={20} />
          <span className="font-medium">Iniciar Sesión</span>
        </Link>
      </div>
    </nav>
  )
}
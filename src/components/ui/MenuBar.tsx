'use client';

import React, { useState, useRef, useEffect } from 'react'
import { IoBuild, IoPersonOutline, IoBusiness, IoCall, IoInformation, IoLogOutOutline } from 'react-icons/io5';
import { ModalLoginIni } from './ModalLoginIni'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/src/contexts/AuthContext';

export const MenuBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [estaLoginModalOpen, setEstaLoginModalOpen] = useState(false);
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const confirmBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleNavigar = (sectionId: string) => {
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const handleCerrarSesion = () => {
    setShowLogoutConfirm(true);
  };

  const confirmarCerrarSesion = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  useEffect(() => {
    if (!showLogoutConfirm) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowLogoutConfirm(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showLogoutConfirm]);

  return (
    <>
      <nav className='fixed top-0 left-0 right-0 z-50 flex px-4 py-2 justify-between items-center w-full bg-white shadow-lg'>
        {/* Logo destacado */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavigar('heroC')}
          >
            <img 
              src="/constructora-removebg-preview.png" 
              alt="Logo Constructora CChang"
              className="w-12 h-auto object-contain" 
            />
          </button>
          <span className="text-xs text-gray-600 hidden md:block ">
            {t('hero.subtitle')}
          </span>
        </div>

        {/* Navegación */}
        <div className='hidden md:flex items-center space-x-8'>
          <button 
            onClick={() => handleNavigar('servicios')}
            className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
            <IoBuild size={20} className="text-[#003153]" />
            <span className="font-medium">{t('navigation.services')}</span>
          </button>
          
          <button 
            onClick={() => handleNavigar('proyectos')}
            className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153] font-medium'
          >
            <IoBusiness size={20} className="text-[#003153]" />
            <span>{t('navigation.projects')}</span>
          </button>
          
          <button
            onClick={() => handleNavigar('nosotros')}
            className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
            <IoInformation size={20} className="text-[#003153]" />
            <span className="font-medium">{t('navigation.about')}</span>
          </button>
          
          <button 
            onClick={() => handleNavigar('contactanos')}
            className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
            <IoCall size={20} className="text-[#003153]" />
            <span className="font-medium">{t('navigation.contact')}</span>
          </button>
        </div>

        {/* Login */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <div className='flex items-center'>
              <button 
                onClick={() => setEstaLoginModalOpen(true)}
                className='flex items-center gap-2 bg-[#003153] text-[#FBBF24] px-4 py-2 rounded-lg hover:bg-blue-800 transition-all shadow-md'
              >
                <IoPersonOutline size={20} />
                <span className="font-medium">{t('navigation.login')}</span>
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-3 flex-col sm:flex-row'>
              <div className='flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg border border-green-200 text-sm sm:text-base'>
                <IoPersonOutline size={20} />
                <span className="font-medium"> {t('navigation.welcome', { name: user })}</span>
              </div>
              <button 
                onClick={handleCerrarSesion}
                className='flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-all
                text-sm sm:text-base w-full sm:w-auto justify-center'
              >
                <IoLogOutOutline size={18} />
                <span>{t('navigation.logout')}</span>
              </button>
            </div>
          )}
          <div className="ml-4"> 
            <LanguageSelector />
          </div>
        </div>
      </nav>

      {/* Modal de Login */}
      <ModalLoginIni 
        isOpen={estaLoginModalOpen} 
        onClose={() => setEstaLoginModalOpen(false)}
      />

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('navigation.logoutConfirmTitle') || 'Confirmar cierre de sesión'}</h3>
            <p className="text-sm text-gray-600 mb-6">{t('navigation.logoutConfirm') || '¿Estás seguro que deseas cerrar sesión?'}</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 rounded bg-gray-200">{t('common.cancel') || 'Cancelar'}</button>
              <button
                ref={confirmBtnRef}
                onClick={confirmarCerrarSesion}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                {t('navigation.logout') || 'Cerrar sesión'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
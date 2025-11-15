'use client';

import React from 'react'
import Link from 'next/link';
import { IoBuild, IoBusiness, IoCall, IoInformation } from 'react-icons/io5';
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const handleNavigar = (sectionId: string) => {
    // Si estamos en la página principal
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si estamos en otra página, navegar a la página principal 
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Primera fila: Logo, Navegación y Redes Sociales */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          
          {/* Logo */}
          <div className="flex shrink-0 bg-white p-2 rounded-lg">
            <button onClick={() => handleNavigar('heroC')}>
              <img 
                src="/constructora-removebg-preview.png" 
                alt="Logo Constructora CChang"
                className="w-32 h-auto object-contain"
              />
            </button>
          </div>

          {/* Navegación */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button 
              onClick={() => handleNavigar('servicios')}
              className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
                <IoBuild size={20}  />
                <span className="font-medium">{t('navigation.services')}</span>
            </button>
            
            <button 
              onClick={() => handleNavigar('proyectos')}
              className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153] font-medium'
            >
              <IoBusiness size={20}  />
              <span>{t('navigation.projects')}</span>
            </button>
            
            <button
              onClick={() => handleNavigar('nosotros')}
              className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
              <IoInformation size={20}  />
              <span className="font-medium">{t('navigation.about')}</span>
            </button>
            
            <button 
              onClick={() => handleNavigar('contactanos')}
              className='flex items-center gap-2 p-3 rounded-lg transition-all hover:bg-blue-50 hover:text-[#003153]'>
              <IoCall size={20}  />
              <span className="font-medium">{t('navigation.contact')}</span>
            </button>
          </div>

          {/* Redes Sociales */}
          <div className="flex gap-4">
            <a href="https://www.facebook.com/p/Empresa-Constructora-CChang-100091466821578" 
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={t('footer.social.facebook')}>
              <FaFacebook size={20} />
            </a>
            <a href="https://www.instagram.com/p/CxlsEg4ps6w/?hl=bg" 
              className="p-2 rounded-full bg-gray-800 hover:bg-pink-600 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={t('footer.social.instagram')}>
              <FaInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/chang-construction-consulting" 
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-500 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={t('footer.social.linkedin')}>
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Línea */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Segunda fila */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            {t('footer.copyright')}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
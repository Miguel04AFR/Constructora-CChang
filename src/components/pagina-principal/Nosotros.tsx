"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';

export const Nosotros = () => {
  const { t } = useTranslation();


  const desenpeno = [
    {
      titulo: t('about.values.quality.title'),
      descripcion: t('about.values.quality.description'),
      icono: "✓"
    },
    {
      titulo: t('about.values.trust.title'), 
      descripcion: t('about.values.trust.description'),
      icono: "🤝"
    },
    {
      titulo: t('about.values.experience.title'),
      descripcion: t('about.values.experience.description'), 
      icono: "🏗️"
    },
    {
      titulo: t('about.values.guarantee.title'),
      descripcion: t('about.values.guarantee.description'),
      icono: "🔒"
    }
  ];

   const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
   if (element !== null) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  };

  return (
    <div id="nosotros" className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Título Principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#003153] mb-4">
            {t('about.whyChoose')}
          </h1>
          <div className="w-24 h-1 bg-[#003153] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna izquierda - Valores */}
          <div>
            <h2 className="text-2xl font-bold text-[#003153] mb-6">
              {t('about.ourValues')}
            </h2>
            
            <div className="space-y-6">
              {desenpeno.map((desenpeno, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className=" shrink-0 w-12 h-12 bg-[#003153] text-white rounded-full flex items-center justify-center text-lg">
                    {desenpeno.icono}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#003153] mb-2">
                      {desenpeno.titulo}
                    </h3>
                    <p className="text-gray-600">
                      {desenpeno.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha - Texto descriptivo */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#003153] mb-6">
              {t('about.aboutUs')}
            </h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              
              <p>{t('about.description1')}</p>
              <p>{t('about.description2')}</p>
              <p>{t('about.description3')}</p>
              
            </div>

            {/* Estadísticas*/}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#003153]">10+</div>
                <div className="text-sm text-gray-600">{t('about.yearsExperience')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#003153]">{t('about.multiple')}</div>
                <div className="text-sm text-gray-600">{t('about.provinces')}</div>
              </div>
            </div>
          </div>

        </div>

        {/* contactar */}
        <div className="text-center mt-12">
          <button onClick={ () => scrollToSection("contactanos")} className="bg-[#003153] text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold">
            {t('about.contactProject')}
          </button>
        </div>

      </div>
    </div>
  );
};
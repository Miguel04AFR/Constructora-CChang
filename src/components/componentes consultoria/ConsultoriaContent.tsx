"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormularioConsultoria } from '@/src/components/componentes consultoria/FormularioConsultoria';

export const ConsultoriaContent = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#003153] mb-4">
                        {t('consulting.title')}
                    </h1>
                    <div className="w-24 h-1 bg-[#003153] mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('consulting.subtitle')}
                    </p>
                </div>

                {/* Contenido Explicativo */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                    <div className="prose max-w-none">
                        <h2 className="text-2xl font-bold text-[#003153] mb-6">
                            {t('consulting.whatIs.title')}
                        </h2>
                        
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            {t('consulting.whatIs.description1')}
                        </p>
                        
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            {t('consulting.whatIs.description2')}
                        </p>

                        {/* Espacio para imágenes - Grid responsivo */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                                <span className="text-gray-400">
                                    {t('consulting.imagePlaceholder1')}
                                </span>
                                {/* Reemplazar con: <img src="/consultoria/planos.jpg" alt="Planos" className="w-full h-full object-cover rounded-lg" /> */}
                            </div>
                            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                                <span className="text-gray-400">
                                    {t('consulting.imagePlaceholder2')}
                                </span>
                                {/* Reemplazar con: <img src="/consultoria/analisis.jpg" alt="Análisis" className="w-full h-full object-cover rounded-lg" /> */}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-[#003153] mb-4 mt-8">
                            {t('consulting.benefits.title')}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                                <span className="text-[#003153] font-bold">✓</span>
                                <div>
                                    <h4 className="font-semibold text-[#003153]">
                                        {t('consulting.benefits.costOptimization.title')}
                                    </h4>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {t('consulting.benefits.costOptimization.description')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                                <span className="text-[#003153] font-bold">✓</span>
                                <div>
                                    <h4 className="font-semibold text-[#003153]">
                                        {t('consulting.benefits.technicalAdvice.title')}
                                    </h4>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {t('consulting.benefits.technicalAdvice.description')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                                <span className="text-[#003153] font-bold">✓</span>
                                <div>
                                    <h4 className="font-semibold text-[#003153]">
                                        {t('consulting.benefits.riskReduction.title')}
                                    </h4>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {t('consulting.benefits.riskReduction.description')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                                <span className="text-[#003153] font-bold">✓</span>
                                <div>
                                    <h4 className="font-semibold text-[#003153]">
                                        {t('consulting.benefits.qualityAssurance.title')}
                                    </h4>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {t('consulting.benefits.qualityAssurance.description')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-700 text-lg leading-relaxed">
                            {t('consulting.finalDescription')}
                        </p>
                    </div>
                </div>

                {/* Formulario de Consultoría */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-[#003153] mb-6 text-center">
                        {t('consulting.form.title')}
                    </h2>
                    <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                        {t('consulting.form.subtitle')}
                    </p>
                    
                    <FormularioConsultoria />
                </div>
            </div>
        </div>
    );
};
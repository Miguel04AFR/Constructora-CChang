"use client";

import React, { useState } from 'react';
import { FormularioSupervision } from '@/src/components/componentes supervision/FormularioSupervision';
import { useTranslation } from 'react-i18next';

export default function SupervisionPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [imgTs] = useState(() => Date.now());

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#003153] mb-6">Supervisión de proyectos</h1>

        <div className="w-full mb-6">
          {/* Wide rectangular photo */}
          <div className="w-full h-64 bg-gray-200 rounded overflow-hidden relative">
            {/* Use plain img with a stable cache-busting timestamp so the browser fetches the actual file
                and we can detect any cache/optimization issues. */}
            {/* imgTs is stable per mount to avoid changing on every render */}
            <img
              src={`/supervision.jpg?ts=${imgTs}`}
              alt="Supervisión de proyectos"
              className="w-full h-full object-cover"
              onError={(e) => {
                // fallback to a known existing image if supervision.jpg fails to load
                const target = e.currentTarget as HTMLImageElement;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = '1';
                  target.src = '/vista-3d-del-modelo-de-casa.jpg';
                }
              }}
            />
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">
          Ofrecemos un servicio integral de supervisión de proyectos para garantizar que su obra se ejecute conforme a los planos, especificaciones y plazos establecidos. Nuestro equipo profesional revisa la calidad de los materiales, coordina a los contratistas, supervisa instalaciones y entrega reportes periódicos para que usted mantenga control total del avance y presupuesto.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Adaptamos la supervisión a obras de cualquier escala: desde remodelaciones puntuales hasta proyectos completos de construcción. Trabajamos con cronogramas transparentes, controles de calidad y un enfoque en la optimización de costes sin sacrificar la experiencia de obra.
        </p>

        {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-[#003153] mb-2">Inspecciones periódicas</h4>
            <p className="text-sm text-gray-600">Visitas programadas para verificar avance, calidad y cumplimiento de especificaciones técnicas.</p>
            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 01.083 1.32l-.083.094-8 8a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l.094.083L8 12.584l7.293-7.291a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-[#003153] mb-2">Coordinación de contratistas</h4>
            <p className="text-sm text-gray-600">Gestión de subcontratistas y proveedores para reducir retrasos y conflictos en obra.</p>
            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 01.083 1.32l-.083.094-8 8a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l.094.083L8 12.584l7.293-7.291a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-[#003153] mb-2">Reportes y control presupuestario</h4>
            <p className="text-sm text-gray-600">Informes periódicos con fotografías, hitos alcanzados y desviaciones de presupuesto.</p>
            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                <svg className="w-6 h-6 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 01.083 1.32l-.083.094-8 8a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l.094.083L8 12.584l7.293-7.291a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-[#003153] mb-4">Nuestro proceso</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li><strong>Levantamiento inicial:</strong> Revisión de planos y condiciones del sitio.</li>
            <li><strong>Planificación:</strong> Definimos hitos, recursos y calendario de supervisión.</li>
            <li><strong>Supervisión continua:</strong> Inspecciones, coordinación y control de calidad.</li>
            <li><strong>Reporte final:</strong> Entrega de informe con recomendaciones y cierre de observaciones.</li>
          </ol>
        </div>

        {/* Equipo removed per request */}

        {/* FAQs */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-[#003153] mb-4">Preguntas frecuentes</h3>
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-medium">¿En cuánto tiempo puedo tener el primer reporte?</p>
              <p className="text-sm text-gray-600">Normalmente enviamos el primer reporte dentro de la primera semana de supervisión.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-medium">¿Puedo contratar supervisión por fases?</p>
              <p className="text-sm text-gray-600">Sí, ofrecemos planes por fase o por alcance según sus necesidades.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-medium">¿Incluyen control de calidad de materiales?</p>
              <p className="text-sm text-gray-600">Realizamos verificaciones en sitio y pruebas básicas; para ensayos avanzados coordinamos laboratorios colaboradores.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={() => setOpen(true)}
            className="w-full sm:w-2/3 md:w-1/2 bg-[#6B21A8] text-white py-3 rounded-xl shadow hover:bg-blue-800 transition-colors"
          >
            {t('services.contactSupervision') || 'Solicitar supervisión'}
          </button>
        </div>
      </div>

      {/* Modal popup with the consultoria form */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 z-10 max-h-[80vh]">
            <button
              aria-label={t('close') || 'Cerrar'}
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center z-20"
            >
              ×
            </button>

            <div className="p-6 overflow-auto max-h-[72vh]">
              <h2 className="text-2xl font-bold text-[#003153] mb-4 text-center">{t('consulting.form.title') || 'Solicitud de supervisión'}</h2>
              <FormularioSupervision />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

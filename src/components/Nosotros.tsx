"use client";

import React from 'react';

export const Nosotros = () => {
  const desenpeno = [
    {
      titulo: "Calidad",
      descripcion: "Materiales de primera y mano de obra especializada",
      icono: "✓"
    },
    {
      titulo: "Confianza", 
      descripcion: "Cumplimos plazos y presupuestos acordados",
      icono: "🤝"
    },
    {
      titulo: "Experiencia",
      descripcion: "Más de 10 años en el sector de la construcción", 
      icono: "🏗️"
    },
    {
      titulo: "Garantía",
      descripcion: "Respaldamos todos nuestros trabajos",
      icono: "🔒"
    }
  ];

  return (
    <div id="nosotros" className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Título Principal */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#003153] mb-4">
            ¿Por qué elegir CChang?
          </h1>
          <div className="w-24 h-1 bg-[#003153] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna izquierda - Valores */}
          <div>
            <h2 className="text-2xl font-bold text-[#003153] mb-6">
              Nuestros Valores
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
              Sobre Nosotros
            </h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>CChang Constructora</strong>, empresa cubana con más de 10 años de experiencia, 
                se especializa en proyectos para instituciones estatales y clientes privados.
              </p>
              
              <p>
                Con presencia en múltiples provincias. Contamos con un equipo altamente calificado 
                que garantiza ejecuciones eficientes y soluciones constructivas duraderas.
              </p>
              
              <p>
                Nuestra cartera refleja el compromiso con el desarrollo nacional y la excelencia 
                en cada proyecto, edificando no solo estructuras sino también relaciones sólidas 
                con nuestros clientes.
              </p>
            </div>

            {/* Estadísticas*/}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#003153]">10+</div>
                <div className="text-sm text-gray-600">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#003153]">Múltiples</div>
                <div className="text-sm text-gray-600">Provincias</div>
              </div>
            </div>
          </div>

        </div>

        {/* contactar */}
        <div className="text-center mt-12">
          <button className="bg-[#003153] text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold">
            Contáctanos para tu Proyecto
          </button>
        </div>

      </div>
    </div>
  );
};
'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [seccionActual, setSeccionActual] = useState('dashboard');/*para que sepa en que seccion estoy*/
   const [menuAbierto, setMenuAbierto] = useState(false);
  {/* cuando un estado cambia se renderiza la pagina completa por eso no es necesario llamar a renderContenido*/}

  // Datos mock para clientes
  const clientesMock = [
    { id: 1, nombre: "Ana López", email: "ana@email.com", telefono: "123-456-789", proyecto: "Casa Moderna", fechaRegistro: "2024-01-15" },
    { id: 2, nombre: "Carlos Ruiz", email: "carlos@email.com", telefono: "987-654-321", proyecto: "Edificio Zenith", fechaRegistro: "2024-01-10" },
    { id: 3, nombre: "María González", email: "maria.g@email.com", telefono: "555-123-456", proyecto: "Remodelación Baños", fechaRegistro: "2024-01-08" },
    { id: 4, nombre: "Roberto Silva", email: "roberto@email.com", telefono: "444-789-123", proyecto: "Casa Campestre", fechaRegistro: "2024-01-05" },
  ];

  // Datos mock para servicios
  const serviciosMock = [
    { id: 1, nombre: "Construcción Residencial", descripcion: "Casas y edificios residenciales", estado: "activo" },
    { id: 2, nombre: "Remodelaciones", descripcion: "Renovación integral de espacios", estado: "activo" },
    { id: 3, nombre: "Diseño Arquitectónico", descripcion: "Planos y diseño personalizado", estado: "activo" },
  ];

  // Renderizar contenido según la sección
  const renderContenido = () => {
    switch (seccionActual) {
      case 'clientes':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#003153]">Lista de Clientes</h3>
                <button className="bg-[#003153] text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm">
                  + Agregar Cliente
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proyecto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientesMock.map((cliente) => (
                    <tr key={cliente.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{cliente.nombre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{cliente.email}</div>
                        <div className="text-sm text-gray-500">{cliente.telefono}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-base leading-5 font-bold rounded-full bg-green-100 text-green-800">
                          {cliente.proyecto}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cliente.fechaRegistro}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                        <button className="text-red-600 hover:text-red-900">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'servicios':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#003153]">Gestión de Servicios</h3>
                <button className="bg-[#003153] text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm">
                  + Agregar Servicio
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {serviciosMock.map((servicio) => (
                    <tr key={servicio.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{servicio.nombre}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{servicio.descripcion}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-base leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {servicio.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                        <button className="text-red-600 hover:text-red-900">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default: // dashboard
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-[#003153] mb-4">
              Bienvenido al Panel de Administración
            </h3>
            <p className="text-gray-600">
              Selecciona una sección del menú para comenzar a gestionar.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800">Total Clientes</h4>
                <p className="text-2xl font-bold text-blue-600">{clientesMock.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800">Servicios Activos</h4>
                <p className="text-2xl font-bold text-green-600">{serviciosMock.length}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
     {/* Overlay para móvil */}
    {menuAbierto && (
      <div 
        className="fixed inset-0 z-40 lg:hidden"
        onClick={() => setMenuAbierto(false)}
      />
    )}

     {/* Sidebar */}
    <div className={`
      fixed lg:static inset-y-0 left-0 z-50
      w-64 bg-[#003153] text-white
      transform transition-transform duration-300 ease-in-out
      ${menuAbierto ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Botón Cerrar en móvil */}

      <div className="flex justify-between items-center p-6 border-b border-blue-700 lg:hidden">
        <div>
          <h1 className="text-xl font-bold">Constructora CChang</h1>
          <p className="text-sm text-blue-200 mt-1">Panel Admin</p>
        </div>
        <button 
          onClick={() => setMenuAbierto(false)}
          className="p-2 text-white hover:bg-blue-700 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>


      {/* normal */}
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-xl font-bold">Constructora CChang</h1>
        <p className="text-sm text-blue-200 mt-1">Panel Admin</p>
      </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setSeccionActual('dashboard')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  seccionActual === 'dashboard' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                📊 Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSeccionActual('clientes')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  seccionActual === 'clientes' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                👥 Clientes
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSeccionActual('servicios')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  seccionActual === 'servicios' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                🛠️ Servicios
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSeccionActual('proyectos')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  seccionActual === 'proyectos' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                📋 Proyectos
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0">
      <header className="bg-white border-b border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Botón Hamburguesa */}
            <button 
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="lg:hidden mr-4 p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {/* Icono Hamburguesa */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-[#003153]">
              {seccionActual === 'dashboard' && 'Dashboard'}
              {seccionActual === 'clientes' && 'Clientes Registrados'}
              {seccionActual === 'servicios' && 'Gestión de Servicios'}
              {seccionActual === 'proyectos' && 'Proyectos'}
            </h2>
          </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Admin User</span>
              <button className="bg-[#003153] text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </header>

        {/* Content Area dinámica */}
        <main className="flex-1 p-6 bg-gray-50">
          {renderContenido()}
        </main>
      </div>
    </div>
  );
}
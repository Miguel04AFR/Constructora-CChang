'use client';
import { Proyecto, proyectoService } from '@/src/Services/Proyecto';
import { Usuario, usuarioService } from '@/src/Services/Usuario';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AProyecto } from '@/src/components/añadir/AProyecto';

export default function AdminPage() {
  const [seccionActual, setSeccionActual] = useState<string | React.ReactNode>('dashboard');/*para que sepa en que seccion estoy*/
  const [menuAbierto, setMenuAbierto] = useState(false);
  {/* cuando un estado cambia se renderiza la pagina completa por eso no es necesario llamar a renderContenido*/}
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);
  const [cargandoProyectos, setCargandoProyectos] = useState(false);

  const [errorUsuarios, setErrorUsuarios] = useState<string | null>(null);
  const [errorProyectos, setErrorProyectos] = useState<string | null>(null);

  useEffect(() => {
    obtenerUsuarios();
    obtenerProyectos();
  }, []);

  const obtenerProyectos = async () => {
    try {
      setCargandoProyectos(true);
      setErrorProyectos(null);
      const proyectoss = await proyectoService.obtenerProyectos();
      setProyectos(proyectoss);
    } catch (error: any) {
      console.error('Error obteniendo usuarios:', error);
      setErrorProyectos(error.message || 'Error al cargar usuarios');
    } finally {
      setCargandoProyectos(false);
    }
  };

  const obtenerUsuarios = async () => {
    try {
      setCargandoUsuarios(true);
      setErrorUsuarios(null);
      const usuarioss = await usuarioService.obtenerUsuarios();
      setUsuarios(usuarioss);
    } catch (error: any) {
      console.error('Error obteniendo usuarios:', error);
      setErrorUsuarios(error.message || 'Error al cargar usuarios');
    } finally {
      setCargandoUsuarios(false);
    }
  };

  // navegar a los tarjetas
  const navegarAFormulario = (tipo: string) => {
    router.push(`/admin/anadir/${tipo}`);
  };

  // Renderizar contenido según la sección
  const renderContenido = () => {
    // SI seccionActual es un componente (no string), lo renderizamos directamente
    if (typeof seccionActual !== 'string') {
      return seccionActual;
    }

    // Si es string, usamos el switch normal
    switch (seccionActual) {
      case 'clientes':
        const formatearFecha = (fecha: Date | string) => {
          return new Date(fecha).toLocaleDateString('es-ES');
        };

        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#003153]">
                  Lista de Clientes ({usuarios.length})
                </h3>
              </div>
            </div>
            
            {cargandoUsuarios && (
              <div className="p-4 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#003153]"></div>
                <p className="mt-2 text-gray-500">Cargando usuarios...</p>
              </div>
            )}
            
            {errorUsuarios && (
              <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">Error: {errorUsuarios}</p>
                <button 
                  onClick={obtenerUsuarios}
                  className="mt-2 text-red-700 hover:underline text-sm"
                >
                  Reintentar
                </button>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Nacimiento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usuarios.length === 0 && !cargandoUsuarios && !errorUsuarios ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No hay usuarios registrados
                      </td>
                    </tr>
                  ) : (
                    usuarios.map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {usuario.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{usuario.nombre}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {usuario.apellido}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            <div className="font-medium"> {usuario.gmail}</div>
                            <div className="mt-1"> {usuario.telefono}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatearFecha(usuario.fechaNacimiento)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                          <button className="text-red-600 hover:text-red-900">Eliminar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'proyectos':
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[#003153]">
            Lista de Proyectos ({proyectos.length})
          </h3>
          <button 
            onClick={() => setSeccionActual(<AProyecto />)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Proyecto
          </button>
        </div>
      </div>
      
      {cargandoProyectos && (
        <div className="p-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#003153]"></div>
          <p className="mt-2 text-gray-500">Cargando proyectos...</p>
        </div>
      )}
      
      {errorProyectos && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">Error: {errorProyectos}</p>
          <button 
            onClick={obtenerProyectos}
            className="mt-2 text-red-700 hover:underline text-sm"
          >
            Reintentar
          </button>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {proyectos.length === 0 && !cargandoProyectos && !errorProyectos ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No hay proyectos creados aún.
                  <button 
                    onClick={() => setSeccionActual(<AProyecto />)}
                    className="mt-2 block mx-auto text-green-600 hover:text-green-800 font-medium"
                  >
                    Crear primer proyecto
                  </button>
                </td>
              </tr>
            ) : (
              proyectos.map((proyecto) => (
                <tr key={proyecto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex shrink-0">
                      <img 
                        src={`http://localhost:3001${proyecto.imagenUrl}`}
                        alt={proyecto.titulo}
                        className="h-12 w-16 object-cover rounded border border-gray-200"
                        onError={(e) => {
                          // Fallback si la imagen no carga
                          e.currentTarget.src = '/placeholder-image.jpg';
                          e.currentTarget.alt = 'Imagen no disponible';
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{proyecto.titulo}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {proyecto.descripcion}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

      case 'anadir':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#003153] mb-2">
                Añadir Nuevo Contenido
              </h3>
              <p className="text-gray-600">
                Selecciona qué tipo de contenido deseas agregar al sistema.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Añadir Casa */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer group"
                onClick={() => navegarAFormulario('casa')}
              >
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Añadir Casa</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Agregar nueva propiedad al catálogo de casas disponibles
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Crear Casa
                  </button>
                </div>
              </div>

              {/* Añadir Proyecto */}
              <div //el border-dashed es lo que hacen que sea discontinuos las rallitas de los bordes (epico)
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-green-500 hover:bg-green-50 transition-all duration-200 cursor-pointer group"
                onClick={() => setSeccionActual(<AProyecto />)}
              >
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Añadir Proyecto</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Crear nuevo proyecto
                  </p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Crear Proyecto
                  </button>
                </div>
              </div>

              {/* Añadir Remodelación jose esta te toca hacer el componente*/}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 cursor-pointer group"
                onClick={() => navegarAFormulario('remodelacion')}
              >
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Añadir Remodelación</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Agregar servicio de remodelación con detalles y precios
                  </p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Crear Remodelación
                  </button>
                </div>
              </div>
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
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800"> Total Clientes</h4>
                <p className="text-2xl font-bold text-blue-600">{usuarios.length}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800"> Casas Registradas</h4>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800"> Proyectos Activos</h4>
                <p className="text-2xl font-bold text-purple-600">{proyectos.length}</p>
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
                Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSeccionActual('clientes')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  seccionActual === 'clientes' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                Clientes
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSeccionActual('Casas')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  seccionActual === 'Casas' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                Casas
              </button>
            </li>
            <li>
              <button 
                onClick={() => setSeccionActual('proyectos')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  seccionActual === 'proyectos' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                Proyectos
              </button>
            </li>
             {/* Añadir */}
            <li>
              <button 
                onClick={() => setSeccionActual('anadir')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  seccionActual === 'anadir' ? 'bg-green-600 text-white' : 'hover:bg-green-600 text-blue-100'
                }`}
              >
               Añadir Contenido
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-[#003153]">
                {typeof seccionActual === 'string' ? (
                  <>
                    {seccionActual === 'dashboard' && 'Dashboard'}
                    {seccionActual === 'clientes' && 'Clientes Registrados'}
                    {seccionActual === 'servicios' && 'Gestión de Servicios'}
                    {seccionActual === 'proyectos' && 'Proyectos'}
                    {seccionActual === 'anadir' && 'Añadir Nuevo Contenido'}
                  </>
                ) : (
                  'Crear Nuevo Proyecto' // Cuando seccionActual es un componente
                )}
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
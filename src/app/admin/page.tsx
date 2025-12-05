'use client';
import { API_CONFIG } from '@/src/config/env';
import { Proyecto, proyectoService } from '@/src/Services/Proyecto';
import { Usuario, usuarioService } from '@/src/Services/Usuario';
import { Casa, casaService } from '@/src/Services/Casa';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AProyecto } from '@/src/components/añadir/AProyecto';
import { ACasa } from '@/src/components/añadir/ACasa';
import { ARemodelacion } from '@/src/components/añadir/ARemodelacion';
import { mensajeService } from '@/src/Services/Mensajes';
import remodelaciones from '@/src/data/remodelaciones';
import Remodelacion, { remodelacionService } from '@/src/Services/Remodelacion';
import { authService } from '@/src/auth/auth';
import { AscenderUsuario } from '@/src/components/ascender/ascenderUsuario';
import { EProyecto } from '@/src/components/editar/EProyecto';
import { ERemodelacion } from '@/src/components/editar/ERemodelacion';
import { ECasa } from '@/src/components/editar/ECasa';

export default function AdminPage() {
  const [seccionActual, setSeccionActual] = useState<string | React.ReactNode>('dashboard');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [casas, setCasas] = useState<Casa[]>([]);
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [remodelaciones, setRemodelaciones] = useState<Remodelacion[]>([])

  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);
  const [cargandoProyectos, setCargandoProyectos] = useState(false);
  const [cargandoCasas, setCargandoCasas] = useState(false);
  const [cargandoMensajes, setCargandoMensajes] = useState(false);
  const [cargandoRemodelaciones, setCargandoRemodelaciones] = useState(false);

  const [errorUsuarios, setErrorUsuarios] = useState<string | null>(null);
  const [errorProyectos, setErrorProyectos] = useState<string | null>(null);
  const [errorCasas, setErrorCasas] = useState<string | null>(null);
  const [errorMensajes, setErrorMensajes] = useState<string | null>(null);
  const [errorRemodelaciones, setErrorRemodelaciones] = useState<string | null>(null);

  useEffect(() => {
    obtenerUsuarios();
    obtenerProyectos();
    obtenerCasas();
    obtenerMensajes();
    obtenerRemodelaciones();
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

  const obtenerMensajes = async () => {
    try {
      setCargandoMensajes(true);
      setErrorMensajes(null);
      const mensajess = await mensajeService.obtenerMensajes();
      setMensajes(mensajess);

      // fecha: new Date(Date.now() - 345600000).toLocaleDateString('es-ES'),

    } catch (error: any) {
      console.error('Error obteniendo mensajes:', error);
      setErrorMensajes(error.message || 'Error al cargar mensajes');
    } finally {
      setCargandoMensajes(false);
    }
  };

  const obtenerCasas = async () => {
    try {
      setCargandoCasas(true);
      setErrorCasas(null);
      const casass = await casaService.obtenerCasas();
      setCasas(casass);
    } catch (error: any) {
      console.error('Error obteniendo casas:', error);
      setErrorCasas(error.message || 'Error al cargar casas');
    } finally {
      setCargandoCasas(false);
    }
  };

  const obtenerRemodelaciones = async () => {
    try {
      setCargandoRemodelaciones(true);
      setErrorRemodelaciones(null);
      const remodelacioness = await remodelacionService.obtenerRemodelaciones();
      setRemodelaciones(remodelacioness);
    } catch (error: any) {
      console.error('Error obteniendo remodelaciones:', error);
      setErrorCasas(error.message || 'Error al cargar remodelaciones');
    } finally {
      setCargandoRemodelaciones(false);
    }
  };

  const eliminarUsu = async (id: number) => {
    try {
     const usuarioEliminado = await usuarioService.eliminarUsuario(id);
      obtenerUsuarios(); // Refrescar la lista después de eliminar
  }
    catch (error) {
      console.error('Error eliminando usuario:', error);
    }
  }

  const eliminarPro = async (id: number) => {
    try {
     const proyectoEliminado = await proyectoService.eliminarProyecto(id);
      obtenerProyectos(); // Refrescar la lista después de eliminar
  }
    catch (error) {
      console.error('Error eliminando proyecto:', error);
    }
  }

  const eliminarMen = async (id: number) => {
    try {
     const mensajeEliminado = await mensajeService.eliminarMensaje(id);
      obtenerMensajes(); // Refrescar la lista después de eliminar
  }
    catch (error) {
      console.error('Error eliminando mensaje:', error);
    }
  }

  const eliminarCasa = async (id: number) => {
    try {
     const  casaEliminado = await casaService.eliminarCasa(id);
      obtenerCasas(); // Refrescar la lista después de eliminar
  }
    catch (error) {
      console.error('Error eliminando mensaje:', error);
    }
  }

   const eliminarRemodelacion = async (id: number) => {
    try {
     const  remodelacionEliminado = await remodelacionService.eliminarRemodelacion(id);
      obtenerRemodelaciones(); // Refrescar la lista después de eliminar
  }
    catch (error) {
      console.error('Error eliminando mensaje:', error);
    }
  }

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
                  Lista de Clientes ({usuarios.length - 1})
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
                      (usuario.gmail !== 'admin@constructora.com' ) && (
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
                          <button onClick={() => usuario.id && eliminarUsu(Number(usuario.id))} className="text-red-600 hover:text-red-900">Eliminar</button>
                          {/*sino le pongo la validacion de usuario.id no me deja*/}
                        </td>
                      </tr>
                    )))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Casas':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#003153]">
                  Lista de Casas ({casas.length})
                </h3>
                <button
                  onClick={() => setSeccionActual(<ACasa />)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nueva Casa
                </button>
              </div>
            </div>

            {cargandoCasas && (
              <div className="p-4 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#003153]"></div>
                <p className="mt-2 text-gray-500">Cargando casas...</p>
              </div>
            )}

            {errorCasas && (
              <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">Error: {errorCasas}</p>
                <button
                  onClick={obtenerCasas}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {casas.length === 0 && !cargandoCasas && !errorCasas ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                        No hay casas registradas aún.
                        <button
                          onClick={() => setSeccionActual(<ACasa />)}
                          className="mt-2 block mx-auto text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Crear primera casa
                        </button>
                      </td>
                    </tr>
                  ) : (
                    casas.map((casa) => (
                      <tr key={casa.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex shrink-0">
                            <img
                              src={`${API_CONFIG.BASE_URL}${casa.imagenUrl[0]}`}
                              alt={casa.nombre}
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
                          <div className="text-sm font-medium text-gray-900">{casa.nombre}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {casa.descripcion}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${casa.precio?.toLocaleString() || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3"
                           onClick={() => setSeccionActual(
                        <ECasa
                          casaId={casa.id} 
                          onCancel={() => setSeccionActual('Casas')}
                          onSuccess={() => {
                            setSeccionActual('Casas');
                            obtenerCasas(); // Refrescar la lista
                          }}
                        />
                      )} >Editar</button>
                          <button onClick={ () =>  casa.id && eliminarCasa(Number(casa.id))}className="text-red-600 hover:text-red-900">Eliminar</button>
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
                        src={`${process.env.NEXT_PUBLIC_API_URL}${proyecto.imagenUrl}`}
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
                    <button 
                      onClick={() => setSeccionActual(
                        <EProyecto 
                          proyectoId={proyecto.id} 
                          onCancel={() => setSeccionActual('proyectos')}
                          onSuccess={() => {
                            setSeccionActual('proyectos');
                            obtenerProyectos(); // Refrescar la lista
                          }}
                        />
                      )} 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Editar
                    </button>
                    <button onClick={() => proyecto.id && eliminarPro(proyecto.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

     case 'mensajes':
  // Función para formatear la fecha si viene del backend
  const formatearFech = (fechaString?: string) => {
    if (!fechaString) return new Date().toLocaleDateString('es-ES');
    try {
      return new Date(fechaString).toLocaleDateString('es-ES');
    } catch {
      return new Date().toLocaleDateString('es-ES');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[#003153]">
            Bandeja de Entrada ({mensajes.length})
          </h3>
          <button 
            onClick={obtenerMensajes}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
        </div>
      </div>
      
      {cargandoMensajes && (
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003153]"></div>
          <p className="mt-2 text-gray-500">Cargando mensajes...</p>
        </div>
      )}
      
      {errorMensajes && (
        <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700">Error: {errorMensajes}</p>
          </div>
          <button 
            onClick={obtenerMensajes}
            className="mt-2 text-red-700 hover:underline text-sm"
          >
            Reintentar
          </button>
        </div>
      )}
      
      {!cargandoMensajes && !errorMensajes && (
        <div className="p-6">
          {mensajes.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h4 className="text-lg font-medium text-gray-600 mb-2">No hay mensajes</h4>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                No se encontraron mensajes en la bandeja de entrada.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mensajes.map((mensaje) => (
                <div key={mensaje.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-gray-800">
                          {mensaje.user ? `${mensaje.user.nombre} ${mensaje.user.apellido}` : 'Remitente anónimo'}
                        </h5>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {mensaje.tipo}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Email:</strong> {mensaje.gmail}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Teléfono:</strong> {mensaje.telefono}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded shrink-0">
                      {formatearFech(mensaje.createdAt)}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded p-3 mt-2">
                    <h6 className="text-sm font-medium text-gray-700 mb-1">Motivo de contacto:</h6>
                    <p className="text-gray-700 text-sm whitespace-pre-wrap">
                      {mensaje.motivo}
                    </p>
                  </div>

                  <div className="mt-3 flex gap-2 flex-wrap">
                    <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Responder
                    </button>
                    <button className="text-green-600 hover:text-green-800 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Marcar como atendido
                    </button>
                    <button onClick={() => mensaje.id && eliminarMen(mensaje.id)} className="text-red-600 hover:text-red-800 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
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
                onClick={() => setSeccionActual(<ACasa />)}
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
              <div
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

              {/* Añadir Remodelación */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 cursor-pointer group"
                onClick={() => setSeccionActual(<ARemodelacion />)}
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

          case 'remodelaciones':
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[#003153]">
            Lista de Remodelaciones ({remodelaciones.length})
          </h3>
          <button
            onClick={() => setSeccionActual(<ARemodelacion />)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Remodelación
          </button>
        </div>
      </div>

      {cargandoRemodelaciones && (
        <div className="p-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#003153]"></div>
          <p className="mt-2 text-gray-500">Cargando remodelaciones...</p>
        </div>
      )}

      {errorRemodelaciones && (
        <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">Error: {errorRemodelaciones}</p>
          <button
            onClick={obtenerRemodelaciones}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accesorios</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {remodelaciones.length === 0 && !cargandoRemodelaciones && !errorRemodelaciones ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No hay remodelaciones registradas aún.
                  <button
                    onClick={() => setSeccionActual(<ARemodelacion />)}
                    className="mt-2 block mx-auto text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Crear primera remodelación
                  </button>
                </td>
              </tr>
            ) : (
              remodelaciones.map((remodelacion) => (
                <tr key={remodelacion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex shrink-0">
                      <img
                        src={`${API_CONFIG.BASE_URL}${remodelacion.imagenUrl?.[0] || '/placeholder-image.jpg'}`}
                        alt={remodelacion.nombre}
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
                    <div className="text-sm font-medium text-gray-900">{remodelacion.nombre}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {remodelacion.descripcion}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${remodelacion.precio?.toLocaleString() || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs">
                      {remodelacion.accesorios && remodelacion.accesorios.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {remodelacion.accesorios.slice(0, 2).map((accesorio, index) => (
                            <span 
                              key={index}
                              className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {accesorio}
                            </span>
                          ))}
                          {remodelacion.accesorios.length > 2 && (
                            <span className="inline-block bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">
                              +{remodelacion.accesorios.length - 2} más
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">Sin accesorios</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => setSeccionActual(
                        <ERemodelacion 
                          remodelacionId={remodelacion.id} 
                          onCancel={() => setSeccionActual('remodelaciones')}
                          onSuccess={() => {
                            setSeccionActual('remodelaciones');
                            obtenerRemodelaciones(); // Refrescar la lista
                          }}
                        />
                      )} 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => remodelacion.id && eliminarRemodelacion(remodelacion.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
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
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800"> Total Clientes</h4>
                <p className="text-2xl font-bold text-blue-600">{usuarios.length - 1 }</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800"> Casas Registradas</h4>
                <p className="text-2xl font-bold text-green-600">{casas.length}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800"> Proyectos Activos</h4>
                <p className="text-2xl font-bold text-purple-600">{proyectos.length}</p>
              </div>

              
            </div>

            

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800"> Mensajes Pendientes</h4>
                <p className="text-2xl font-bold text-orange-600">{mensajes.length}</p>
                <button 
                  onClick={() => setSeccionActual('mensajes')}
                  className="mt-2 text-orange-700 hover:text-orange-900 text-sm font-medium"
                >
                  Ver bandeja de entrada →
                </button>
              </div>

                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
          <h4 className="font-semibold text-pink-800"> Remodelaciones</h4>
          <p className="text-2xl font-bold text-pink-600">{remodelaciones.length}</p>
          <button 
            onClick={() => setSeccionActual('remodelaciones')}
            className="mt-2 text-pink-700 hover:text-pink-900 text-sm font-medium"
          >
            Ver remodelaciones →
          </button>
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
            aria-label="Cerrar menú"
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
                onClick={() => setSeccionActual('Casas')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  seccionActual === 'Casas' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                🏠 Casas
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
             <li>
      <button 
        onClick={() => setSeccionActual('remodelaciones')}
        className={`w-full text-left px-4 py-2 rounded-lg ${
          seccionActual === 'remodelaciones' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
        }`}
      >
        🛠️ Remodelaciones
      </button>
    </li>
            <li>
              <button 
                onClick={() => {
                  setSeccionActual('mensajes');
                  obtenerMensajes(); // Cargar mensajes al hacer clic
                }}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  seccionActual === 'mensajes' ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 text-blue-100'
                }`}
                
              >
                📧 Bandeja de Entrada
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
               ➕ Añadir Contenido
              </button>
            </li>
            {authService.VerificarRole('superAdmin') && (
      <li>
    <button 
      onClick={() => setSeccionActual(<AscenderUsuario />)}
      className={`w-full text-left px-4 py-2 rounded-lg ${
        seccionActual === 'ascender' ? 'bg-red-600 text-white' : 'hover:bg-red-600 text-blue-100'
         }`}
       >
         Ascender Usuario
         </button>
     </li>
          )}
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
        aria-label="Abrir menú"
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
            {seccionActual === 'Casas' && 'Gestión de Casas'}
            {seccionActual === 'proyectos' && 'Proyectos'}
            {seccionActual === 'remodelaciones' && 'Gestión de Remodelaciones'}
            {seccionActual === 'mensajes' && 'Bandeja de Entrada'}
            {seccionActual === 'anadir' && 'Añadir Nuevo Contenido'}
            {seccionActual === 'ascender' && 'Ascender Usuario a Admin'}
          </>
        ) : (
          // Añade estas condiciones para los componentes de edición
          (seccionActual as any).type?.name === 'EProyecto' ? 'Editar Proyecto' :
          (seccionActual as any).type?.name === 'ERemodelacion' ? 'Editar Remodelación' :
          (seccionActual as any).type?.name === 'ACasa' ? 'Crear Nueva Casa' :
          (seccionActual as any).type?.name === 'AProyecto' ? 'Crear Nuevo Proyecto' :
          (seccionActual as any).type?.name === 'ARemodelacion' ? 'Crear Nueva Remodelación' :
          'Editar'
        )}
      </h2>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-gray-700">Admin User</span>
      <button onClick={() =>   router.back() } className="bg-[#003153] text-white px-4 py-2 rounded-lg hover:bg-blue-800">
        Cerrar Sesión
      </button>
    </div>
  </div>
</header>

        {/* Content Area dinamica */}
        <main className="flex-1 p-6 bg-gray-50">
          {renderContenido()}
        </main>
      </div>
    </div>
  );
}
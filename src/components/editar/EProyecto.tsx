'use client';
import React, { useState, useEffect } from 'react';
import { proyectoService, Proyecto } from '@/src/Services/Proyecto';
import { useRouter } from 'next/navigation';

interface EProyectoProps {
  proyectoId?: number;
  proyecto?: Proyecto;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const EProyecto = ({ proyectoId, proyecto, onCancel, onSuccess }: EProyectoProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
  });

  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Cargar datos del proyecto si se pasa ID
  useEffect(() => {
    if (proyectoId && !proyecto) {
      cargarProyecto();
    } else if (proyecto) {
      cargarDatosProyecto();
    }
  }, [proyectoId, proyecto]);

  const cargarProyecto = async () => {
    try {
      setCargandoDatos(true);
      const proyectos = await proyectoService.obtenerProyectos();
      const proyectoEncontrado = proyectos.find((p: Proyecto) => p.id === proyectoId);
      
      if (proyectoEncontrado) {
        cargarDatosProyecto(proyectoEncontrado);
      } else {
        setMensaje('Proyecto no encontrado');
      }
    } catch (error: any) {
      console.error('Error cargando proyecto:', error);
      setMensaje(`Error: ${error.message || 'No se pudo cargar el proyecto'}`);
    } finally {
      setCargandoDatos(false);
    }
  };

  const cargarDatosProyecto = (proyectoCargado?: Proyecto) => {
    const proyectoData = proyectoCargado || proyecto;
    if (!proyectoData) return;

    setFormData({
      titulo: proyectoData.titulo || '',
      descripcion: proyectoData.descripcion || '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      if (!formData.titulo.trim()) throw new Error('El título es requerido');
      if (!formData.descripcion.trim()) throw new Error('La descripción es requerida');

      const idActual = proyecto?.id || proyectoId;
      if (!idActual) throw new Error('No se pudo identificar el proyecto');

      // Actualizar solo título y descripción
      await proyectoService.updateProyecto(idActual, {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
      });

      setMensaje('¡Proyecto actualizado exitosamente!');

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else if (onCancel) {
          onCancel();
        } else {
          router.back();
        }
      }, 1500);

    } catch (error: any) {
      console.error('Error al actualizar proyecto:', error);
      setMensaje(`Error: ${error.message || 'No se pudo actualizar el proyecto'}`);
    } finally {
      setCargando(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  if (cargandoDatos) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-2 text-gray-600">Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Editar Proyecto
          </h1>
          <p className="text-gray-600">
            Modifica solo el título y descripción. La imagen no se puede cambiar.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                Título del Proyecto *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Ej: Edificio Residencial Moderno"
              />
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del Proyecto *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-vertical"
                placeholder="Describe los detalles, características y objetivos del proyecto..."
              />
            </div>

            {mensaje && (
              <div className={`p-3 rounded-md ${
                mensaje.includes('exitosamente') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {mensaje}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={cargando}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {cargando ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Actualizando...
                  </div>
                ) : (
                  'Actualizar Proyecto'
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
'use client';
import React, { useState, useEffect } from 'react';
import { casaService, Casa } from '@/src/Services/Casa';
import { useRouter } from 'next/navigation';

interface ECasaProps {
  casaId?: string;
  casa?: Casa;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const ECasa = ({ casaId, casa, onCancel, onSuccess }: ECasaProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    ubicacion: '',
    habitaciones: '',
    banos: '',
    metrosCuadrados: '',
    descripcion: '',
  });

  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(false);
  const [mensaje, setMensaje] = useState('');


  useEffect(() => {
    if (casaId && !casa) {
      cargarCasa();
    } else if (casa) {
      cargarDatosCasa();
    }
  }, [casaId, casa]);

  const cargarCasa = async () => {
    try {
      setCargandoDatos(true);
      const casas = await casaService.obtenerCasas();

      const casaIdNumber = parseInt(casaId || '0');
      const casaEncontrada = casas.find((c: Casa) => c.id === casaId || parseInt(c.id || '0') === casaIdNumber);
      
      if (casaEncontrada) {
        cargarDatosCasa(casaEncontrada);
      } else {
        setMensaje('Casa no encontrada');
      }
    } catch (error: any) {
      console.error('Error cargando casa:', error);
      setMensaje(`Error: ${error.message || 'No se pudo cargar la casa'}`);
    } finally {
      setCargandoDatos(false);
    }
  };

  const cargarDatosCasa = (casaCargada?: Casa) => {
    const casaData = casaCargada || casa;
    if (!casaData) return;

    setFormData({
      nombre: casaData.nombre || '',
      precio: casaData.precio?.toString() || '',
      ubicacion: casaData.ubicacion || '',
      habitaciones: casaData.habitaciones?.toString() || '',
      banos: casaData.banos?.toString() || '',
      metrosCuadrados: casaData.metrosCuadrados?.toString() || '',
      descripcion: casaData.descripcion || '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    

    if (['precio', 'habitaciones', 'banos', 'metrosCuadrados'].includes(name)) {
      
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      // Validaciones básicas
      if (!formData.nombre.trim()) throw new Error('El nombre es requerido');
      if (!formData.precio || parseFloat(formData.precio) <= 0) throw new Error('El precio debe ser un número positivo');
      if (!formData.ubicacion.trim()) throw new Error('La ubicación es requerida');
      if (!formData.habitaciones || parseInt(formData.habitaciones) < 0) throw new Error('El número de habitaciones es requerido');
      if (!formData.banos || parseInt(formData.banos) < 0) throw new Error('El número de baños es requerido');
      if (!formData.metrosCuadrados || parseFloat(formData.metrosCuadrados) <= 0) throw new Error('Los metros cuadrados son requeridos');
      if (!formData.descripcion.trim()) throw new Error('La descripción es requerida');

      if (!casa && !casaId) throw new Error('No se especificó la casa a editar');

      const idActual = casa?.id || casaId;
      if (!idActual) throw new Error('No se pudo identificar la casa');

      // Convertir campos numéricos
      await casaService.updateCasa(parseInt(idActual), {
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        ubicacion: formData.ubicacion,
        habitaciones: parseInt(formData.habitaciones),
        banos: parseInt(formData.banos),
        metrosCuadrados: parseFloat(formData.metrosCuadrados),
        descripcion: formData.descripcion,
        // NO enviamos imagenUrl
      });

      setMensaje('¡Casa actualizada exitosamente!');

      setTimeout(() => {
        onSuccess ? onSuccess() : onCancel ? onCancel() : router.back();
      }, 1500);

    } catch (error: any) {
      console.error('Error al actualizar casa:', error);
      setMensaje(`Error: ${error.message || 'No se pudo actualizar la casa'}`);
    } finally {
      setCargando(false);
    }
  };

  const handleCancel = () => onCancel ? onCancel() : router.back();

  if (cargandoDatos) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Cargando casa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Editar Casa
          </h1>
          <p className="text-gray-600">
            Modifica la información de la casa. Las imágenes no se pueden cambiar.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Casa *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Casa Moderna en la Playa"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio ($) *
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: 250000"
                />
              </div>

              <div>
                <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación *
                </label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: Playa del Carmen, Quintana Roo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="habitaciones" className="block text-sm font-medium text-gray-700 mb-2">
                  Habitaciones *
                </label>
                <input
                  type="number"
                  id="habitaciones"
                  name="habitaciones"
                  value={formData.habitaciones}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: 3"
                />
              </div>

              <div>
                <label htmlFor="banos" className="block text-sm font-medium text-gray-700 mb-2">
                  Baños *
                </label>
                <input
                  type="number"
                  id="banos"
                  name="banos"
                  value={formData.banos}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: 2"
                />
              </div>

              <div>
                <label htmlFor="metrosCuadrados" className="block text-sm font-medium text-gray-700 mb-2">
                  Metros Cuadrados *
                </label>
                <input
                  type="number"
                  id="metrosCuadrados"
                  name="metrosCuadrados"
                  value={formData.metrosCuadrados}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: 120"
                />
              </div>
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                placeholder="Describe las características, ventajas y detalles de la casa..."
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
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {cargando ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Actualizando...
                  </div>
                ) : (
                  'Actualizar Casa'
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
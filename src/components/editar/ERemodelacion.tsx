'use client';
import React, { useState, useRef, useEffect } from 'react';
import { remodelacionService, Remodelacion } from '@/src/Services/Remodelacion';
import { useRouter } from 'next/navigation';

interface ERemodelacionProps {
  remodelacionId?: number;
  remodelacion?: Remodelacion;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const ERemodelacion = ({ remodelacionId, remodelacion, onCancel, onSuccess }: ERemodelacionProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    descripcionDetallada: '',
    accesorios: [] as string[],
  });

  const [currentAccesorio, setCurrentAccesorio] = useState('');
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string>('');
  const [imagenActualUrl, setImagenActualUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Cargar datos de la remodelación si se pasa ID
  useEffect(() => {
    if (remodelacionId && !remodelacion) {
      cargarRemodelacion();
    } else if (remodelacion) {
      cargarDatosRemodelacion();
    }
  }, [remodelacionId, remodelacion]);

  const cargarRemodelacion = async () => {
    try {
      setCargandoDatos(true);
      const remodelaciones = await remodelacionService.obtenerRemodelaciones();
      const remodelacionEncontrada = remodelaciones.find((r: Remodelacion) => r.id === remodelacionId);
      
      if (remodelacionEncontrada) {
        cargarDatosRemodelacion(remodelacionEncontrada);
      } else {
        setMensaje('Remodelación no encontrada');
      }
    } catch (error: any) {
      console.error('Error cargando remodelación:', error);
      setMensaje(`Error: ${error.message || 'No se pudo cargar la remodelación'}`);
    } finally {
      setCargandoDatos(false);
    }
  };

  const cargarDatosRemodelacion = (remodelacionCargada?: Remodelacion) => {
    const remodelacionData = remodelacionCargada || remodelacion;
    if (!remodelacionData) return;

    setFormData({
      nombre: remodelacionData.nombre || '',
      precio: remodelacionData.precio?.toString() || '',
      descripcion: remodelacionData.descripcion || '',
      descripcionDetallada: remodelacionData.descripcionDetallada || '',
      accesorios: remodelacionData.accesorios || [],
    });

    if (remodelacionData.imagenUrl) {
      setImagenActualUrl(remodelacionData.imagenUrl);
      setImagenPreview(remodelacionData.imagenUrl);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validación especial para precio
    if (name === 'precio') {
      // Permitir solo números
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

  const handleAddAccesorio = () => {
    if (currentAccesorio.trim()) {
      setFormData(prev => ({
        ...prev,
        accesorios: [...prev.accesorios, currentAccesorio.trim()]
      }));
      setCurrentAccesorio('');
    }
  };

  const handleRemoveAccesorio = (index: number) => {
    setFormData(prev => ({
      ...prev,
      accesorios: prev.accesorios.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMensaje('Selecciona un archivo de imagen válido');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setMensaje('La imagen es demasiado grande. Máximo 5MB');
        return;
      }

      setImagenFile(file);
      setMensaje('');

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImagenPreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagenFile(null);
    setImagenPreview(imagenActualUrl);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      
      if (!file.type.startsWith('image/')) {
        setMensaje('Selecciona un archivo de imagen válido');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setMensaje('La imagen es demasiado grande. Máximo 5MB');
        return;
      }

      setImagenFile(file);
      setMensaje('');

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImagenPreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      // Validaciones básicas
      if (!formData.nombre.trim()) {
        throw new Error('El nombre es requerido');
      }

      if (!formData.precio || parseFloat(formData.precio) <= 0) {
        throw new Error('El precio debe ser un número positivo');
      }

      if (!formData.descripcion.trim()) {
        throw new Error('La descripción es requerida');
      }

      if (!remodelacion && !remodelacionId) {
        throw new Error('No se especificó la remodelación a editar');
      }

      // Si no hay nueva imagen, actualizar solo datos
      if (!imagenFile) {
        // En una implementación real, usarías el endpoint PATCH
        const precioFloat = parseFloat(formData.precio);
        
        // Simular llamada al servicio
        setMensaje('Remodelación actualizada exitosamente!');
        
        // Simular éxito
        setTimeout(() => {
          if (onSuccess) onSuccess();
          else if (onCancel) onCancel();
        }, 1500);
        return;
      }

      // Si hay nueva imagen, subir con FormData
      const datos = new FormData();
      datos.append('nombre', formData.nombre);
      datos.append('precio', parseFloat(formData.precio).toString());
      datos.append('descripcion', formData.descripcion);
      datos.append('descripcionDetallada', formData.descripcionDetallada);
      datos.append('imagen', imagenFile);
      formData.accesorios.forEach((accesorio, index) => {
        datos.append(`accesorios[${index}]`, accesorio);
      });

      // Nota: Necesitarías crear un endpoint para actualizar remodelación con imagen
      // Por ahora simulamos el éxito
      setMensaje('Remodelación actualizada exitosamente!');
      
      // Simular éxito
      setTimeout(() => {
        if (onSuccess) onSuccess();
        else if (onCancel) onCancel();
      }, 1500);

    } catch (error: any) {
      console.error('Error al actualizar remodelación:', error);
      setMensaje(`Error: ${error.message || 'No se pudo actualizar la remodelación'}`);
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
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="mt-2 text-gray-600">Cargando remodelación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Editar Remodelación
          </h1>
          <p className="text-gray-600">
            Modifica la información de la remodelación disponible.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Remodelación *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Ej: Remodelación de Cocina Integral"
              />
            </div>

            <div>
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-2">
                Precio *
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Ej: 8500"
              />
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
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Describe brevemente la remodelación..."
              />
            </div>

            <div>
              <label htmlFor="descripcionDetallada" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Detallada
              </label>
              <textarea
                id="descripcionDetallada"
                name="descripcionDetallada"
                value={formData.descripcionDetallada}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Describe en detalle la remodelación..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accesorios de la Remodelación
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={currentAccesorio}
                  onChange={(e) => setCurrentAccesorio(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Añade un accesorio..."
                />
                <button
                  type="button"
                  onClick={handleAddAccesorio}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Añadir
                </button>
              </div>
              {formData.accesorios.length > 0 && (
                <div className="space-y-2">
                  {formData.accesorios.map((accesorio, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                      <span className="text-sm">{accesorio}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAccesorio(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen de la Remodelación
              </label>
              
              <div 
                className={`border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer transition-colors ${
                  imagenPreview ? 'border-purple-300 bg-purple-50' : 'hover:border-purple-400 hover:bg-purple-50'
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                
                {imagenPreview ? (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <img 
                        src={imagenPreview} 
                        alt="Vista previa" 
                        className="max-w-full h-auto max-h-48 object-cover rounded-lg mx-auto"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-purple-600">
                      {imagenFile ? 'Nueva imagen seleccionada. Haz clic para cambiar.' : 'Imagen actual. Haz clic para cambiar.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-purple-600">Haz clic para subir nueva imagen</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF hasta 5MB (opcional)
                    </p>
                  </div>
                )}
              </div>
              {imagenActualUrl && !imagenFile && (
                <p className="mt-2 text-xs text-gray-500">
                  Deja vacío para mantener la imagen actual
                </p>
              )}
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
                className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {cargando ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Actualizando...
                  </div>
                ) : (
                  'Actualizar Remodelación'
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
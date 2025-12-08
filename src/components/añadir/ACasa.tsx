import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { casaService } from '@/src/Services/Casa';

export const ACasa = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    ubicacion: '',
    habitaciones: '',
    banos: '',
    metrosCuadrados: '',
    descripcion: '',
  });

  const [imagenFiles, setImagenFiles] = useState<File[]>([]);
  const [imagenPreviews, setImagenPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validar que no se ingresen números negativos en campos numéricos
    if (['precio', 'habitaciones', 'banos', 'metrosCuadrados'].includes(name)) {
      // Permitir campo vacío mientras el usuario escribe
      if (value === '') {
        setFormData(prev => ({ ...prev, [name]: value }));
      } else {
        const numValue = parseFloat(value);
        // Solo actualizar si el valor es positivo o cero
        if (numValue >= 0) {
          setFormData(prev => ({ ...prev, [name]: value }));
          // Limpiar error si existe
          if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
          }
        } else {
          // Si es negativo, mostrar error y no actualizar
          setErrores(prev => ({ 
            ...prev, 
            [name]:  'Ingrese un número positivo o cero' 
          }));
          return; // No actualizar el estado con valor negativo
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Limpiar error del campo cuando el usuario empieza a escribir (para campos no numéricos)
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {};

    // Validar campos obligatorios
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'Este campo es requerido';
    }
    
    if (!formData.precio.trim()) {
      nuevosErrores.precio = 'Este campo es requerido';
    } else if (parseFloat(formData.precio) < 0) {
      nuevosErrores.precio = 'Ingrese un número positivo o cero';
    }
    
    if (!formData.ubicacion.trim()) {
      nuevosErrores.ubicacion = 'Este campo es requerido';
    }
    
    if (!formData.habitaciones.trim()) {
      nuevosErrores.habitaciones = 'Este campo es requerido';
    } else if (parseInt(formData.habitaciones) < 0) {
      nuevosErrores.habitaciones = 'Ingrese un número positivo o cero';
    }
    
    if (!formData.banos.trim()) {
      nuevosErrores.banos ='Este campo es requerido';
    } else if (parseFloat(formData.banos) < 0) {
      nuevosErrores.banos = 'Ingrese un número positivo o cero';
    }
    
    if (!formData.metrosCuadrados.trim()) {
      nuevosErrores.metrosCuadrados ='Este campo es requerido';
    } else if (parseFloat(formData.metrosCuadrados) < 0) {
      nuevosErrores.metrosCuadrados = 'Ingrese un número positivo o cero';
    }
    
    if (!formData.descripcion.trim()) {
      nuevosErrores.descripcion = 'Este campo es requerido';
    }

    // Validar imágenes
    if (imagenFiles.length === 0) {
      nuevosErrores.imagenes = 'Seleccione al menos una imagen';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Limpiar error de imágenes cuando el usuario selecciona archivos
    if (errores.imagenes) {
      setErrores(prev => ({ ...prev, imagenes: '' }));
    }

    if (files.length > 0) {
      const validFiles: File[] = [];
      const validPreviews: string[] = [];
      let hasError = false;

      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          setMensaje('Solo se permiten imágenes');
          hasError = true;
          break;
        }

        if (file.size > 5 * 1024 * 1024) {
          setMensaje('La imagen no debe superar los 5MB');
          hasError = true;
          break;
        }

        validFiles.push(file);

        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          validPreviews.push(imageUrl);
          if (validPreviews.length === validFiles.length) {
            setImagenPreviews(prev => [...prev, ...validPreviews]);
          }
        };
        reader.readAsDataURL(file);
      }

      if (!hasError) {
        setImagenFiles(prev => [...prev, ...validFiles]);
        setMensaje('');
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagenFiles(prev => prev.filter((_, i) => i !== index));
    setImagenPreviews(prev => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    // Limpiar error de imágenes cuando el usuario arrastra archivos
    if (errores.imagenes) {
      setErrores(prev => ({ ...prev, imagenes: '' }));
    }

    if (files.length > 0) {
      const validFiles: File[] = [];
      const validPreviews: string[] = [];
      let hasError = false;

      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          setMensaje('Solo se permiten imágenes');
          hasError = true;
          break;
        }

        if (file.size > 5 * 1024 * 1024) {
          setMensaje('La imagen no debe superar los 5MB');
          hasError = true;
          break;
        }

        validFiles.push(file);

        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          validPreviews.push(imageUrl);
          if (validPreviews.length === validFiles.length) {
            setImagenPreviews(prev => [...prev, ...validPreviews]);
          }
        };
        reader.readAsDataURL(file);
      }

      if (!hasError) {
        setImagenFiles(prev => [...prev, ...validFiles]);
        setMensaje('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    // Validar formulario antes de enviar
    if (!validarFormulario()) {
      setCargando(false);
      setMensaje( 'Por favor, corrija los errores del formulario');
      return;
    }

    try {
      const datos = new FormData();
      datos.append('nombre', formData.nombre);
      datos.append('precio', formData.precio);
      datos.append('ubicacion', formData.ubicacion);
      datos.append('habitaciones', formData.habitaciones);
      datos.append('banos', formData.banos);
      datos.append('metrosCuadrados', formData.metrosCuadrados);
      datos.append('descripcion', formData.descripcion);

      imagenFiles.forEach((file, index) => {
        datos.append('imagen', file);
      });

      const casaCreada = await casaService.crearCasaConImagen(datos);
      setMensaje('Casa creada exitosamente');

      // Limpiar formulario
      setFormData({
        nombre: '',
        precio: '',
        ubicacion: '',
        habitaciones: '',
        banos: '',
        metrosCuadrados: '',
        descripcion: '',
      });
      setImagenFiles([]);
      setImagenPreviews([]);
      setErrores({});

    } catch (error: any) {
      console.error('Error al crear casa:', error);
      setMensaje(` ${error.message  || 'Error al crear la casa'}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {'Agregar Casa'}
          </h1>
          <p className="text-gray-600">
            {'Complete el formulario para agregar una nueva casa'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                {'Nombre'} *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errores.nombre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t('forms.addHouse.placeholder.name') || 'Nombre de la casa'}
              />
              {errores.nombre && (
                <p className="mt-1 text-sm text-red-600">{errores.nombre}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-2">
                  {'Precio'} *
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errores.precio ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={'0'}
                />
                {errores.precio && (
                  <p className="mt-1 text-sm text-red-600">{errores.precio}</p>
                )}
              </div>

              <div>
                <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-2">
                  {'Ubicación'} *
                </label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errores.ubicacion ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={'Dirección de la casa'}
                />
                {errores.ubicacion && (
                  <p className="mt-1 text-sm text-red-600">{errores.ubicacion}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="habitaciones" className="block text-sm font-medium text-gray-700 mb-2">
                  {'Habitaciones'} *
                </label>
                <input
                  type="number"
                  id="habitaciones"
                  name="habitaciones"
                  value={formData.habitaciones}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errores.habitaciones ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={'0'}
                />
                {errores.habitaciones && (
                  <p className="mt-1 text-sm text-red-600">{errores.habitaciones}</p>
                )}
              </div>

              <div>
                <label htmlFor="banos" className="block text-sm font-medium text-gray-700 mb-2">
                  {'Baños'} *
                </label>
                <input
                  type="number"
                  id="banos"
                  name="banos"
                  value={formData.banos}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errores.banos ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={'0'}
                />
                {errores.banos && (
                  <p className="mt-1 text-sm text-red-600">{errores.banos}</p>
                )}
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
                  min="0"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errores.metrosCuadrados ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errores.metrosCuadrados && (
                  <p className="mt-1 text-sm text-red-600">{errores.metrosCuadrados}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imágenes de la Casa *
              </label>

              <div
                className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                  errores.imagenes 
                    ? 'border-red-500 bg-red-50' 
                    : imagenPreviews.length > 0 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
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
                  multiple
                  className="hidden"
                />

                {imagenPreviews.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {imagenPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Vista previa ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(index);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-blue-600">
                      {imagenPreviews.length} imagen(es) seleccionada(s). Haz clic para añadir más.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF hasta 5MB por imagen
                    </p>
                  </div>
                )}
              </div>
              {errores.imagenes && (
                <p className="mt-1 text-sm text-red-600">{errores.imagenes}</p>
              )}
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción de la Casa *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={6}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errores.descripcion ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe las características, comodidades y detalles de la casa..."
              />
              {errores.descripcion && (
                <p className="mt-1 text-sm text-red-600">{errores.descripcion}</p>
              )}
            </div>

            {mensaje && (
              <div className={`p-3 rounded-md ${
                mensaje.includes('exitosamente') || mensaje.includes('success')
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
                    Creando...
                  </div>
                ) : (
                  'Crear Casa'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    nombre: '',
                    precio: '',
                    ubicacion: '',
                    habitaciones: '',
                    banos: '',
                    metrosCuadrados: '',
                    descripcion: '',
                  });
                  setImagenFiles([]);
                  setImagenPreviews([]);
                  setErrores({});
                  setMensaje('');
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
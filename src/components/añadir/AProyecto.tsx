'use client';
import React, { useState, useRef } from 'react';
import { Proyecto, proyectoService } from '@/src/Services/Proyecto';

export const AProyecto = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    imagenUrl: ''
  });

  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMensaje('❌ Por favor, selecciona un archivo de imagen válido');
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
        
        guardarImagenLocalmente(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const guardarImagenLocalmente = async (file: File) => {
    try {
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const nombreArchivo = `proyecto-${timestamp}.${extension}`;
      const imagenUrl = `/imagenes/proyectos/${nombreArchivo}`;
      
      setFormData(prev => ({
        ...prev,
        imagenUrl: imagenUrl
      }));

      console.log('Imagen se guardará en:', imagenUrl);
      console.log('Nombre del archivo:', nombreArchivo);
      
    } catch (error) {
      console.error('Error guardando imagen local:', error);
    }
  };

  const handleRemoveImage = () => {
    setImagenFile(null);
    setImagenPreview('');
    setFormData(prev => ({ ...prev, imagenUrl: '' }));
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
        setMensaje('selecciona un archivo de imagen válido');
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
        guardarImagenLocalmente(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      if (!imagenFile) {
        throw new Error('Por favor, selecciona una imagen');
      }

      if (!formData.imagenUrl) {
        throw new Error('Error procesando la imagen');
      }

      // Crear el proyecto
      const proyectoNuevo: Proyecto = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        imagenUrl: formData.imagenUrl,
      };

      const proyectoCreado = await proyectoService.crearProyecto(proyectoNuevo);
      
      // exito
      const nombreArchivo = formData.imagenUrl.split('/').pop();
      setMensaje(` Proyecto creado exitosamente! Guarda la imagen como "${nombreArchivo}" en la carpeta src/imagenes/proyectos/`);

      // Limpiar
      setFormData({
        titulo: '',
        descripcion: '',
        imagenUrl: ''
      });
      handleRemoveImage();

    } catch (error: any) {
      console.error('Error al crear proyecto:', error);
      setMensaje(`❌ Error: ${error.message || 'No se pudo crear el proyecto'}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Añadir Nuevo Proyecto
          </h1>
          <p className="text-gray-600">
            Completa la información del nuevo proyecto de construcción.
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

            {/* Campo de subida de archivo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen del Proyecto *
              </label>
              
              <div 
                className={`border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer transition-colors ${
                  imagenPreview ? 'border-green-300 bg-green-50' : 'hover:border-green-400 hover:bg-green-50'
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
                    <p className="text-sm text-green-600">
                      Imagen seleccionada. Haz clic para cambiar.
                    </p>
                    {formData.imagenUrl && (
                      <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                        Se guardará como: <strong>{formData.imagenUrl.split('/').pop()}</strong>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-green-600">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF hasta 5MB
                    </p>
                  </div>
                )}
              </div>
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

            {/* Mensaje de estado */}
            {mensaje && (
              <div className={`p-3 rounded-md ${
                mensaje.includes('✅') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {mensaje}
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={cargando}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {cargando ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creando...
                  </div>
                ) : (
                  'Crear Proyecto'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    titulo: '',
                    descripcion: '',
                    imagenUrl: ''
                  });
                  handleRemoveImage();
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
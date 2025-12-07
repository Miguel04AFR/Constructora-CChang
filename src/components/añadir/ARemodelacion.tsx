 'use client';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { remodelacionService } from '@/src/Services/Remodelacion';

export const ARemodelacion = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    descripcionDetallada: '',
    accesorios: [] as string[],
  });

  const [currentAccesorios, setCurrentAccesorios] = useState('');
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validacion especial para precio
    if (name === 'precio') {
      // Permitir solo numeros
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

  const handleAddaccesorios = () => {
    if (currentAccesorios.trim()) {
      setFormData(prev => ({
        ...prev,
        accesorios: [...prev.accesorios, currentAccesorios.trim()]
      }));
      setCurrentAccesorios('');
    }
  };

  const handleRemoveaccesorios = (index: number) => {
    setFormData(prev => ({
      ...prev,
      accesorios: prev.accesorios.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

      if (file) {
      if (!file.type.startsWith('image/')) {
        setMensaje(t('forms.errors.invalidImage'));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setMensaje(t('forms.errors.imageTooLarge'));
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
    setImagenPreview('');
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
        setMensaje(t('forms.errors.invalidImage'));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setMensaje(t('forms.errors.imageTooLarge'));
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
      if (!imagenFile) {
        throw new Error(t('forms.errors.atLeastOneImage'));
      }

      if (formData.accesorios.length === 0) {
        throw new Error(t('forms.addRemodel.errors.atLeastOneAccessory'));
      }

     const precioFloat = parseFloat(formData.precio);
    if (isNaN(precioFloat) || precioFloat <= 0) {
      throw new Error(t('forms.addRemodel.errors.invalidPrice'));
    }

      const datos = new FormData();
      datos.append('nombre', formData.nombre);
      datos.append('precio', parseFloat(formData.precio).toString());
      datos.append('descripcion', formData.descripcion);
      datos.append('descripcionDetallada', formData.descripcionDetallada);
      datos.append('imagen', imagenFile);
      formData.accesorios.forEach((accesorios, index) => {
        datos.append(`accesorios[${index}]`, accesorios);
      });

      const remodelacionCreada = await remodelacionService.crearRemodelacionConImagen(datos);
      setMensaje(t('forms.addRemodel.success'));

      // Limpiar formulario
      setFormData({
        nombre: '',
        precio: '',
        descripcion: '',
        descripcionDetallada: '',
        accesorios: [],
      });
      handleRemoveImage();

    } catch (error: any) {
      console.error('Error al crear remodelación:', error);
      setMensaje(`${t('forms.errors.errorPrefix')}: ${error.message || t('forms.addRemodel.createError')}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t('forms.addRemodel.title')}
          </h1>
          <p className="text-gray-600">
            {t('forms.addRemodel.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms.addRemodel.name')} *
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
                {t('forms.addRemodel.price')} *
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Ej: 8500"
              />
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms.addRemodel.description')} *
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
                {t('forms.addRemodel.detailedDescription')}
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
                {t('forms.addRemodel.accessoriesLabel')} *
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={currentAccesorios}
                  onChange={(e) => setCurrentAccesorios(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Añade un accesorios..."
                />
                <button
                  type="button"
                  onClick={handleAddaccesorios}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  {t('forms.addRemodel.addAccessory')}
                </button>
              </div>
              {formData.accesorios.length > 0 && (
                <div className="space-y-2">
                  {formData.accesorios.map((accesorio, index) => (
                    <div key={index} className="flex accesorios-center justify-between bg-gray-100 p-2 rounded-md">
                      <span className="text-sm">{accesorio}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveaccesorios(index)}
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
                {t('forms.addRemodel.imageLabel')} *
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
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex accesorios-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-purple-600">
                      {t('forms.addRemodel.imageSelected')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-purple-600">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF hasta 5MB
                    </p>
                  </div>
                )}
              </div>
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
                  <div className="flex accesorios-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creando...
                  </div>
                ) : (
                  'Crear Remodelación'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    nombre: '',
                    precio: '',
                    descripcion: '',
                    descripcionDetallada: '',
                    accesorios: [],
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

'use client';
import React, { useState, useEffect } from 'react';
import { remodelacionService, Remodelacion } from '@/src/Services/Remodelacion';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface ERemodelacionProps {
  remodelacionId?: number;
  remodelacion?: Remodelacion;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const ERemodelacion = ({ remodelacionId, remodelacion, onCancel, onSuccess }: ERemodelacionProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    descripcionDetallada: '',
    accesorios: [] as string[],
  });

  const [currentAccesorio, setCurrentAccesorio] = useState('');
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
        setMensaje(t('forms.editRemodel.errors.notFound'));
      }
    } catch (error: any) {
      console.error('Error cargando remodelación:', error);
      setMensaje(`${t('forms.errors.errorPrefix')}: ${error.message || t('forms.editRemodel.errors.loadError')}`);
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'precio') {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      if (!formData.nombre.trim()) throw new Error(t('forms.editRemodel.errors.nameRequired'));
      if (!formData.precio || parseFloat(formData.precio) <= 0) throw new Error(t('forms.editRemodel.errors.priceInvalid'));
      if (!formData.descripcion.trim()) throw new Error(t('forms.editRemodel.errors.descriptionRequired'));
      if (!remodelacion && !remodelacionId) throw new Error('No se especificó la remodelación a editar');

      const idActual = remodelacion?.id || remodelacionId;
      if (!idActual) throw new Error('No se pudo identificar la remodelación');

      await remodelacionService.updateRemodelacion(idActual, {
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        descripcion: formData.descripcion,
        descripcionDetallada: formData.descripcionDetallada,
        accesorios: formData.accesorios,
      });

      setMensaje(t('forms.editRemodel.success'));

      setTimeout(() => {
        onSuccess ? onSuccess() : onCancel ? onCancel() : router.back();
      }, 1500);

    } catch (error: any) {
      console.error('Error al actualizar remodelación:', error);
      setMensaje(`${t('forms.errors.errorPrefix')}: ${error.message || t('forms.editRemodel.errors.updateError')}`);
    } finally {
      setCargando(false);
    }
  };

  const handleCancel = () => onCancel ? onCancel() : router.back();

  if (cargandoDatos) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="mt-2 text-gray-600">{t('forms.editRemodel.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('forms.editRemodel.title')}</h1>
          <p className="text-gray-600">{t('forms.editRemodel.subtitle')}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms.editRemodel.name')} *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder={t('forms.editRemodel.placeholder.name')}
              />
            </div>

            <div>
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms.editRemodel.price')} *
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
                placeholder={t('forms.editRemodel.placeholder.price')}
              />
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms.editRemodel.description')} *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder={t('forms.editRemodel.placeholder.description')}
              />
            </div>

            <div>
              <label htmlFor="descripcionDetallada" className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms.editRemodel.detailedDescription')}
              </label>
              <textarea
                id="descripcionDetallada"
                name="descripcionDetallada"
                value={formData.descripcionDetallada}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder={t('forms.editRemodel.placeholder.detailedDescription')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms.editRemodel.accessoriesLabel')}
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={currentAccesorio}
                  onChange={(e) => setCurrentAccesorio(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder={t('forms.editRemodel.placeholder.accessory')}
                />
                <button
                  type="button"
                  onClick={handleAddAccesorio}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  {t('forms.editRemodel.addAccessory')}
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
                    {t('forms.editRemodel.updating')}
                  </div>
                ) : (
                  t('forms.editRemodel.updateButton')
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
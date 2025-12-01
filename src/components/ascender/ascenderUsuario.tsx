'use client';
import React, { useState } from 'react';
import { authService } from '@/src/auth/auth';
import { usuarioService } from '@/src/Services/Usuario';

export const AscenderUsuario = () => {
  const [formData, setFormData] = useState({
    gmail: '',
    claveSecreta: ''
  });
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error'>('exito');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // Validar campos
    if (!formData.gmail || !formData.claveSecreta) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.gmail)) {
      throw new Error('Por favor ingresa un email válido');
    }

    // Verificar clave secreta
    const claveCorrecta = process.env.NEXT_PUBLIC_ASCENDER;
    if (!claveCorrecta) {
      throw new Error('Configuración de seguridad no disponible');
    }
    
    if (formData.claveSecreta !== claveCorrecta) {
      throw new Error('Clave secreta incorrecta');
    }


    const resultado = await usuarioService.AscenderUsuario(formData.gmail);
    
    //esto te develve si lo logro o no
    setMensaje(`${resultado.message}`);
    setTipoMensaje('exito');
    
    
    // Limpiar formulario después de 2 segundos
    setTimeout(() => {
      setFormData({
        gmail: '',
        claveSecreta: ''
      });
    }, 2000);

  } catch (error: any) {
    console.error('Error ascendiendo usuario:', error);
    

    let mensajeError = error.message;
    

    if (error.message.includes('Clave secreta')) {
      setFormData(prev => ({ ...prev, claveSecreta: '' }));
    }
    
    setMensaje(` ${mensajeError}`);
    setTipoMensaje('error');
    
  } finally {
    setCargando(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Ascender Usuario a Admin
          </h1>
          <p className="text-gray-600">
            Como superAdmin, puedes ascender usuarios a administradores.
          </p>
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-700">
              Esta acción otorgará privilegios de administrador al usuario.
            </p>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            

            <div>
              <label htmlFor="gmail" className="block text-sm font-medium text-gray-700 mb-2">
                Gmail del Usuario *
              </label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                value={formData.gmail}
                onChange={handleChange}
                autoComplete="off"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="usuario@ejemplo.com"
              />
            </div>


            <div>
              <label htmlFor="claveSecreta" className="block text-sm font-medium text-gray-700 mb-2">
                Clave Secreta *
              </label>
              <input
                type="password"
                id="claveSecreta"
                name="claveSecreta"
                value={formData.claveSecreta}
                 autoComplete="new-password"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingresa la clave secreta"
              />
              <p className="text-xs text-gray-500 mt-1">
                Clave requerida para autorizar esta acción
              </p>
            </div>


            {mensaje && (
              <div className={`p-3 rounded-md ${
                tipoMensaje === 'exito' 
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
                    Ascendiendo...
                  </div>
                ) : (
                  'Ascender a Admin'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    gmail: '',
                    claveSecreta: ''
                  });
                  setMensaje('');
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>


        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Información Importante
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Solo usuarios superAdmin pueden acceder a esta función
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              El usuario debe estar registrado en el sistema
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Una vez ascendido, el usuario tendrá acceso al panel de administración
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Esta acción no se puede deshacer automáticamente
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
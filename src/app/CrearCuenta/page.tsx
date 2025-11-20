'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usuarioService, type Usuario } from '@/src/Services/Usuario';
import { useTranslation } from 'react-i18next';

export default function CrearCuenta() {
  const router = useRouter();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmarPassword: '',
    telefono: '',
    fechaNacimiento: '',
    aceptaTerminos: false
  });
  const [estaCargando, setEstaCargando] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);

  const abrirCalendario = () => {
    const inputFecha = document.querySelector('#fechaNacimiento') as HTMLInputElement;
    if (inputFecha && 'showPicker' in inputFecha) {
      inputFecha.showPicker();
    }
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    let valorFiltrado = value;
    if (name === 'nombre') {
      valorFiltrado = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
      if (valorFiltrado.length > 50) {
        valorFiltrado = valorFiltrado.slice(0, 50);
      }
    } else if (name === 'apellido') {
      valorFiltrado = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
      if (valorFiltrado.length > 50) {
        valorFiltrado = valorFiltrado.slice(0, 50);
      }
    } else if (name === 'telefono') {
      valorFiltrado = value.replace(/[^0-9]/g, '');
      if (valorFiltrado.length > 8) {
        valorFiltrado = valorFiltrado.slice(0, 8);
      }
    } else if (name === 'password') {
      if (valorFiltrado.length > 40) {
        valorFiltrado = valorFiltrado.slice(0, 40);
      }
    } else if (name === 'confirmarPassword') {
      if (valorFiltrado.length > 40) {
        valorFiltrado = valorFiltrado.slice(0, 40);
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : valorFiltrado
    }));
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstaCargando(true);

    const fechaNacimiento = new Date(formData.fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    
    if (edad < 18) {
      setEstaCargando(false);
      return;
    }

    try {
      // Crear Usuario
      const nuevoUsuario: Usuario = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        gmail: formData.email,
        password: formData.password,
        telefono: formData.telefono,
        fechaNacimiento: new Date(formData.fechaNacimiento)
      };

      const usuarioCreado = await usuarioService.crearUsuario(nuevoUsuario);
      setMostrarExito(true);
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (error: any) {
      console.error('Error al crear cuenta:', error);
    } finally {
      setEstaCargando(false);
    }
  };

  // Calcular fecha máxima (18 años atrás)
  const calcularFechaMaxima = () => {
    const hoy = new Date();
    const fechaMaxima = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
    return fechaMaxima.toISOString().split('T')[0];
  };

  // Calcular fecha mínima (100 años atrás)
  const calcularFechaMinima = () => {
    const hoy = new Date();
    const fechaMinima = new Date(hoy.getFullYear() - 100, hoy.getMonth(), hoy.getDate());
    return fechaMinima.toISOString().split('T')[0];
  };

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-lvh mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-5">
          <div className="flex justify-center">
            <img 
              src="/constructora-removebg-preview.png" 
              alt="Logo Constructora CChang"
              className="w-auto h-auto object-contain" 
            />
          </div>
          <h1 className="text-3xl font-bold text-[#003153] mb-2 mt-0">
            {t('newUser.title')}
          </h1>
          <p className="text-gray-600">
            {t('newUser.subtitle')}
          </p>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('newUser.name')} *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={manejarCambio}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
                placeholder={t('newUser.namePlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('newUser.lastname')} *
              </label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={manejarCambio}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
                placeholder={t('newUser.lastnamePlaceholder')}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('newUser.email')} *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={manejarCambio}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
              placeholder={t('newUser.yourEmail')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('newUser.telephone')} *
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={manejarCambio}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
              placeholder="52325437"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('newUser.dateOfbirth')} *
            </label>
            <input
              id='fechaNacimiento'
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={manejarCambio}
              required
              onKeyDown={(e) => e.preventDefault()}
              max={calcularFechaMaxima()}
              min={calcularFechaMinima()}
              onClick={abrirCalendario}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
              placeholder={t('newUser.dateOfbirth')}
            />
            <p className="text-xs text-gray-500 mt-1">
              {t('newUser.adult')}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('newUser.password')} *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={manejarCambio}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
              placeholder={t('newUser.passwordPlaceHolder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('newUser.confirmPassword')} *
            </label>
            <input
              type="password"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={manejarCambio}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
              placeholder={t('newUser.confirmPasswordPlaceHolder')}
            />
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={manejarCambio}
              required
              aria-label="Acepto los términos y condiciones y la política de privacidad"
              className="w-4 h-4 text-[#003153] border-gray-300 rounded focus:ring-[#003153] mt-1"
            />
            <label className="text-sm text-gray-600">
              {t('newUser.termsPlaceHolder')}{' '}
              <Link href="/terminos" className="text-[#003153] hover:underline">
                {t('newUser.termsPlaceHolder')}
              </Link>{' '}
              {t('newUser.and')}{' '}
              <Link href="/privacidad" className="text-[#003153] hover:underline">
                {t('newUser.privatePolicy')}
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={estaCargando}
            className="w-full bg-[#003153] text-white py-3 rounded-lg hover:bg-blue-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {estaCargando ? t('newUser.creating') : t('newUser.create')}
          </button>

          {/* Enlace a Login */}
          <div className="text-center">
            <p className="text-gray-600">
              {t('newUser.question')}{' '}
              <Link href="/" className="text-[#003153] hover:underline font-semibold">
                {t('newUser.getBack')}
              </Link>
            </p>
          </div>
        </form>
      </div>
        {mostrarExito && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
          
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
       
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            ¡Cuenta Creada!
          </h3>
          <p className="text-gray-600 mb-6">
            Tu cuenta ha sido creada exitosamente.
          </p>
          
         
          <div className="text-sm text-gray-500">
            Redirigiendo en 2 segundos...
          </div>
          
        
          <div className="mt-4">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
        )}
    </main>
  );
}
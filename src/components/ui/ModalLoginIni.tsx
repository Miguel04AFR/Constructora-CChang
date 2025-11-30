"use client";

import React, { useState, useEffect } from 'react';
import type { ModalLoginProps } from '@/src/Services/ModalLoginProps';
import { IoClose, IoMail, IoLockClosed, IoEye, IoEyeOff, IoCheckmarkCircle, IoWarning } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { authService } from '@/src/auth/auth';

export const ModalLoginIni = ({ isOpen, onClose, usuario }: ModalLoginProps) => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [inicio, setInicio] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setLoginInput('');
      setPassword('');
      setError('');
      setShowPassword(false);
      setCargando(false);
      setInicio(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const hadleChangeLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput(e.target.value);
    setError('');
  };

  const hadleSumit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    if (!loginInput || !password) {
      setCargando(false);
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      const result = await authService.login({
        gmail: loginInput,
        password: password
      });

      // Usar authService para verificar si es admin
      setInicio(true);
      
      setTimeout(() => {
        setLoginInput('');
        setPassword('');
        setInicio(false);
        setCargando(false);
        
        if (usuario) {
          usuario(result.user.nombre);
        }

        onClose();

        // Redirigir basado en la verificación real
        if (result.user.role === 'admin') {
        router.push('/admin');
      } else {
        // Recargar la página para actualizar estado
        router.refresh();
      }
      
    }, 2000);
      
    } catch (error: any) {
      setCargando(false);
      setError(error.message || 'Credenciales incorrectas');
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-gray-200">

        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#003153]">
            {!inicio ? t('login.title') : t('login.success')}
          </h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <IoClose size={24} />
          </button>
        </div>
      
        {inicio ? (
          <div className="p-8 text-center">
            <IoCheckmarkCircle className="mx-auto text-green-500 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {t('login.successTitle')}
            </h3>
            <p className="text-gray-600">{t('login.welcomeBack')}</p>
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {t('login.closingAutomatically')}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={hadleSumit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <IoWarning className="text-red-500 flex shrink-0" size={20} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className='block text-sm font-medium text-gray-700' htmlFor='email'>
                {t('login.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoMail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  name='email'
                  placeholder={t('login.emailPlaceholder')}
                  className='w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003153] focus:border-transparent transition-all'
                  value={loginInput}
                  onChange={hadleChangeLoginInput}
                  required
                  disabled={cargando}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className='block text-sm font-medium text-gray-700' htmlFor='password'>
                {t('login.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLockClosed className="text-gray-400" size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name='password'
                  placeholder={t('login.passwordPlaceholder')}
                  className='w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003153] focus:border-transparent transition-all'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={cargando}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={cargando}
                >
                  {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-[#003153] border-gray-300 rounded focus:ring-[#003153]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  {t('login.rememberMe')}
                </label>
              </div>
              <button type="button" className="text-sm text-[#003153] hover:text-blue-700 transition-colors font-medium">
                {t('login.forgotPassword')}
              </button>
            </div>

            <button 
              type="submit"
              disabled={cargando}
              className='w-full bg-[#003153] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-[#003153] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {cargando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {t('login.signingIn')}
                </>
              ) : (
                t('login.signIn')
              )}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {t('login.noAccount')}{' '}
                <a href='/CrearCuenta'>
                  <button type="button" className="text-[#003153] hover:text-blue-700 font-medium transition-colors">
                    {t('login.createAccount')}
                  </button>
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
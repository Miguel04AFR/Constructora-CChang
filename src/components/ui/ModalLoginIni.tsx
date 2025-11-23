"use client";

import React, { useState } from 'react'
import type { ModalLoginProps } from '@/src/Services/ModalLoginProps';
import { IoClose, IoMail, IoPerson, IoLockClosed, IoEye, IoEyeOff, IoCheckmarkCircle } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/src/contexts/AuthContext';

export const ModalLoginIni = ({isOpen, onClose, onLoginSuccess}: ModalLoginProps) => {
const [loginInput, setLoginInput] = useState('');
const [password,setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [esGmail, setesGmail] = useState(false);
const [inicio,setInicio] = useState(false);
const { t } = useTranslation();
const { login } = useAuth();

if(!isOpen) return null;

const hadleChangeLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput(e.target.value);
    setesGmail(e.target.value.includes('@gmail'));
}

const hadleSumit = (e: React.FormEvent) => {
    e.preventDefault();
    Iniciar();
}

const Iniciar = () => {
  if(esGmail){
    if(password=='123456' && loginInput=='hola@gmail.com'){
      setInicio(true);
      login(loginInput);
      setTimeout(() => {
        setLoginInput('');
        setPassword('');
        setInicio(false);
        onClose();
        // Notificar que el login fue exitoso
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }, 1000);
    } else {
    }
  } else {
    if(password=='123456' && loginInput=='usuario'){
      setInicio(true);
      login(loginInput);
      setTimeout(() => {
        setLoginInput('');
        setPassword('');
        setInicio(false);
        onClose();
        // Notificar que el login fue exitoso
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }, 1000);
    } else {
    }
  }
}

  return (/* el bg-opacity y backdrop-blur es para el fondo difuminado */

    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-gray-200">

       <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#003153]">
            {!inicio ? t('login.title') : t('login.success')}
          </h2>
          <button /*una X de cerrar */
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            aria-label={t('common.close')}
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
          {/* Campo Usuario/Gmail */}
          <div className="space-y-2">
            <label className='block text-sm font-medium text-gray-700' htmlFor='usu/gm'>
              {t('login.email')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {esGmail ? (
                  <IoMail className="text-gray-400" size={20} />
                ) : (
                  <IoPerson className="text-gray-400" size={20} />
                )}
              </div>
              <input
                type="text"
                id="usu/gm"
                name='usu/gm'
                placeholder={t('login.emailPlaceholder')}
                className='w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003153] focus:border-transparent transition-all'
                value={loginInput}
                onChange={hadleChangeLoginInput}
                required
              />
            </div>
          </div>

          {/* Campo Contraseña */}
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
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? t('login.hidePassword') : t('login.showPassword')}
              >
                {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Recordarme y olvidaste la contraseña */}
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

          {/* Botón de enviar */}
          <button 
            type="submit"
            className='w-full bg-[#003153] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-[#003153]'
          >
            {t('login.signIn')}
          </button>

          {/* Registro */}
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
  )
}
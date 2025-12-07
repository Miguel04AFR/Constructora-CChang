'use client';

import React, { useState } from 'react';
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
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsScrolledToBottom, setTermsScrolledToBottom] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const termsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (showTermsModal && termsRef.current) {
      const el = termsRef.current;
      if (el.scrollHeight <= el.clientHeight + 1) setTermsScrolledToBottom(true);
      else setTermsScrolledToBottom(false);
    }
  }, [showTermsModal]);

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
    fechaNacimiento.setMinutes(fechaNacimiento.getMinutes() + fechaNacimiento.getTimezoneOffset());//con esto logro que no salga la hora
    
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
              onChange={(e) => {
                const checked = e.target.checked;
                // If trying to check, enforce that terms/conditions were accepted
                if (checked) {
                  if (termsAccepted) {
                    setFormData(prev => ({ ...prev, aceptaTerminos: true }));
                    setAlertMessage('');
                  } else {
                    setAlertMessage(t('newUser.termsAcceptanceRequired'));
                    // Do not set the checkbox
                    setFormData(prev => ({ ...prev, aceptaTerminos: false }));
                  }
                } else {
                  // allow unchecking anytime
                  setFormData(prev => ({ ...prev, aceptaTerminos: false }));
                  setAlertMessage('');
                }
              }}
              required
              aria-label="Acepto los términos y condiciones y la política de privacidad"
              className="w-4 h-4 text-[#003153] border-gray-300 rounded focus:ring-[#003153] mt-1"
            />
            <label className="text-sm text-gray-600">
              {t('newUser.termsPlaceHolder')}{' '}
              <button type="button" onClick={() => { setShowTermsModal(true); setTermsScrolledToBottom(false); }} className="inline-block w-auto text-[#003153] hover:underline px-0 py-0">
                {t('newUser.termsPlaceHolder')} y Política de privacidad
              </button>
            </label>
          </div>
          {alertMessage && (
            <div className="text-sm text-red-600 mt-2">{alertMessage}</div>
          )}

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
      {/* Terms and Privacy Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowTermsModal(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 z-10 max-h-[80vh]">
            <div className="p-4 flex justify-between items-start">
              <h2 className="text-xl font-bold text-[#003153]">{t('newUser.termsTitle')}</h2>
            </div>
            <div
              ref={termsRef}
              className="p-4 overflow-auto max-h-[64vh] text-sm text-gray-700 space-y-4"
              onScroll={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (el.scrollHeight - el.scrollTop <= el.clientHeight + 10) {
                  setTermsScrolledToBottom(true);
                }
              }}
            >
              <h3 className="font-bold text-lg text-[#003153]">{t('newUser.termsSection')}</h3>
              <p>1. Introducción: Estos términos regulan el uso de los servicios proporcionados por Constructora CChang. Al aceptar, usted declara que ha leído y entendido las condiciones.</p>
              <p>2. Alcance: Nuestra supervisión incluye inspecciones, reportes y coordinación, según los paquetes contratados. No incluye suministros ni mano de obra directa salvo que se acuerde.</p>
              <p>3. Responsabilidades: La empresa supervisora informará y recomendará, pero no sustituye las responsabilidades legales del contratista.</p>
              <p>4. Pago y facturación: Los servicios se facturan según alcance y plazos. Cualquier modificación puede generar costos adicionales.</p>
              <p>5. Confidencialidad: Los datos compartidos se tratarán con confidencialidad y conforme a la política de privacidad.</p>
              <p>6. Limitación de responsabilidad: Constructora CChang no será responsable de daños derivados de información inexacta proporcionada por terceros.</p>
              <p>7. Fuerza mayor: No seremos responsables por retrasos ocasionados por causas fuera de nuestro control razonable.</p>
              <p>8. Subcontratación: Podemos subcontratar tareas específicas manteniendo responsabilidad final ante el cliente.</p>
              <p>9. Comunicación: Todas las notificaciones se realizarán por correo electrónico o teléfono registrados.</p>
              <p>10. Modificaciones: Nos reservamos el derecho de actualizar estos términos; las versiones aplicables serán las publicadas en el sitio.</p>

              <h3 className="font-bold text-lg text-[#003153] mt-8">{t('newUser.privacySection')}</h3>
              <p>1. Recolección: Recopilamos datos personales necesarios para la prestación del servicio (nombre, contacto, datos de obra).</p>
              <p>2. Uso: Los datos se usan para comunicación, facturación y cumplimiento contractual.</p>
              <p>3. Conservación: Conservamos los datos durante el tiempo necesario para fines contractuales y legales.</p>
              <p>4. Derechos: Usted puede solicitar acceso, rectificación o eliminación de sus datos según la ley aplicable.</p>
              <p>5. Terceros: No compartimos información comercial con terceros sin su consentimiento, salvo proveedores necesarios para la prestación del servicio.</p>
              <p>6. Seguridad: Implementamos medidas razonables para proteger la información.</p>
              <p>7. Transferencias internacionales: Cuando sea necesario, podemos transferir datos a proveedores ubicados en otras jurisdicciones, siempre con las salvaguardas adecuadas.</p>
              <p>8. Cookies: Empleamos cookies para mejorar la experiencia; puede gestionar sus preferencias en su navegador.</p>
              <p>9. Contacto: Para consultas sobre privacidad puede escribir a privacidad@constructora.example.</p>
              <p className="pt-8">{t('newUser.termsEndNote')}</p>
            </div>
            <div className="p-4 flex justify-end gap-3 border-t">
              <button onClick={() => setShowTermsModal(false)} className="px-4 py-2 rounded bg-gray-200">Cerrar</button>
              <button
                onClick={() => {
                  setTermsAccepted(true);
                  setFormData(prev => ({ ...prev, aceptaTerminos: true }));
                  setShowTermsModal(false);
                  setAlertMessage('');
                }}
                disabled={!termsScrolledToBottom}
                className={`px-4 py-2 rounded ${termsScrolledToBottom ? 'bg-[#003153] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Acepto
              </button>
            </div>
          </div>
        </div>
      )}
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
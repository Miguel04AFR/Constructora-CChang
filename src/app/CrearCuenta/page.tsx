'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Usuario } from '@/src/Services/Usuario';

export default function CrearCuenta() {
  const router = useRouter();
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


  const abrirCalendario = () => {
  const inputFecha = document.querySelector('#fechaNacimiento') as HTMLInputElement;
   if (inputFecha && 'showPicker' in inputFecha) {// && showPicker in inputfecha verifica que el metodo showpicker este en el input d ela fecha
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
    }
      else if (name === 'apellido') {
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
      // Crear objeto Usuario directamente
      const nuevoUsuario: Usuario = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        password: formData.password,
        telefono: formData.telefono,
        fechaNacimiento: new Date(formData.fechaNacimiento)
      };

      console.log('Usuario a crear:', nuevoUsuario);
      
      // Aquí iría la llamada a la API
      // await registrarUsuario(nuevoUsuario);
      
      // Simular registro exitoso 
      setTimeout(() => {
        router.push('/cuenta-creada');
      }, 1000);
      
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      alert('Error al crear la cuenta. Intenta nuevamente.');
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
    <div className="flex justify-center"> {/* Contenedor solo para la imagen sino no se centra la hp*/}
    <img 
      src="/constructora-removebg-preview.png" 
      alt="Logo Constructora CChang"
      className="w-auto h-auto object-contain" 
    />
  </div>
  <h1 className="text-3xl font-bold text-[#003153] mb-2 mt-0">
    Crear Cuenta
  </h1>
  <p className="text-gray-600">
    Únete a Constructora CChang
  </p>
</div>

        <form onSubmit={manejarEnvio} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={manejarCambio}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellido *
              </label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={manejarCambio}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
                placeholder="Tu apellido"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={manejarCambio}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono *
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
              Fecha de Nacimiento *
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
               onFocus={abrirCalendario} 
              onClick={abrirCalendario}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
              placeholder='fecha de Nacimiento'
            />
            <p className="text-xs text-gray-500 mt-1">
              Debes ser mayor de 18 años
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={manejarCambio}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Contraseña *
            </label>
            <input
              type="password"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={manejarCambio}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003153] focus:border-transparent"
              placeholder="Repite tu contraseña"
            />
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={manejarCambio}
              required
              className="w-4 h-4 text-[#003153] border-gray-300 rounded focus:ring-[#003153] mt-1"
              placeholder='terminos y condicione'
            />
            <label className="text-sm text-gray-600">
              Acepto los{' '}
              <Link href="/terminos" className="text-[#003153] hover:underline">
                términos y condiciones
              </Link>{' '}
              y la{' '}
              <Link href="/privacidad" className="text-[#003153] hover:underline">
                política de privacidad
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={estaCargando}
            className="w-full bg-[#003153] text-white py-3 rounded-lg hover:bg-blue-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {estaCargando ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>

          {/* Enlace a Login */}
          <div className="text-center">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/" className="text-[#003153] hover:underline font-semibold">
                Volver
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
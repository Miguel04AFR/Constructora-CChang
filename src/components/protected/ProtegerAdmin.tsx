'use client';
import { useEffect } from 'react';
import { useAuth } from '@/src/contexts/AuthContext'; 
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export const ProtegerAdmin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);
  const { isAuthenticated, user, loading } = useAuth(); // Datos del contexto

  useEffect(() => {
    // Esperar a que el contexto termine de cargar
    if (loading) return;

    const verificarAcceso = async () => {
      // Verificar si está autenticado
      if (!isAuthenticated) {
        router.push('/');
        return;
      }

      // Verificar si es admin o superAdmin
      if (!user) {
        router.push('/');
        return;
      }


      const userRole = typeof user.role === 'string' 
        ? user.role 
        : user.role?.name;

      if (userRole !== 'admin' && userRole !== 'superAdmin') {
        router.push('/');
        return;
      }

      setVerificando(false);
    };

    verificarAcceso();
  }, [router, isAuthenticated, user, loading]);

  if (loading || verificando) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003153] mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
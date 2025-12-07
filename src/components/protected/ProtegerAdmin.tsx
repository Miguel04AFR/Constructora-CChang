'use client';
import { useEffect } from 'react';
import { authService } from '@/src/auth/auth';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export const ProtegerAdmin =  ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const verificarAcceso = () => {
      if (!authService.isAuthenticated()) {
        router.push('/');
        return;
      }

      if (!authService.isAdmin()) {
        router.push('/');
        return;
      }

      setVerificando(false);
    };

    verificarAcceso();
  }, [router]);

  if (verificando) {
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

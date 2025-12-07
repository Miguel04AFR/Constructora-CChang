// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { authService } from '@/src/auth/auth'; 

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  login: (credentials: { gmail: string; password: string }) => Promise<boolean>; 
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  verificarRol: (roleName: string) => boolean;
  esAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  
  // REF para el timer de refresh automatico
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
const isLoggingOutRef = useRef(false); 

  //  refresh automatico (23 horas)
  const scheduleAutoRefresh = useCallback(() => {
    // Limpiar timer anterior
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
    
    // Solo programar si está autenticado
    if (isAuthenticated) {
      console.log('Programando refresh automatico en 23 horas...');
      
      refreshTimerRef.current = setTimeout(async () => {

        try {
          await authService.refreshToken();
          console.log('✅ Refresh automático completado');
          
          // Reprogramar el siguiente refresh
          scheduleAutoRefresh();
        } catch (error) {
          console.error('Error en refresh automatico:', error);
        }
      }, 23 * 60 * 60 * 1000); // 23 horas
    }
  }, [isAuthenticated]);

  // verificar autenticacion
  const checkAuth = useCallback(async () => {


   if (isLoggingOutRef.current) {
    return;
  }


    setLoading(true);
    try {
      // Intentar validar sesión
      const validUser = await authService.validateSession();
      
      if (validUser) {
        setIsAuthenticated(true);
        setUser(validUser);
        
        // refresh automatico
        scheduleAutoRefresh();
      } else {
        // si no hay sesion vlida, intentar refresh
        console.log('🔄 Sesión inválida, intentando refresh...');
        const refreshResult = await authService.refreshToken();
        
        if (refreshResult?.success && refreshResult.user) {
          setIsAuthenticated(true);
          setUser(refreshResult.user);
          
          // programar refresh automatico despues del refresh exitoso
          scheduleAutoRefresh();
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [scheduleAutoRefresh]);

  // verificar autenticacion al cargar
  useEffect(() => {
    checkAuth();
    
    // verificar (cada 12 horas como backup)
    const interval = setInterval(checkAuth, 12 * 60 * 60 * 1000); // 12 horas
    
    checkIntervalRef.current = interval;
    return () => {
     if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }
      // Limpiar timer al desmontar
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [checkAuth]);

  // Verificar cuando la pestana vuelve a estar visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated && !isLoggingOutRef.current) {
        console.log('Pestana visible');
        checkAuth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, checkAuth]);

  const login = async (credentials: { gmail: string; password: string }): Promise<boolean> => {
    try {
      const result = await authService.login(credentials);
      
      if (result?.success) {
        setIsAuthenticated(true);
        setUser(result.user);
        
        // programar refresh automatico despues del login
        scheduleAutoRefresh();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };


  const logout = async () => {
    isLoggingOutRef.current = true;
  setLoading(true);
  try {
    // Cancelar refresh automatico ANTES de hacer logout
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
     if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
    
    // Hacer logout en backend
    await authService.logout();
    
    // Limpiar estado local
    setIsAuthenticated(false);
    setUser(null);
    
    console.log('Logout completo');
    
  } catch (error) {
    console.error('Error en logout:', error);
  } finally {
    setLoading(false);
  setTimeout(() => {
      isLoggingOutRef.current = false;
      console.log('✅ Flag de logout desactivado');
    }, 3000);
  }
};


  const value: AuthContextType = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuth,
    verificarRol: (rol: string) => {
      if (!user) return false;
      const userRole = typeof user.role === 'string' ? user.role : user.role?.name;
      return userRole === rol;
    },
    esAdmin: () => {
      if (!user) return false;
      const userRole = typeof user.role === 'string' ? user.role : user.role?.name;
      return userRole === 'admin' || userRole === 'superAdmin';
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
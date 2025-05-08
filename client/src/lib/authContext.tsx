import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, AuthUser } from '@/lib/types';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    error: null,
  });
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setAuthState({
          user: userData,
          token,
          isLoading: false,
          error: null,
        });
      } else {
        // Token is invalid or expired
        localStorage.removeItem('token');
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        error: error.message,
      });
    }
  };

  const login = async (username: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await apiRequest('POST', '/api/auth/login', { username, password });
      const data = await response.json();
      
      localStorage.setItem('token', data.token);
      
      setAuthState({
        user: data.user,
        token: data.token,
        isLoading: false,
        error: null,
      });
      
      toast({
        title: 'Успешный вход',
        description: 'Вы успешно вошли в систему',
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Ошибка входа',
      }));
      
      toast({
        title: 'Ошибка входа',
        description: error.message || 'Проверьте имя пользователя и пароль',
        variant: 'destructive',
      });
    }
  };

  const register = async (userData: any) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await apiRequest('POST', '/api/auth/register', userData);
      const data = await response.json();
      
      localStorage.setItem('token', data.token);
      
      setAuthState({
        user: data.user,
        token: data.token,
        isLoading: false,
        error: null,
      });
      
      toast({
        title: 'Регистрация успешна',
        description: 'Ваш аккаунт успешно создан',
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Ошибка регистрации',
      }));
      
      toast({
        title: 'Ошибка регистрации',
        description: error.message || 'Произошла ошибка при регистрации',
        variant: 'destructive',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });
    
    toast({
      title: 'Выход выполнен',
      description: 'Вы успешно вышли из системы',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        isAuthenticated: !!authState.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

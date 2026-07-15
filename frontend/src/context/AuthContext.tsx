import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { login as loginApi } from '../api';

interface AuthContextType {
  user: User | null;
  login: (name: string, role: 'parent' | 'child') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('family_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('family_user');
      }
    }
  }, []);

  const login = async (name: string, role: 'parent' | 'child') => {
    const { data } = await loginApi(name, role);
    if (data.user) {
      setUser(data.user);
      localStorage.setItem('family_user', JSON.stringify(data.user));
    } else {
      throw new Error(data.message || '登录失败');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('family_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

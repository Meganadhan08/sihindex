import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SignupData } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  signup: (data: SignupData) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('herbTrace_user');
    const storedUsers = localStorage.getItem('herbTrace_users');
    
    // Initialize with empty users array if not exists
    if (!storedUsers) {
      localStorage.setItem('herbTrace_users', JSON.stringify([]));
    }
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('herbTrace_users') || '[]');
    const foundUser = storedUsers.find((u: User) => u.email === email);
    
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      localStorage.setItem('herbTrace_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Get existing users
      const storedUsers = JSON.parse(localStorage.getItem('herbTrace_users') || '[]');
      
      // Check if user already exists
      if (storedUsers.find((u: User) => u.email === data.email)) {
        setIsLoading(false);
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        password: data.password,
        role: data.role,
        name: data.fullName,
        organization: data.organization,
        phone: data.phone,
        licenseNumber: `${data.role.toUpperCase()}-${Date.now()}`,
        location: '',
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      storedUsers.push(newUser);
      localStorage.setItem('herbTrace_users', JSON.stringify(storedUsers));
      localStorage.setItem('herbTrace_user', JSON.stringify(newUser));
      
      setUser(newUser);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('herbTrace_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
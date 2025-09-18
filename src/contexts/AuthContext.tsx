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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('herbTrace_user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check for admin login
    if (email === 'admin@herbtrace.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-001',
        email: 'admin@herbtrace.com',
        role: 'farmer', // We'll handle admin separately
        name: 'System Administrator',
        location: 'System',
        contact_number: '+91 9999999999',
        createdAt: new Date().toISOString()
      };
      
      setUser(adminUser);
      localStorage.setItem('herbTrace_user', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    }
    
    // Get users from localStorage (in real app, this would be API call)
    const storedUsers = JSON.parse(localStorage.getItem('herbTrace_users') || '[]');
    const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('herbTrace_user', JSON.stringify(userWithoutPassword));
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
      if (storedUsers.find((u: any) => u.email === data.email)) {
        setIsLoading(false);
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        role: data.role,
        name: data.name,
        location: data.location,
        contact_number: data.contact_number,
        organization: data.organization,
        licenseNumber: `${data.role.toUpperCase()}-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      
      // Save user with password for login (in real app, password would be hashed)
      const userWithPassword = { ...newUser, password: data.password };
      storedUsers.push(userWithPassword);
      localStorage.setItem('herbTrace_users', JSON.stringify(storedUsers));
      
      // Set current user (without password)
      setUser(newUser);
      localStorage.setItem('herbTrace_user', JSON.stringify(newUser));
      
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
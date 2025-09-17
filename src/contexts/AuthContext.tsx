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
    
    // For demo purposes, we'll just check if user exists in localStorage
    // In real app, this would be API call to backend
    const demoUsers = [
      { email: 'farmer@example.com', password: 'password123', role: 'farmer', name: 'John Farmer' },
      { email: 'lab@example.com', password: 'password123', role: 'lab', name: 'Lab Technician' },
      { email: 'processor@example.com', password: 'password123', role: 'processor', name: 'Processor Manager' }
    ];
    
    const foundUser = demoUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const user: User = {
        id: Date.now().toString(),
        email: foundUser.email,
        role: foundUser.role as 'farmer' | 'lab' | 'processor',
        name: foundUser.name,
        location: 'Demo Location',
        contact_number: '+91 9876543210',
        createdAt: new Date().toISOString()
      };
      
      setUser(user);
      localStorage.setItem('herbTrace_user', JSON.stringify(user));
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
      
      // Set current user
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
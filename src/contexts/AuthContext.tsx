import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'farmer@example.com',
    role: 'farmer',
    name: 'Ravi Kumar',
    organization: 'Organic Herbs Farm',
    licenseNumber: 'FRM-2024-001',
    location: 'Mysore, Karnataka',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    email: 'lab@example.com',
    role: 'lab',
    name: 'Dr. Priya Sharma',
    organization: 'BioTest Labs Pvt Ltd',
    licenseNumber: 'LAB-2024-001',
    location: 'Bangalore, Karnataka',
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    email: 'processor@example.com',
    role: 'processor',
    name: 'Suresh Patel',
    organization: 'Ayur Naturals Pvt Ltd',
    licenseNumber: 'PRC-2024-001',
    location: 'Chennai, Tamil Nadu',
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    email: 'admin@example.com',
    role: 'admin',
    name: 'Admin User',
    organization: 'HerbTrace System',
    licenseNumber: 'ADM-2024-001',
    location: 'Mumbai, Maharashtra',
    createdAt: '2024-01-01'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('herbTrace_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('herbTrace_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('herbTrace_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
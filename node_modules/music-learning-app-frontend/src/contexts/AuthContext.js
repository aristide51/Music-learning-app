import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          // Vérifier la validité du token
          const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });

          if (response.ok) {
            const userData = JSON.parse(storedUser);
            setToken(storedToken);
            setUser({
              ...userData,
              isAdmin: userData.role === 'admin'
            });
            console.log('Session restaurée avec succès:', userData);
          } else {
            console.log('Token invalide, déconnexion...');
            logout();
          }
        } catch (error) {
          console.error('Erreur lors de la vérification du token:', error);
          logout();
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (newToken, userData) => {
    try {
      console.log('Tentative de connexion avec:', { userData });
      
      // Vérifier que nous avons bien les données nécessaires
      if (!newToken || !userData) {
        throw new Error('Données de connexion invalides');
      }

      // Mettre à jour l'utilisateur avec isAdmin
      const updatedUserData = {
        ...userData,
        isAdmin: userData.role === 'admin'
      };

      setToken(newToken);
      setUser(updatedUserData);
      
      // Sauvegarder dans le localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      
      console.log('Connexion réussie:', updatedUserData);
      return true;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      logout();
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Déconnexion effectuée');
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.isAdmin || false
  };

  console.log('État de l\'authentification:', value);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
}; 
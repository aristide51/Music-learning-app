import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Music Learning App</h3>
            <p className="text-gray-400">
              Votre plateforme d'apprentissage musical en ligne.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white">
                  Nos cours
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/payment" className="text-gray-400 hover:text-white">
                  Paiement
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">
                WhatsApp: +226 XX XX XX XX
              </li>
              <li className="text-gray-400">
                Email: support@music-learning-app.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Music Learning App. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
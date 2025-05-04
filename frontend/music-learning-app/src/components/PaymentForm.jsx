import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentForm = () => {
  const location = useLocation();
  const courseId = new URLSearchParams(location.search).get('course');
  
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    paymentMethod: 'orange',
    courseId: courseId
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, nous enverrons les données au backend
    console.log('Données de paiement:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Paiement du cours</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro WhatsApp
          </label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="input-field"
            placeholder="+226 XX XX XX XX"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Méthode de paiement
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="input-field"
          >
            <option value="orange">Orange Money</option>
            <option value="moov">Moov Money</option>
            <option value="telecel">Telecel Money</option>
          </select>
        </div>
        
        <div className="mt-6">
          <button type="submit" className="btn-primary w-full">
            Procéder au paiement
          </button>
        </div>
        
        <div className="text-sm text-gray-600 mt-4">
          <p>Instructions :</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Remplissez le formulaire ci-dessus</li>
            <li>Effectuez le paiement via le service mobile sélectionné</li>
            <li>Vous recevrez une confirmation par WhatsApp sous 24h</li>
          </ol>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm; 
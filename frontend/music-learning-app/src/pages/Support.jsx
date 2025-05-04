import React, { useState } from 'react';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, nous enverrons les données au backend
    console.log('Données du formulaire:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // FAQ data
  const faqItems = [
    {
      question: "Comment fonctionne le système de paiement ?",
      answer: "Le paiement se fait via les services mobiles (Orange Money, Moov Money, Telecel Money). Après le paiement, vous recevrez une confirmation par WhatsApp sous 24h."
    },
    {
      question: "Puis-je accéder aux cours hors ligne ?",
      answer: "Oui, les PDF et documents de cours sont téléchargeables et accessibles hors ligne. Les vidéos nécessitent une connexion internet."
    },
    {
      question: "Comment puis-je suivre ma progression ?",
      answer: "Votre progression est visible dans votre tableau de bord, avec des indicateurs visuels et des statistiques détaillées."
    },
    {
      question: "Quelle est la durée d'accès aux cours ?",
      answer: "L'accès aux cours est illimité une fois acheté. Vous pouvez les suivre à votre rythme."
    },
    {
      question: "Comment contacter le support technique ?",
      answer: "Vous pouvez nous contacter via le formulaire ci-dessous ou directement par WhatsApp au +226 XX XX XX XX."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Support et aide</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire de contact */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Contactez-nous</h2>
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
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sujet
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Sélectionnez un sujet</option>
                <option value="technical">Problème technique</option>
                <option value="payment">Question sur le paiement</option>
                <option value="course">Question sur un cours</option>
                <option value="other">Autre</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="input-field h-32"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Envoyer le message
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Ou contactez-nous directement par WhatsApp :
            </p>
            <a
              href="https://wa.me/226XXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              +226 XX XX XX XX
            </a>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="font-semibold mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support; 
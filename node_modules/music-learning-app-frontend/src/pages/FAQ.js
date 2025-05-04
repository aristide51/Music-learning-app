import React, { useState } from 'react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Comment fonctionne l'apprentissage en ligne ?",
      answer: "Notre plateforme propose des cours structurés avec des vidéos, des exercices pratiques et des quiz. Vous pouvez apprendre à votre rythme, accéder aux cours 24/7 et suivre votre progression. Les instructeurs sont disponibles pour répondre à vos questions via le forum de discussion."
    },
    {
      question: "Quels sont les prérequis pour commencer ?",
      answer: "Aucun prérequis n'est nécessaire pour les cours débutants. Pour les cours avancés, nous recommandons d'avoir suivi les cours de niveau intermédiaire ou d'avoir une expérience équivalente. Chaque cours indique clairement le niveau requis."
    },
    {
      question: "Comment se déroule le paiement ?",
      answer: "Nous acceptons les paiements via Orange Money. Le processus est simple et sécurisé. Une fois le paiement effectué, vous recevez un email de confirmation et un accès immédiat au cours."
    },
    {
      question: "Puis-je annuler ou rembourser un cours ?",
      answer: "Oui, vous pouvez annuler un cours dans les 14 jours suivant l'achat. Pour cela, contactez notre service client. Le remboursement sera effectué selon les conditions générales de vente."
    },
    {
      question: "Comment puis-je accéder aux cours après l'achat ?",
      answer: "Après l'achat, vous recevez un email avec vos identifiants de connexion. Connectez-vous à votre compte pour accéder à tous vos cours achetés. Les cours sont disponibles indéfiniment une fois achetés."
    },
    {
      question: "Y a-t-il un certificat à la fin du cours ?",
      answer: "Oui, un certificat de complétion est délivré à la fin de chaque cours. Pour l'obtenir, vous devez compléter tous les modules et réussir les évaluations avec un score minimum de 70%."
    },
    {
      question: "Comment puis-je contacter un instructeur ?",
      answer: "Vous pouvez contacter les instructeurs via le forum de discussion intégré à chaque cours. Ils répondent généralement dans les 24-48 heures. Pour les questions urgentes, notre service client est disponible."
    },
    {
      question: "Les cours sont-ils accessibles sur mobile ?",
      answer: "Oui, notre plateforme est entièrement responsive et accessible sur tous les appareils (ordinateur, tablette, smartphone). Vous pouvez même télécharger les vidéos pour les regarder hors ligne."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Questions fréquemment posées</h1>
          <p className="mt-4 text-lg text-gray-600">
            Trouvez des réponses aux questions les plus courantes sur notre plateforme d'apprentissage musical.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    <svg
                      className={`h-6 w-6 text-gray-500 transform transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Vous n'avez pas trouvé votre réponse ?{' '}
              <a href="/support" className="text-indigo-600 hover:text-indigo-500">
                Contactez notre équipe de support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ; 
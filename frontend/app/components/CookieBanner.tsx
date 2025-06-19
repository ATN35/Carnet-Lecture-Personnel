'use client';

import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (value: 'accepted' | 'refused') => {
    localStorage.setItem('cookie-consent', value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full bg-white border border-gray-300 shadow-xl rounded-xl p-4">
      <p className="text-sm text-gray-800 mb-4 text-center">
        🍪 Ce site utilise des cookies pour améliorer votre expérience.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleConsent('accepted')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
        >
          Accepter
        </button>
        <button
          onClick={() => handleConsent('refused')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
        >
          Refuser
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

function CookieConsent() {
  const [consent, setConsent] = useState(localStorage.getItem('cookieConsent'));

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setConsent('true');
  };

  if (consent === 'true') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 text-sm flex justify-between items-center">
      <span>This site uses cookies to improve your experience.</span>
      <button
        onClick={handleAccept}
        className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
      >
        Accept
      </button>
    </div>
  );
}

export default CookieConsent;

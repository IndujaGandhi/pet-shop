export const formatCurrency = (amount) => {
  const value = Number(amount ?? 0);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const productImageFallback = (label = 'Pet Product') => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f8d7a4"/>
          <stop offset="100%" stop-color="#f5b267"/>
        </linearGradient>
      </defs>
      <rect width="600" height="600" rx="28" fill="url(#bg)"/>
      <circle cx="300" cy="220" r="110" fill="#fff3e0" opacity="0.8"/>
      <path d="M230 240c18-48 79-80 140-68 50 10 85 52 89 104-34 8-66 14-95 17-47 5-92 4-134-12z" fill="#fff" opacity="0.85"/>
      <text x="50%" y="470" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="#6b3f00">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

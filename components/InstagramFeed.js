import { useEffect } from 'react';

export default function InstagramFeed() {
  useEffect(() => {
    // Prevent loading the script multiple times
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ minHeight: '400px' }}
    >
      <div
        className="elfsight-app-6382b6ca-a83d-4bf1-ab58-16d8558954a4"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
}

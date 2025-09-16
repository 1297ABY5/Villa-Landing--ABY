import { useEffect } from 'react';

export default function InstagramFeed() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      className="elfsight-app-be187cad-c36b-4712-b333-d86a66d2da6d rounded-xl overflow-hidden"
      data-elfsight-app-lazy
      style={{ minHeight: '400px' }}
    />
  );
}

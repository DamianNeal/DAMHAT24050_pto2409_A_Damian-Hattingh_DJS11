import React, { createContext, useState, useEffect } from 'react';
export const GlobalAudioContext = createContext();

export default function GlobalAudio({ children }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const handler = e => {
      if (src) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [src]);

  return (
    <GlobalAudioContext.Provider value={{ setSrc }}>
      {children}
      {src && (
        <audio
          src={src}
          controls
          style={{ position: 'fixed', bottom: 0, width: '100%', background: '#fff' }}
        />
      )}
    </GlobalAudioContext.Provider>
  );
}

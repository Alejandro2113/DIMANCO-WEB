"use client";
import React from 'react';
import { Navigation } from 'lucide-react';

const MapComponent = () => {
  const latitude = 13.72322313343101;
  const longitude = -89.7275528706498;

  const handleNavigate = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-200 h-64 w-full rounded-lg overflow-hidden relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245!2d-89.7275528706498!3d13.72322313343101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63311d8ff137d5%3A0x6124eb9ad7e89f97!2sDIMANCO%20S.A%20DE%20C.V!5e0!3m2!1ses!2ssv!4v1706910335685!5m2!1ses!2ssv"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de DIMANCO SA de CV"
        />
      </div>
      <button
        onClick={handleNavigate}
        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Navigation className="w-5 h-5" />
        Cómo llegar
      </button>
    </div>
  );
};

export default MapComponent;
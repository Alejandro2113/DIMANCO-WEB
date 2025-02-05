"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Map, Hammer, Home as HomeIcon, User, Ruler, DollarSign, HardHat } from 'lucide-react';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import dynamic from 'next/dynamic';

// Dinámicamente importamos los componentes de framer-motion
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });
const MotionH1 = dynamic(() => import('framer-motion').then(mod => mod.motion.h1), { ssr: false });
const MotionP = dynamic(() => import('framer-motion').then(mod => mod.motion.p), { ssr: false });

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await fetch('/pages/api/projects');
        const data = await response.json();
        
        // Filtrar solo proyectos destacados en el frontend
        const proyectosDestacados = data.projects.filter(proyecto => proyecto.featured);
  
        setProyectos(proyectosDestacados);
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    };
  
    fetchProyectos();
  }, []);
  

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [flipped, setFlipped] = useState(null);

  const services = [
    { icon: Map, description: "Descripción del servicio de mapas" },
    { icon: Hammer, description: "Descripción del servicio de construcción" },
    { icon: HomeIcon, description: "Descripción del servicio de hogar" },
    { icon: Ruler, description: "Descripción del servicio de diseño" },
    { icon: DollarSign, description: "Descripción del servicio financiero" },
    { icon: HardHat, description: "Descripción del servicio de seguridad" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-100">
      <Navbar />
      <section className="mt-12 bg-yellow-300 p-6 rounded-lg">
        <MotionH1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-8 text-center text-gray-800"
        >
          Nuestros <span className="text-white">Servicios</span>
        </MotionH1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                onClick={() => setFlipped(flipped === index ? null : index)}
                className="relative flex flex-col items-center p-4 bg-white rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
              >
                {flipped === index ? (
                  <MotionP
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center text-gray-700"
                  >
                    {service.description}
                  </MotionP>
                ) : (
                  <MotionDiv
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-12 h-12 text-yellow-500 mb-2" />
                  </MotionDiv>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <main className="container mx-auto px-6 py-16">
        <MotionH1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-8 text-center text-gray-800"
        >
          Nuestros <span className="text-yellow-600">Proyectos</span>
        </MotionH1>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
  {proyectos.length > 0 ? (
    proyectos.map((proyecto) => (
      <div
        key={proyecto.id}
        className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-500 ease-in-out"
      >
        <Image
          src={proyecto.imagen || '/images/default.jpg'}
          alt={proyecto.titulo}
          width={400}
          height={300}
          className="w-full h-60 object-cover"
        />
        <div className="p-6 flex flex-col h-full">
          <div className="flex-grow">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">{proyecto.titulo}</h2>
            <p className="text-sm sm:text-lg text-gray-500 mb-4">{proyecto.subtitulo}</p>
            {/* Tamaño de fuente aumentado para la descripción */}
            <p className="text-base sm:text-xl text-gray-700 mb-4 whitespace-pre-line">
              {proyecto.descripcion}
            </p>
            {/* Diseño más profesional para la fecha */}
            <p className="text-sm sm:text-lg font-semibold text-gray-700 mb-4">
              <span className="text-yellow-500">Inicio:</span> {formatDate(proyecto.fechaInicio)} 
              <span className="text-yellow-500 ml-4">Final:</span> {formatDate(proyecto.fechaFinal)}
            </p>
          </div>
          <div className="mt-auto flex justify-center">
            <a
              href={`/proyectos/${proyecto.id}`}
              className="inline-block px-6 py-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition duration-300 relative"
            >
              Ver más
              <span className="ml-2">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No hay proyectos disponibles.</p>
  )}
</section>



      </main>

      <Footer />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Proyectos), { ssr: false });

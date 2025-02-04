"use client";

import React, { useState } from "react";
import { Map, Hammer, Home as HomeIcon, User, Ruler, DollarSign, HardHat } from "lucide-react";
import Footer from "./components/footer/page.js";
import Navbar from "./components/navbar/page.js";
import CustomSlider from "./components/CustomSlider/page.js";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Cargar el mapa de forma dinámica solo en el cliente
const MapComponent = dynamic(() => import("./components/MapComponent"), { ssr: false });

export default function Home() {
  const [flipped, setFlipped] = useState(null);

  const services = [
    { icon: Map, description: "Diseño y elaboración de planos" },
    { icon: Hammer, description: "Construcción en general" },
    { icon: HomeIcon, description: "Diseño de lotificaciones" },
    { icon: Ruler, description: "Mediciones de terrenos" },
    { icon: DollarSign, description: "Valuación de propiedades" },
    { icon: HardHat, description: "Supervisión de obra civil" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Introducción */}
        <section className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">DIMANCO SA de CV</h1>
            <p className="text-xl text-yellow-500 mb-4">&quot;Tú lo sueñas, nosotros lo construimos&quot;</p>
            <p className="text-lg text-gray-600 mb-4">Constructora Salvadoreña</p>
            <p className="text-gray-700 text-justify">
              Somos una empresa dedicada al sector construcción, contamos con amplia experiencia en la evaluación estructural,
              supervisión, construcción, y restauración de obras civiles. Además, contamos con profesionales especializados en diversas
              áreas a su disposición con la finalidad de poder brindarle las mejores soluciones, y el mejor servicio.
            </p>
          </div>
          <div className="md:w-1/2">
            <CustomSlider />
          </div>
        </section>

        {/* Servicios con Animación */}
        <section className="mt-12 bg-yellow-300 p-6 rounded-lg">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Nuestros <span className="text-white">Servicios</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  onClick={() => setFlipped(flipped === index ? null : index)}
                  className="relative flex flex-col items-center p-4 bg-white rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {flipped === index ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center text-gray-700"
                    >
                      {service.description}
                    </motion.p>
                  ) : (
                    <motion.div>
                      <Icon className="w-12 h-12 text-yellow-500 mb-2" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Detalles adicionales y ubicación */}
        <section className="mt-12 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Experiencia</h2>
            <p className="text-gray-700 text-justify">
              Contamos con experiencia en supervisión de colados de concreto siguiendo normativas internacionales como ASTM y los
              criterios propuestos por los diversos comités ACI, nivelación de superficies, medición y valuo de terrenos, construcción y
              diseño de pavimentos de concreto según AASHTO-93, instalaciones de adoquinados. Además, contamos con experiencia en la
              realización de ensayos que ayuden a determinar la calidad estructural de los edificios de concreto, todo esto aplicando
              criterios de seguridad y siguiendo los procedimientos propuestos por el comité ACI 228 y las normas establecidas por la
              Sociedad Americana para Pruebas y Materiales ASTM (siglas en inglés). Si está interesado en recibir más información sobre
              nuestros servicios, no dude en contactarnos y con gusto podremos coordinar una entrevista personal o telefónica.
            </p>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestra Ubicación</h2>
            <MapComponent />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

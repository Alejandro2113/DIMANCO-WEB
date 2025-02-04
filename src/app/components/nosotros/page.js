// src/app/componets/nosotros/page.js
"use client";
import { useState } from 'react';
import Image from 'next/image';
import Footer from '../../components/footer/page';
import Navbar from '../../components/navbar/page';
import Link from 'next/link'
import { Map, Hammer, Home as HomeIcon, User, Ruler, DollarSign, HardHat } from 'lucide-react';

import { motion } from 'framer-motion';
import { FaFlag, FaEye, FaGem, FaLinkedin } from 'react-icons/fa';

import AlejandroImage from '../../images/IngAlejandro.jpeg';
import GabrielaImage from '../../images/ArqGabriela.jpeg';
import EduardoImage from '../../images/IngEduardo.jpeg';
import MoisesImage from '../../images/IngMoises.jpeg';

export default function Nosotros() {
  const [activeTab, setActiveTab] = useState('mision');

  const teamMembers = [
    {
      name: "MOISÉS ALEJANDRO GONZÁLEZ",
      role: "DIRECTOR GENERAL",
      image: AlejandroImage,
      subrole: "INGENIERO EN JEFE",
      carreer: "INGENIERO CIVIL",
      description: "Moisés aporta su visión y experiencia como Ingeniero Civil, liderando proyectos con un enfoque en sostenibilidad y eficiencia.",
    },
    {
      name: "GABRIELA CAROLINA GONZÁLEZ",
      role: "DIRECTOR DE IMAGEN Y VISUAL",
      image: GabrielaImage,
      subrole: "ARQUITECTO EN JEFE",
      carreer: "ARQUITECTA",
      description: "Gabriela se encarga de la estética y el diseño visual de los proyectos, asegurando una armonía entre funcionalidad y belleza.",
    },
    {
      name: "EDUARDO ALBERTO GONZÁLEZ",
      role: "DIRECTOR FINANCIERO",
      image: EduardoImage,
      subrole: "INGENIERO EN NEGOCIOS",
      carreer: "INGENIERO EN NEGOCIOS",
      description: "Eduardo administra los aspectos financieros de la empresa, manteniendo un equilibrio saludable para el crecimiento.",
    },
    {
      name: "MOISÉS ALBERTO GONZÁLEZ",
      role: "FUNDADOR",
      image: MoisesImage,
      subrole: "ACCIONISTA",
      carreer: "INGENIERO CIVIL",
      description: "Moisés es el visionario detrás de la empresa, guiándola hacia un futuro de innovación y sostenibilidad.",
    },
  ];

  const companyInfo = {
    mision: "Nuestra misión es transformar el paisaje urbano a través de construcciones innovadoras y sostenibles, mejorando la calidad de vida de las comunidades.",
    vision: "Aspiramos a ser líderes en la industria de la construcción, reconocidos por nuestra excelencia, innovación y compromiso con la sostenibilidad.",
    valores: ["Integridad", "Excelencia", "Innovación", "Sostenibilidad", "Trabajo en equipo"]
  };

  const [flipped, setFlipped] = useState(null);

  // Array de servicios, donde cada servicio tiene un icono y una descripción
  const services = [
    { icon: Map, description: "Descripción del servicio de mapas" },
    { icon: Hammer, description: "Descripción del servicio de construcción" },
    { icon: HomeIcon, description: "Descripción del servicio de hogar" },
    { icon: Ruler, description: "Descripción del servicio de diseño" },
    { icon: DollarSign, description: "Descripción del servicio financiero" },
    { icon: HardHat, description: "Descripción del servicio de seguridad" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
       
      <Navbar className="sticky top-0 z-50" />
       {/* Sección de Servicios */}
       <section className="mt-12 bg-yellow-300 p-6 rounded-lg">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-8 text-center text-gray-800"
        >
          Nuestros <span className="text-white">Servicios</span>
        </motion.h1>

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
                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center text-gray-700"
                  >
                    {service.description}
                  </motion.p>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-12 h-12 text-yellow-500 mb-2" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-8 text-center text-gray-800"
        >
          Sobre <span className="text-yellow-600">Nosotros</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg sm:text-xl mb-12 text-center text-gray-600 max-w-3xl mx-auto"
        >
          Somos una compañía de construcción dedicada a transformar tus sueños en realidad. Con años de experiencia y un equipo altamente calificado, garantizamos calidad y excelencia en cada proyecto.
        </motion.p>

        {/* Sección: Misión, Visión y Valores */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Nuestra <span className="text-yellow-600">Esencia</span></h2>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('mision')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'mision' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-yellow-700 hover:text-white transition-colors duration-300`}
            >
              Misión
            </button>
            <button
              onClick={() => setActiveTab('vision')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'vision' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-yellow-700 hover:text-white transition-colors duration-300`}
            >
              Visión
            </button>
            <button
              onClick={() => setActiveTab('valores')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'valores' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-yellow-700 hover:text-white transition-colors duration-300`}
            >
              Valores
            </button>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
            {activeTab === 'mision' && (
              <div className="flex items-center">
                <FaFlag className="w-12 h-12 mr-4 text-yellow-500" />
                <p className="text-gray-700">{companyInfo.mision}</p>
              </div>
            )}
            {activeTab === 'vision' && (
              <div className="flex items-center">
                <FaEye className="w-12 h-12 mr-4 text-yellow-500" />
                <p className="text-gray-700">{companyInfo.vision}</p>
              </div>
            )}
            {activeTab === 'valores' && (
              <div className="flex flex-col items-center">
              <FaGem className="w-12 h-12 mb-6 text-yellow-500" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {companyInfo.valores.map((valor, index) => (
                  <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center text-center text-gray-700">
                    <span className="text-lg font-semibold">{valor}</span>
                  </div>
                ))}
              </div>
            </div>
            
            
            )}
          </div>
        </section>

        
         {/* Sección de equipo */}
         <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-gray-800">
          Nuestro <span className="text-yellow-600">Equipo</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-yellow-500"
            >
              <Image
                src={member.image}
                alt={`Foto de ${member.name}`}
                width={600}
                height={600}
                className="w-full h-49 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-gray-800">{member.name}</h3>
              <p className="text-yellow-600 font-semibold text-lg">{member.role}</p>
              <p className="text-gray-700 font-medium text-lg">{member.subrole}</p>
              <p className="text-yellow-500 font-normal text-md italic">{member.carreer}</p>
              <p className="mt-4 text-gray-700">{member.description}</p>
            </motion.div>
          ))}
        </div>
        {/* Sección: Testimonios */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Lo que dicen nuestros <span className="text-yellow-600">clientes</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-yellow-500">
              <p className="italic mb-4 text-gray-700">&quot;Trabajar con este equipo fue una experiencia increíble. Su profesionalismo y atención al detalle superaron todas nuestras expectativas.&quot;</p>
              <p className="font-semibold text-gray-800">- Ana García, Propietaria de Casa Residencial</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-yellow-500">
              <p className="italic mb-4 text-gray-700">&quot;La innovación y el compromiso con la sostenibilidad de esta empresa son admirables. Definitivamente los recomendaría para cualquier proyecto de construcción.&quot;</p>
              <p className="font-semibold text-gray-800">- Pedro Sánchez, Gerente de Proyecto Comercial</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">¿Listo para comenzar tu <span className="text-yellow-600">proyecto</span>?</h2>
          <p className="mb-6 text-gray-600">Contáctanos hoy mismo para una consulta gratuita</p>
          <Link href="/components/contacto" passHref>
      <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
        Solicitar Presupuesto
      </button>
    </Link>
        </section>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}
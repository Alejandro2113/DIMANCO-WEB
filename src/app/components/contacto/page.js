// app/components/contacto/page.js
"use client";
import React, { useState } from 'react';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import { FaUser, FaEnvelope, FaCommentDots, FaPhone, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CustomSlider from '../../components/CustomSlider/page.js'; // Ajusta la ruta según sea necesario
import LOGO from "../../images/logo.jpg";
import Image from 'next/image';

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    comentarios: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/pages/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.email,
          phone: '', // Si tienes campo de teléfono
          message: formData.comentarios,
        }),
      });

      if (response.ok) {
        setSuccessMessage('¡Gracias! Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto pronto.');
        setFormData({ nombre: '', email: '', comentarios: '' }); // Vacía el formulario
      } else {
        setSuccessMessage('Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      setSuccessMessage('Error en la solicitud. Inténtalo de nuevo más tarde.');
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md mb-4">
          <p>{successMessage}</p>
        </div>
      )}
      {/* Field for Name */}
      <div className="relative z-10">
        <label htmlFor="nombre" className="block text-base font-semibold text-gray-800">Nombre Completo</label>
        <div className="relative mt-2">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-20" />
          <input
            type="text"
            id="nombre"
            name="nombre"
            onChange={handleChange}
            value={formData.nombre}
            className="text-black pl-10 block w-full rounded-lg border-gray-300 shadow-lg focus:border-yellow-500 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 transition-transform duration-300 ease-in-out hover:shadow-xl"
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
      </div>
      
      {/* Field for Email */}
      <div className="relative z-10">
        <label htmlFor="email" className="block text-base font-semibold text-gray-800">Correo Electrónico</label>
        <div className="relative mt-2">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-20" />
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="text-black pl-10 block w-full rounded-lg border-gray-300 shadow-lg focus:border-yellow-500 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 transition-transform duration-300 ease-in-out hover:shadow-xl"
            placeholder="Ingresa tu email"
            required
          />
        </div>
      </div>
      
      {/* Field for Comments */}
      <div className="relative z-10">
        <label htmlFor="comentarios" className="block text-base font-semibold text-gray-800">Comentarios o Preguntas</label>
        <div className="relative mt-2">
          <FaCommentDots className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-20" />
          <textarea
            id="comentarios"
            name="comentarios"
            rows="4"
            onChange={handleChange}
            value={formData.comentarios}
            className="text-black pl-10 block w-full rounded-lg border-gray-300 shadow-lg focus:border-yellow-500 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 transition-transform duration-300 ease-in-out hover:shadow-xl"
            placeholder="Escribe tu mensaje aquí"
            required
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-transform duration-300 ease-in-out shadow-lg flex items-center justify-center space-x-2"
      >
        <FaPaperPlane />
        <span>Enviar Mensaje</span>
      </motion.button>
    </motion.form>
  );
}

export default function Contacto() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow bg-gray-100">
        <div className="flex flex-col md:flex-row py-12 gap-8">
          <div className="w-full md:w-1/2 p-8 relative z-0">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <CustomSlider />
            </motion.div>
            <motion.p
              className="mt-6 text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              ¿Tienes dudas? Llena el formulario y pronto te atenderemos. Brindamos asesoría en construcciones en todo el territorio nacional, y también puedes solicitar una cotización de material. Contáctanos y será un gusto atenderte.
            </motion.p>
            <motion.p
              className="mt-4 text-lg text-gray-700"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Correo: <a href="mailto:consultas@dimanco.net" className="text-yellow-500 underline">consultas@dimanco.net</a><br />
              Teléfono: <a href="tel:+50378707807" className="text-yellow-500 underline">+503 7870-7807</a>
            </motion.p>
            <motion.a
              href="https://wa.me/50378707807"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-transform duration-300 ease-in-out shadow-lg flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp />
              <span>Cotiza tu proyecto aquí</span>
            </motion.a>
          </div>
          <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg relative z-0">
            <div className="mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Image src={LOGO} alt="DIMANCO S.A. DE C.V." className="mx-auto" />
              </motion.div>
            </div>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

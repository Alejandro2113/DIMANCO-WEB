"use client";
import Image from 'next/image'; 
import LOGO from "../../images/logo.jpg"; 
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'; 
import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-[#333333] via-[#444444] to-[#222222] text-white mt-12 relative">
            <div className="container mx-auto px-4 py-8">
                {/* Contenedor principal */}
                <div className="flex flex-col lg:flex-row justify-between items-center border-b border-gray-600 pb-6 mb-6">
                    {/* Logo y Derechos Reservados */}
                    <div className="flex flex-col space-y-2 mb-6 lg:mb-0">
                        <Image src={LOGO} alt="Logo" width={120} height={60} />
                        <p className="text-sm">&copy; DIMANCO S.A. de C.V. Todos los derechos reservados.</p>
                        <p className="text-sm">
                            <MapPin className="inline-block w-4 h-4 mr-1" />
                            3av norte y 5ta calle poniente, clínicas médicas Jerusalén, local #12, Sonsonate, El Salvador.
                        </p>
                    </div>

                    {/* Redes Sociales */}
                    <div className="flex space-x-6">
                        <a href="https://www.instagram.com/dimanco_sa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram className="w-8 h-8 text-yellow-400 hover:text-yellow-300 transition duration-300 transform hover:scale-110" />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100063094606864" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook className="w-8 h-8 text-yellow-400 hover:text-yellow-300 transition duration-300 transform hover:scale-110" />
                        </a>
                        <a href="https://www.youtube.com/@constructoradimanco7197" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <Youtube className="w-8 h-8 text-yellow-400 hover:text-yellow-300 transition duration-300 transform hover:scale-110" />
                        </a>
                    </div>
                </div>

                {/* Enlaces Rápidos */}
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                    <nav className="flex space-x-6 text-sm">
                        <a href="/components/nosotros" className="text-yellow-400 hover:text-yellow-300 transition duration-300">Nosotros</a>
                        <a href="/components/proyectos" className="text-yellow-400 hover:text-yellow-300 transition duration-300">Proyectos</a>
                        <a href="/components/contacto" className="text-yellow-400 hover:text-yellow-300 transition duration-300">Contáctanos</a>

                    </nav>

                    {/* Contacto Rápido */}
                    <div className="flex space-x-6">
                        <a href="mailto:consultas@dimanco.net" className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition duration-300">
                            <Mail className="w-5 h-5" />
                            <span>consultas@dimanco.net</span>
                        </a>
                        <a href="tel:+50378707807" className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition duration-300">
                            <Phone className="w-5 h-5" />
                            <span>+503 7870 7807</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Botón Ir Arriba */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 bg-yellow-400 text-white p-3 rounded-full shadow-lg hover:bg-yellow-300 transition duration-300"
                aria-label="Ir Arriba"
            >
                ↑
            </button>
        </footer>
    );
}

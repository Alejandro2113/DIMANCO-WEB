"use client";
import { useState } from 'react'; // Asegúrate de importar useState
import Image from 'next/image'; // Asegúrate de importar el componente Image
import LOGO from "../../images/logo.jpg"; // Importa tu logo
import Link from 'next/link'; // Importa Link para navegar entre páginas
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'; // Importa los íconos de Heroicons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={LOGO}
            alt="DIMANCO S.A. de C.V. Logo"
            className="mr-2"
            width={150} // Ajusta el ancho según sea necesario
            height={80} // Ajusta la altura para mantener la proporción
            priority
          />
        </div>

        {/* Menú para dispositivos móviles */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-yellow-500 focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menú de navegación para desktop */}
        <nav className="hidden lg:flex space-x-4">
          <ul className="text-3xl font-bold flex space-x-4">
            <li>
              <Link href="/" className="text-xl text-yellow-500 hover:text-yellow-600">
                HOME
              </Link>
            </li>
            <li>
              <Link href="/components/proyectos" className="text-xl text-yellow-500 hover:text-yellow-600">
                PROYECTOS
              </Link>
            </li>
            <li>
              <Link href="/components/nosotros" className="text-xl text-yellow-500 hover:text-yellow-600">
                NOSOTROS
              </Link>
            </li>
           
            <li>
              <Link href="/components/contacto" className="text-xl text-yellow-500 hover:text-yellow-600">
                CONTACTANOS
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Menú desplegable en móvil */}
      <div
        className={`lg:hidden absolute left-0 right-0 bg-white shadow-md ${isOpen ? 'block' : 'hidden'} z-10`}
      >
        <ul className="text-center py-4 space-y-2">
          <li>
            <Link
              href="/"
              className="text-lg text-yellow-500 hover:text-yellow-600"
              onClick={() => setIsOpen(false)}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              href="/components/proyectos"
              className="text-lg text-yellow-500 hover:text-yellow-600"
              onClick={() => setIsOpen(false)}
            >
              PROYECTOS
            </Link>
          </li>
          <li>
            <Link
              href="/components/nosotros"
              className="text-lg text-yellow-500 hover:text-yellow-600"
              onClick={() => setIsOpen(false)}
            >
              NOSOTROS
            </Link>
          </li>
          
          <li>
            <Link
              href="/components/contacto"
              className="text-lg text-yellow-500 hover:text-yellow-600"
              onClick={() => setIsOpen(false)}
            >
              CONTACTANOS
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
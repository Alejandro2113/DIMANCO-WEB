"use client";
import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Search, ChevronDown, ChevronUp, Settings } from "lucide-react";
import Image from "next/image";
import Navbar from "../../components/navbar/page";
import Footer from "../../components/footer/page";
import ROBOT from "../../images/constructor.jpg";

const FAQReader = () => {
  const [isReading, setIsReading] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(0.9); // Velocidad más lenta por defecto
  const [pitch, setPitch] = useState(1.1); // Tono ligeramente más alto por defecto
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  const faqs = [
    {
        question: "¿Cómo puedo solicitar una cotización?",
        answer: "Puede contactarnos a través de nuestro correo electrónico consultas@dimanco.net, llamando al +503 7870-7807, o llenando el formulario en nuestra página web."
    },
    {
        question: "¿Qué servicios ofrecen?",
        answer: "Ofrecemos servicios de evaluación estructural, supervisión, construcción y restauración de obras civiles. Además, realizamos levantamientos topográficos, diseño de pavimentos y brindamos soluciones integrales en construcción."
    },
    {
        question: "¿En qué áreas geográficas trabajan?",
        answer: "Brindamos servicios en todo el territorio nacional de El Salvador. Nuestra oficina principal está ubicada en 3av norte y 5ta calle poniente, clínicas médicas Jerusalén, local #12, Sonsonate."
    },
    {
        question: "¿Qué normativas siguen en sus proyectos?",
        answer: "Seguimos normativas internacionales como ASTM y los criterios propuestos por los comités ACI, además de las normas establecidas por la Sociedad Americana para Pruebas y Materiales (ASTM)."
    },
    {
        question: "¿Realizan evaluaciones estructurales?",
        answer: "Sí, contamos con experiencia en la realización de ensayos que ayudan a determinar la calidad estructural de los edificios de concreto, aplicando criterios de seguridad y siguiendo procedimientos establecidos por el comité ACI 228."
    },
    {
        question: "¿Cómo puedo agendar una visita técnica?",
        answer: "Puede contactarnos directamente para coordinar una entrevista personal o telefónica a través de nuestro número +503 7870-7807 o por correo a consultas@dimanco.net."
    },
    {
        question: "¿Qué tipos de proyectos manejan?",
        answer: "Manejamos diversos tipos de proyectos incluyendo construcción de puentes metálicos, carpetas asfálticas, dragado, diseño de paseos públicos, y evaluaciones estructurales, entre otros."
    }
];

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      const spanishVoices = availableVoices.filter((voice) =>
        voice.lang.startsWith("es")
      );
      setVoices(spanishVoices);
      if (spanishVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(spanishVoices[0]);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const readFAQ = (faq) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = `${faq.question}. ${faq.answer}`;
      speech.lang = "es-ES";

      if (selectedVoice) {
        speech.voice = selectedVoice;
      }
      speech.rate = rate;
      speech.pitch = pitch;

      speech.onstart = () => {
        setIsReading(true);
        setCurrentFAQ(faq);
      };

      speech.onend = () => {
        setIsReading(false);
        setCurrentFAQ(null);
      };

      speechSynthesis.cancel();
      speechSynthesis.speak(speech);
    }
  };

  const stopReading = () => {
    speechSynthesis.cancel();
    setIsReading(false);
    setCurrentFAQ(null);
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 via-yellow-100 to-gray-200 min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <header className="py-8 bg-yellow-300 shadow-md">
        <h1 className="text-center text-5xl font-bold text-gray-800">
          Preguntas <span className="text-yellow-600">Frecuentes</span>
        </h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Búsqueda */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar preguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-md"
            />
            <Search className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Lista de FAQs y Avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lista de FAQs */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                  currentFAQ === faq ? "border-2 border-yellow-500" : ""
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <h3 className="text-xl font-bold text-gray-800">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="text-gray-600" />
                  ) : (
                    <ChevronDown className="text-gray-600" />
                  )}
                </button>
                
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    expandedFAQ === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="p-4 border-t">
                    <p className="text-gray-600 mb-4">{faq.answer}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        isReading && currentFAQ === faq ? stopReading() : readFAQ(faq);
                      }}
                      className={`px-4 py-2 text-white rounded-md ${
                        isReading && currentFAQ === faq
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      {isReading && currentFAQ === faq
                        ? "Detener lectura"
                        : "Leer en voz alta"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Avatar Section with Voice Settings */}
          <div className="flex flex-col items-center justify-start sticky top-8 space-y-6">
            <div
              className={`relative ${isReading ? "animate-pulse" : ""} transition-all duration-300`}
            >
              <Image
                src={ROBOT}
                alt="Avatar del asistente"
                width={400}
                height={400}
                className="rounded-full border-4 border-yellow-400 shadow-lg"
              />
              <p className="text-center text-xl mt-6 font-medium text-gray-700">
                ¡Hola! Soy tu asistente. Selecciona una pregunta y te la leeré.
              </p>
            </div>

            {/* Voice Settings Button */}
            <button
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-gray-800 font-medium"
            >
              <Settings size={20} />
              Ajustes de voz
            </button>

            {/* Voice Settings Panel */}
            {showVoiceSettings && (
              <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Configuración de voz</h3>
                
                {/* Voice Selection */}
                <div className="space-y-2 text-black">
                  <label className="block text-sm font-medium text-gray-700">
                    Seleccionar voz
                  </label>
                  <select
                    value={selectedVoice?.name || ""}
                    onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value))}
                    className="w-full p-2 border rounded-md"
                  >
                    {voices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Speed Control */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Velocidad: {rate}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Pitch Control */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tono: {pitch}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Test Voice Button */}
                <button
                  onClick={() => readFAQ({ 
                    question: "Prueba de voz", 
                    answer: "¡Hola! Esta es una prueba de voz con los ajustes seleccionados." 
                  })}
                  className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                >
                  Probar voz
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQReader;
"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
    { code: "es", name: "ES", flag: "🇪🇸", fullName: "Español" },
    { code: "en", name: "EN", flag: "🇬🇧", fullName: "English" }
];

export const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(i18n.language);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentLang(i18n.language);
    }, [i18n.language]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setCurrentLang(langCode);
        setIsOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

    return (
        <div className="relative" ref={dropdownRef}>

             {/* Botón del desplegable */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all shadow-sm"
                aria-label="Seleccionar idioma"
            >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="text-sm font-medium text-gray-700">
                    {currentLanguage.name}
                </span>
                <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors ${
                                currentLang === lang.code ? 'bg-blue-50 text-[#003153]' : 'text-gray-700'
                            }`}
                        >
                        <span className="text-lg">{lang.flag}</span>
                        <div className="flex flex-col">
                            <span className="font-medium text-sm">
                                {lang.name} - {lang.fullName}
                            </span>
                        </div>
                            {currentLang === lang.code && (
                        <span className="ml-auto text-[#003153]">
                            ✓
                        </span>
                    )}
                </button>
            ))}
        </div>
    )}
    </div>
  );
};
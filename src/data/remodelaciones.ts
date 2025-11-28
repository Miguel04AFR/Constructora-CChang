import type { Remodelacion } from '@/src/Services/Remodelacion';

export const remodelaciones: Remodelacion[] = [
    {
        id: 1,
        nombre: 'Remodelación de Cocina Integral',
        precio: 8500,
        descripcion: 'Renovación completa de cocina: mobiliario, encimeras y distribución.',
    imagenUrl: '/remodelaciones/1/cover.jpg',
        descripcionDetallada:
            'Proyecto integral de cocina que incluye diseño personalizado, fabricación e instalación de muebles, encimeras de alta calidad, instalaciones eléctricas y de fontanería, y selección de acabados. Ideal para renovar la funcionalidad y estética de su cocina.',
        items: [
            'Muebles de cocina : Gabinetes a medida en melamina con herrajes de cierre suave, acabados resistentes a la humedad y almacenamiento optimizado para utensilios, especieros y despensa; diseño pensado para maximizar espacio y durabilidad.',
            'Encimera : Encimera de cuarzo de alta resistencia con acabado mate, tratamiento antibacteriano y juntas prácticamente invisibles para una superficie continua y fácil de limpiar.',
            'Electrodomésticos : Paquete de electrodomésticos integrados (vitrocerámica, campana extractora de alto rendimiento y horno multifunción) con eficiencia energética y acabado inoxidable coordinado.',
            'Instalaciones : Actualización completa de fontanería y electricidad con materiales certificados, redistribución de puntos de agua y energía, y mano de obra profesional con garantía.'
        ]
    },
    {
        id: 2,
        nombre: 'Remodelación de Baño Principal',
        precio: 4500,
        descripcion: 'Actualización de acabados, grifería y distribución para baño principal.',
    imagenUrl: '/remodelaciones/2/cover.jpg',
        descripcionDetallada:
            'Remodelación completa del baño principal con cambio de revestimientos, instalación de sanitarios y grifería moderna, mejora del sistema de agua y renovación de la iluminación y ventilación para mayor confort y eficiencia.',
        items: [
            'Sanitario y lavabo : Sanitarios y lavabo de diseño contemporáneo con descarga eficiente y acabados resistentes a manchas; ergonomía pensada para comodidad y ahorro de agua.',
            'Revestimientos : Revestimientos cerámicos y baldosas de alta calidad, resistentes al agua y al desgaste, con opciones de textura y patrón para personalizar el espacio.',
            'Grifería : Grifería monomando de bajo consumo con sistema antical y acabado cromado duradero para facilitar mantenimiento y prolongar la vida útil.',
            'Mano de obra : Mano de obra especializada en alicatado, ajuste de pendientes, sellado y acabados, asegurando juntas limpias y un resultado estético y funcional.'
        ]
    },
    {
        id: 3,
        nombre: 'Remodelación de Pintura Exterior',
        // This package's total price will be derived from the items below (1.25 per m² * cantidad + other items)
        // Compute: 1.25 * 200 (m²) = 250; preparación = 500 => total = 750
        precio: 750,
        descripcion:
            'Pintura completa de la fachada exterior con materiales resistentes al clima. El precio indicado es por metro cuadrado en el item correspondiente.',
    imagenUrl: '/remodelaciones/3/cover.jpg',
        descripcionDetallada:
            'Pintura de fachada que incluye preparación de superficies, aplicación de imprimantes y recubrimientos de alta durabilidad. Se trabaja por metro cuadrado y se ofrecen opciones de color y acabado según las necesidades del cliente.',
        items: [
            'Pintura de alta resistencia : Aplicación de imprimante y dos capas de pintura acrílica premium con protección UV y acabado uniforme; formulada para resistir intemperie y facilitar limpieza.',
            'Preparación de superficie : Limpieza, reparación de grietas y tratamiento de zonas dañadas, incluyendo sellado y acondicionamiento para asegurar adherencia y durabilidad de la pintura.'
        ]
    },
     {
        id: 4,
        nombre: 'Remodelación de jardín y áreas exteriores',
        precio: 1350,
        descripcion:
            'Remodelación de jardín y áreas exteriores con enfoque en la sostenibilidad y el uso de materiales ecológicos.',
    imagenUrl: '/remodelaciones/4/cover.jpg',
        descripcionDetallada:
            'Remodelación de jardín que incluye preparación del terreno, selección e instalación de plantas nativas, creación de senderos ecológicos y sistemas de riego eficientes. Se trabaja por metro cuadrado y se ofrecen opciones personalizadas según las necesidades del cliente.',
        items: [
            'Muebles de madera exterior : Mobiliario diseñado para exteriores, tratado contra humedad y rayos UV, con ensamblajes reforzados y acabados que facilitan su mantenimiento y prolongan su vida útil.',
            'Decoración de jardín : Elementos decorativos y pequeños muros, instalación de senderos y maceteros integrados, además de iluminación ambiental y soluciones funcionales para uso diario.'
        ]
    }
];

export default remodelaciones;

// (debug logs removed)
